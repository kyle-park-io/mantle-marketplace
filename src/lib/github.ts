import type { GithubSyncConfig, MarketplaceItem } from './types';

interface GithubRepoMeta {
  description: string | null;
  updated_at: string;
  owner: { login: string };
}

interface GithubPackageJson {
  name?: string;
  version?: string;
  description?: string;
  author?: string | { name: string };
}

interface GithubSkillMeta {
  id?: string;
  name?: string;
  description?: string;
  version?: string;
}

function fetchWithAuth(url: string): Promise<Response> {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    console.warn(
      'GITHUB_PERSONAL_ACCESS_TOKEN is not set — using unauthenticated GitHub API (60 req/hr limit)',
    );
  }
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { headers });
}

async function fetchRepoMeta(repo: string): Promise<GithubRepoMeta> {
  const res = await fetchWithAuth(`https://api.github.com/repos/${repo}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch repo meta for ${repo}: HTTP ${res.status}`,
    );
  }
  return res.json() as Promise<GithubRepoMeta>;
}

async function fetchFileContent(
  repo: string,
  path: string,
): Promise<string | null> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/contents/${path}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    console.warn(`Failed to fetch ${path} for ${repo}: HTTP ${res.status}`);
    return null;
  }
  const data = (await res.json()) as { content: string; encoding: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function fetchReadme(repo: string): Promise<string> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/readme`,
  );
  if (res.status === 404) return '';
  if (!res.ok) {
    console.warn(`Failed to fetch README for ${repo}: HTTP ${res.status}`);
    return '';
  }
  const data = (await res.json()) as { content: string; encoding: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function fetchPackageJson(repo: string): Promise<GithubPackageJson> {
  const raw = await fetchFileContent(repo, 'package.json');
  if (!raw) return {};
  try {
    return JSON.parse(raw) as GithubPackageJson;
  } catch (err) {
    console.warn(`Failed to parse package.json for ${repo}:`, err);
    return {};
  }
}

async function fetchSkillMeta(
  repo: string,
  skillPath: string,
): Promise<GithubSkillMeta> {
  const yamlRaw = await fetchFileContent(
    repo,
    `${skillPath}/agents/openai.yaml`,
  );
  if (!yamlRaw) return {};

  // Minimal YAML parsing for top-level key: value pairs
  const meta: GithubSkillMeta = {};
  for (const line of yamlRaw.split('\n')) {
    const match = /^(\w+):\s*(.+)$/.exec(line.trim());
    if (!match) continue;
    const [, key, value] = match;
    const cleaned = value.trim().replace(/^["']|["']$/g, '');
    if (key === 'id') meta.id = cleaned;
    else if (key === 'name') meta.name = cleaned;
    else if (key === 'description') meta.description = cleaned;
    else if (key === 'version') meta.version = cleaned;
  }
  return meta;
}

async function fetchSkillReadme(
  repo: string,
  skillPath: string,
): Promise<string> {
  return (await fetchFileContent(repo, `${skillPath}/SKILL.md`)) ?? '';
}

export async function fetchItemFromRepo(
  config: GithubSyncConfig,
): Promise<MarketplaceItem> {
  if (config.skillPath) {
    return fetchSkillItem(config);
  }
  return fetchRepoItem(config);
}

async function fetchRepoItem(
  config: GithubSyncConfig,
): Promise<MarketplaceItem> {
  const [meta, readme, pkg] = await Promise.all([
    fetchRepoMeta(config.repo),
    fetchReadme(config.repo),
    fetchPackageJson(config.repo),
  ]);

  const repoName = config.repo.split('/')[1] ?? config.repo;
  const authorName =
    typeof pkg.author === 'string'
      ? pkg.author
      : (pkg.author?.name ?? meta.owner.login);

  // MCP items use the package name as slug (e.g. "mantle-mcp"),
  // other items use the repo name (e.g. "mantle-agent-scaffold")
  const isMcp = config.category === 'mcp';
  const slug = isMcp ? (pkg.name ?? repoName) : repoName;
  const installCommand = `git clone https://github.com/${config.repo}`;

  return {
    slug,
    name: slug,
    description: pkg.description ?? meta.description ?? '',
    category: config.category,
    platform: config.platform,
    isOfficial: config.isOfficial,
    installCommand,
    author: authorName,
    version: pkg.version ?? '0.0.0',
    readme,
    githubUrl: `https://github.com/${config.repo}`,
    tags: config.tags ?? [],
    updatedAt: meta.updated_at,
  };
}

async function fetchSkillItem(
  config: GithubSyncConfig,
): Promise<MarketplaceItem> {
  const skillPath = config.skillPath!;
  const skillSlug = skillPath.split('/').pop() ?? skillPath;

  const [meta, skillMeta, skillReadme] = await Promise.all([
    fetchRepoMeta(config.repo),
    fetchSkillMeta(config.repo, skillPath),
    fetchSkillReadme(config.repo, skillPath),
  ]);

  return {
    slug: skillMeta.id ?? skillSlug,
    name: skillMeta.name ?? skillSlug,
    description: skillMeta.description ?? '',
    category: config.category,
    platform: config.platform,
    isOfficial: config.isOfficial,
    installCommand: `git clone https://github.com/${config.repo}`,
    author: meta.owner.login,
    version: skillMeta.version ?? '1.0.0',
    readme: skillReadme,
    githubUrl: `https://github.com/${config.repo}/tree/main/${skillPath}`,
    tags: config.tags ?? [],
    updatedAt: meta.updated_at,
  };
}
