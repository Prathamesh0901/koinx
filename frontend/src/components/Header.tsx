import ThemeToggle from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';

function KoinXLogo() {
  return (
    <div className="flex items-center gap-0.5 select-none">
      <span className="text-2xl font-extrabold tracking-tight text-koin-navy dark:text-koin-dark-text">Koin</span>
      <span className="text-2xl font-extrabold tracking-tight text-koin-orange">X</span>
      <sup className="mt-1 text-[10px] font-semibold text-koin-muted dark:text-koin-dark-muted">®</sup>
    </div>
  );
}

export default function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  return (
    <header className="w-full">
      <div className="border-b border-koin-border/80 bg-white/80 backdrop-blur dark:border-koin-dark-border dark:bg-koin-dark-surface/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <KoinXLogo />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-4 pt-4 sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-koin-text dark:text-koin-dark-text sm:text-2xl">Tax Harvesting</h1>
          <div className="group relative">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-koin-blue-600 underline decoration-koin-blue-300 underline-offset-2 transition hover:text-koin-blue-700 dark:text-koin-blue-400 dark:hover:text-koin-blue-300"
            >
              How it works?
            </a>
            <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-xl border border-koin-dark-border bg-koin-navy p-4 text-left text-sm text-white opacity-0 shadow-xl shadow-slate-950/20 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 scale-95">
              <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-koin-navy" />
              <p className="text-sm leading-6 text-slate-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.
              </p>
              <a href="#how-it-works" className="mt-3 inline-flex text-sm font-semibold text-koin-blue-300 hover:text-koin-blue-200">
                Know More
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
