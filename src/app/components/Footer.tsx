export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">

        <div>
          <p className="text-lg font-bold tracking-tight">
            ANISH.
          </p>

          <p className="mt-2 text-sm text-black/40">
            © {new Date().getFullYear()} Anish Singhal. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <a
            href="https://www.behance.net/art3mis_berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black/60 transition-opacity hover:opacity-50"
          >
            Behance ↗
          </a>

          <a
            href="https://www.instagram.com/_vision.with.variety_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black/60 transition-opacity hover:opacity-50"
          >
            Instagram ↗
          </a>

          <a
            href="https://www.linkedin.com/in/anish-singhal-291437191/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black/60 transition-opacity hover:opacity-50"
          >
            LinkedIn ↗
          </a>
        </div>

      </div>
    </footer>
  )
}