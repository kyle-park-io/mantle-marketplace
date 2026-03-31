import { describe, it, expect } from 'vitest';
import {
  PLATFORMS,
  CATEGORIES,
  DEFAULT_PLATFORM,
  DEFAULT_CATEGORY,
  SYNC_CONFIGS,
} from '@/lib/constants';

describe('PLATFORMS', () => {
  it('contains mantle, bybit, byreal', () => {
    expect(PLATFORMS).toContain('mantle');
    expect(PLATFORMS).toContain('bybit');
    expect(PLATFORMS).toContain('byreal');
  });
});

describe('CATEGORIES', () => {
  it('contains plugins, skills, mcp', () => {
    expect(CATEGORIES).toContain('plugins');
    expect(CATEGORIES).toContain('skills');
    expect(CATEGORIES).toContain('mcp');
  });

  it('has plugins first', () => {
    expect(CATEGORIES[0]).toBe('plugins');
  });
});

describe('DEFAULT_PLATFORM', () => {
  it('is mantle', () => {
    expect(DEFAULT_PLATFORM).toBe('mantle');
  });
});

describe('DEFAULT_CATEGORY', () => {
  it('is plugins', () => {
    expect(DEFAULT_CATEGORY).toBe('plugins');
  });
});

describe('SYNC_CONFIGS', () => {
  it('has no duplicate entries', () => {
    const seen = new Set<string>();
    for (const config of SYNC_CONFIGS) {
      const key = config.skillPath
        ? `${config.platform}:${config.category}:${config.skillPath}`
        : `${config.platform}:${config.category}:${config.repo}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  it('all repos follow owner/repo format', () => {
    for (const config of SYNC_CONFIGS) {
      expect(config.repo).toMatch(/^[\w.-]+\/[\w.-]+$/);
    }
  });

  it('all platforms are valid', () => {
    for (const config of SYNC_CONFIGS) {
      expect(PLATFORMS).toContain(config.platform);
    }
  });

  it('all categories are valid', () => {
    for (const config of SYNC_CONFIGS) {
      expect(CATEGORIES).toContain(config.category);
    }
  });
});
