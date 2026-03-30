import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
