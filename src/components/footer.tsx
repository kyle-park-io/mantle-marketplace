import Image from 'next/image';

// Year is resolved at build time (SSG). Hourly cron rebuilds keep it current.
const YEAR = new Date().getFullYear();

export function Footer() {
  const year = YEAR;

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logos/mantle.svg"
                alt="Mantle logo"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
                mantle
              </p>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Browse and install plugins, skills, and MCP tools.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/kyle-park-io/mantle-marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-500 transition-colors hover:text-stone-900"
            >
              GitHub
            </a>
            <a
              href="https://github.com/mantle-xyz/mantle-agent-scaffold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-500 transition-colors hover:text-stone-900"
            >
              Docs
            </a>
            <a
              href="https://github.com/mantle-xyz/mantle-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-500 transition-colors hover:text-stone-900"
            >
              Skills Repo
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-stone-400">
          © {year} kyle-park-io. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
