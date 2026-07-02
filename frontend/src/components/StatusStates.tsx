export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white py-20 shadow-sm dark:bg-koin-dark-surface">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-koin-blue-100 border-t-koin-blue-600" />
      <p className="text-sm font-medium text-koin-muted dark:text-koin-dark-muted">Loading your capital gains &amp; holdings…</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center dark:border-red-900/40 dark:bg-red-950/30">
      <p className="text-sm font-semibold text-koin-loss">Couldn't load your tax harvesting data</p>
      <p className="max-w-sm text-xs text-koin-muted dark:text-koin-dark-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 rounded-lg bg-koin-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-koin-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
