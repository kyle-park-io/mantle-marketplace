// Year is resolved at build time (SSG). Hourly cron rebuilds keep it current.
const YEAR = new Date().getFullYear();

export function Footer() {
  const year = YEAR;

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              ▸ mantle
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Browse and install plugins, skills, and MCP tools.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/mantle-xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              GitHub
            </a>
            <a
              href="https://github.com/mantle-xyz/mantle-agent-scaffold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              Docs
            </a>
            <a
              href="https://github.com/mantle-xyz/mantle-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              Skills Repo
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-700">
          © {year} Mantle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
