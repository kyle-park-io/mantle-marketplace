import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mantle Agent Marketplace',
  description:
    'Browse and install plugins, skills, and MCP tools for the Mantle ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
