import type { GithubSyncConfig, MarketplaceItem } from './types';

interface GithubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  topics: string[];
}

interface GithubPackageJson {
  version?: string;
  author?: string | { name: string };
}

async function fetchWithAuth(url: string): Promise<Response> {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
  if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
    headers['Authorization'] =
      `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`;
  }
  return fetch(url, { headers });
}

async function fetchRepoMeta(repo: string): Promise<GithubRepoResponse> {
  const res = await fetchWithAuth(`https://api.github.com/repos/${repo}`);
  if (!res.ok) throw new Error(`Failed to fetch repo ${repo}: ${res.status}`);
  return res.json() as Promise<GithubRepoResponse>;
}

async function fetchReadme(repo: string): Promise<string> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/readme`,
  );
  if (!res.ok) return '';
  const data = (await res.json()) as { content: string; encoding: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function fetchPackageJson(repo: string): Promise<GithubPackageJson> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/contents/package.json`,
  );
  if (!res.ok) return {};
  const data = (await res.json()) as { content: string; encoding: string };
  try {
    return JSON.parse(
      Buffer.from(data.content, 'base64').toString('utf-8'),
    ) as GithubPackageJson;
  } catch {
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

  const repoName = config.repo.split('/')[1];
  const author =
    typeof pkg.author === 'string'
      ? pkg.author
      : (pkg.author?.name ?? config.repo.split('/')[0]);

  return {
    slug: repoName,
    name: repoName,
    description: meta.description ?? '',
    category: config.category,
    platform: config.platform,
    isOfficial: config.isOfficial,
    installCommand: `claude install ${repoName}`,
    author,
    version: pkg.version ?? '0.0.0',
    readme,
    githubUrl: meta.html_url,
    tags: meta.topics,
    updatedAt: meta.pushed_at,
  };
}
