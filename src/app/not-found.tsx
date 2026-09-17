import Link from "next/link"

import Navbar from "@/src/app/components/Navbar"

export default function NotFound() {
    return (
        <>
            <Navbar />

            <main className="flex min-h-screen items-center px-5 py-32 sm:px-6 md:px-10">
                <div className="mx-auto w-full max-w-7xl">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                        404 — Not Found
                    </p>

                    <h1 className="mt-6 text-[18vw] font-bold leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-9xl">
                        Lost
                        <br />
                        already?
                    </h1>

                    <p className="mt-8 max-w-md text-sm leading-[1.6] text-black/50 dark:text-white/50 sm:text-base">
                        This page doesn't exist or may have been moved.
                    </p>

                    <Link
                        href="/"
                        className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        ← Back Home
                    </Link>
                </div>
            </main>
        </>
    )
}