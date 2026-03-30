import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockItems = [
  {
    slug: 'mantle-mcp',
    name: 'Mantle MCP',
    description: 'MCP tool for mantle',
    category: 'plugins',
    platform: 'mantle',
    isOfficial: true,
    installCommand: 'claude install mantle-mcp',
    author: 'mantle-xyz',
    version: '1.0.0',
    readme: '',
    tags: ['mcp', 'official'],
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    slug: 'mantle-skills',
    name: 'Mantle Skills',
    description: 'Skills collection',
    category: 'skills',
    platform: 'mantle',
    isOfficial: true,
    installCommand: 'claude install mantle-skills',
    author: 'mantle-xyz',
    version: '1.0.0',
    readme: '',
    tags: ['skills'],
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    slug: 'bybit-plugin',
    name: 'Bybit Plugin',
    description: 'Plugin for bybit',
    category: 'plugins',
    platform: 'bybit',
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
  getAllItems: () => mockItems,
}));

beforeEach(() => {
  vi.resetModules();
});

function makeRequest(params: Record<string, string>) {
  const url = new URL('http://localhost:3000/api/search');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return new NextRequest(url);
}

describe('GET /api/search', () => {
  it('returns all items with no filters', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({}));
    const data = await res.json();
    expect(data).toHaveLength(3);
  });

  it('filters by platform', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({ platform: 'mantle' }));
    const data = await res.json();
    expect(data).toHaveLength(2);
    expect(
      data.every((i: { platform: string }) => i.platform === 'mantle'),
    ).toBe(true);
  });

  it('filters by category', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({ category: 'plugins' }));
    const data = await res.json();
    expect(data).toHaveLength(2);
    expect(
      data.every((i: { category: string }) => i.category === 'plugins'),
    ).toBe(true);
  });

  it('filters by query string (name match)', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({ q: 'bybit' }));
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].slug).toBe('bybit-plugin');
  });

  it('filters by query string (tag match)', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({ q: 'official' }));
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].slug).toBe('mantle-mcp');
  });

  it('returns empty array for no matches', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(makeRequest({ q: 'zzznomatch' }));
    const data = await res.json();
    expect(data).toHaveLength(0);
  });

  it('combines platform and category filters', async () => {
    const { GET } = await import('@/app/api/search/route');
    const res = await GET(
      makeRequest({ platform: 'mantle', category: 'skills' }),
    );
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].slug).toBe('mantle-skills');
  });
});
