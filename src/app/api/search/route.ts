import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/data';
import type { Platform, Category } from '@/lib/types';

export function GET(request: NextRequest): NextResponse {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q')?.toLowerCase() ?? '';
  const platform = searchParams.get('platform') as Platform | null;
  const category = searchParams.get('category') as Category | null;

  let items = getAllItems();

  if (platform) {
    items = items.filter((item) => item.platform === platform);
  }

  if (category) {
    items = items.filter((item) => item.category === category);
  }

  if (q) {
    let regex: RegExp;
    try {
      regex = new RegExp(q, 'i');
    } catch {
      regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    items = items.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.description) ||
        item.tags.some((tag) => regex.test(tag)),
    );
  }

  return NextResponse.json(items);
}
