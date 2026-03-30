import { redirect } from 'next/navigation';
import { DEFAULT_CATEGORY } from '@/lib/constants';

interface PageProps {
  params: Promise<{ platform: string }>;
}

export default async function PlatformPage({ params }: PageProps) {
  const { platform } = await params;
  redirect(`/${platform}/${DEFAULT_CATEGORY}`);
}
