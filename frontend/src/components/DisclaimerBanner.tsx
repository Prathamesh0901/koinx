import { useState } from 'react';

const NOTES = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
];

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 text-koin-blue-600">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 shrink-0 text-koin-blue-600 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DisclaimerBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-koin-blue-100 bg-koin-blue-50 dark:border-koin-dark-border dark:bg-koin-dark-surface-alt">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <InfoIcon />
          <span className="text-sm font-semibold text-koin-text dark:text-koin-dark-text sm:text-base">
            Important Notes &amp; Disclaimers
          </span>
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="space-y-2 px-4 pb-4 pl-11 text-sm leading-relaxed text-koin-muted dark:text-koin-dark-muted sm:px-5 sm:pl-12">
          {NOTES.map((note) => (
            <li key={note} className="list-disc marker:text-koin-blue-400">
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
