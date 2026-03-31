import Image from 'next/image';

// Year is resolved at build time (SSG). Hourly cron rebuilds keep it current.
const YEAR = new Date().getFullYear();

export function Footer() {
  const year = YEAR;

  return (
    <footer className="border-t border-orange-100 bg-orange-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logos/mantle-logo-full.svg"
                alt="Mantle logo"
                width={120}
                height={28}
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-stone-600">
              Browse and install Plugins, Skills, and MCP tools.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Official Mantle
            </p>
            <a
              href="https://x.com/Mantle_Official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 transition-colors hover:text-orange-500"
            >
              𝕏 Mantle Official
            </a>
            <a
              href="https://mantle-xyz.github.io/mantle-agent-scaffold/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 transition-colors hover:text-orange-500"
            >
              Docs
            </a>
            <a
              href="https://github.com/mantle-xyz/mantle-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 transition-colors hover:text-orange-500"
            >
              Skills Repo
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-stone-500">
          © {year} kyle-park-io. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
