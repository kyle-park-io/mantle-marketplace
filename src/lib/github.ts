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
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/contents/package.json`,
  );
  if (res.status === 404) return {};
  if (!res.ok) {
    console.warn(
      `Failed to fetch package.json for ${repo}: HTTP ${res.status}`,
    );
    return {};
  }
  const data = (await res.json()) as { content: string; encoding: string };
  try {
    return JSON.parse(
      Buffer.from(data.content, 'base64').toString('utf-8'),
    ) as GithubPackageJson;
  } catch (err) {
    console.warn(`Failed to parse package.json for ${repo}:`, err);
    return {};
  }
}

export async function fetchItemFromRepo(
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

  return {
    slug: repoName,
    name: pkg.name ?? repoName,
    description: pkg.description ?? meta.description ?? '',
    category: config.category,
    platform: config.platform,
    isOfficial: config.isOfficial,
    installCommand: `claude install ${pkg.name ?? repoName}`,
    author: authorName,
    version: pkg.version ?? '0.0.0',
    readme,
    githubUrl: `https://github.com/${config.repo}`,
    tags: [],
    updatedAt: meta.updated_at,
  };
}
