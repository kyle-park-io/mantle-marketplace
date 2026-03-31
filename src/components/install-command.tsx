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
    <div className="flex items-center gap-3 rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 text-sm">
      <code className="flex-1 select-all font-mono text-stone-100">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-md border border-stone-600 bg-stone-800 px-3 py-1.5 text-xs font-semibold text-stone-300 transition-colors hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
