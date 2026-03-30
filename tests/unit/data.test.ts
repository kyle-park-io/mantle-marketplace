import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockItems = [
  {
    slug: 'mantle-agent-scaffold',
    name: 'mantle-mcp',
    description: 'Mantle MCP tool',
    category: 'plugins' as const,
    platform: 'mantle' as const,
    isOfficial: true,
    installCommand: 'claude install mantle-mcp',
    author: 'mantle-xyz',
    version: '1.0.0',
    readme: '# Mantle MCP',
    githubUrl: 'https://github.com/mantle-xyz/mantle-agent-scaffold',
    tags: ['mcp', 'mantle'],
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    slug: 'mantle-skills',
    name: 'mantle-skills',
    description: 'Mantle skills collection',
    category: 'skills' as const,
    platform: 'mantle' as const,
    isOfficial: true,
    installCommand: 'claude install mantle-skills',
    author: 'mantle-xyz',
    version: '1.0.0',
    readme: '# Mantle Skills',
    githubUrl: 'https://github.com/mantle-xyz/mantle-skills',
    tags: ['skills', 'mantle'],
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    slug: 'bybit-plugin',
    name: 'bybit-plugin',
    description: 'Bybit plugin',
    category: 'plugins' as const,
    platform: 'bybit' as const,
    isOfficial: false,
    installCommand: 'claude install bybit-plugin',
    author: 'bybit',
    version: '0.1.0',
    readme: '',
    tags: [],
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

vi.mock('@/lib/data', () => ({
  getAllItems: vi.fn(() => mockItems),
  getItemsByPlatformAndCategory: vi.fn((platform: string, category: string) =>
    mockItems.filter((i) => i.platform === platform && i.category === category),
  ),
  getItemBySlug: vi.fn((platform: string, category: string, slug: string) =>
    mockItems.find(
      (i) =>
        i.platform === platform && i.category === category && i.slug === slug,
    ),
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getAllItems', () => {
  it('returns all items', async () => {
    const { getAllItems } = await import('@/lib/data');
    const items = getAllItems();
    expect(items).toHaveLength(3);
  });
});

describe('getItemsByPlatformAndCategory', () => {
  it('filters by platform and category', async () => {
    const { getItemsByPlatformAndCategory } = await import('@/lib/data');
    const items = getItemsByPlatformAndCategory('mantle', 'plugins');
    expect(items).toHaveLength(1);
    expect(items[0].slug).toBe('mantle-agent-scaffold');
  });

  it('returns empty array for platform with no items', async () => {
    const { getItemsByPlatformAndCategory } = await import('@/lib/data');
    const items = getItemsByPlatformAndCategory('byreal', 'plugins');
    expect(items).toHaveLength(0);
  });

  it('filters skills separately from plugins', async () => {
    const { getItemsByPlatformAndCategory } = await import('@/lib/data');
    const items = getItemsByPlatformAndCategory('mantle', 'skills');
    expect(items).toHaveLength(1);
    expect(items[0].slug).toBe('mantle-skills');
  });
});

describe('getItemBySlug', () => {
  it('finds item by slug', async () => {
    const { getItemBySlug } = await import('@/lib/data');
    const item = getItemBySlug('mantle', 'skills', 'mantle-skills');
    expect(item).toBeDefined();
    expect(item?.name).toBe('mantle-skills');
  });

  it('returns undefined for unknown slug', async () => {
    const { getItemBySlug } = await import('@/lib/data');
    const item = getItemBySlug('mantle', 'plugins', 'nonexistent');
    expect(item).toBeUndefined();
  });

  it('returns undefined when platform does not match', async () => {
    const { getItemBySlug } = await import('@/lib/data');
    const item = getItemBySlug('bybit', 'plugins', 'mantle-agent-scaffold');
    expect(item).toBeUndefined();
  });
});
