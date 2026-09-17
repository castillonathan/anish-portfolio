export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] text-[#171717] dark:bg-[#171717] dark:text-[#f7f5f0]">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-40">
          Loading
        </p>

        <div className="mt-6 h-1 w-16 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-black dark:bg-white" />
        </div>
      </div>
    </main>
  )
}