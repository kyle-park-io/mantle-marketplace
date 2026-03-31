'use client';

import { useState } from 'react';

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm">
      <code className="flex-1 font-mono text-gray-700">{command}</code>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded px-2 py-1 text-xs text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
