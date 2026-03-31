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
    <div className="flex items-center gap-3 rounded-lg border border-stone-800 bg-stone-950 px-4 py-3 text-sm">
      <code className="flex-1 select-all font-mono text-stone-100">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
