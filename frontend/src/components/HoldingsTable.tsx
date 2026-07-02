import { useMemo, useState } from 'react';
import type { Holding } from '../types';
import { formatCurrency, formatTokenAmount } from '../utils/format';
import CoinIcon from './CoinIcon';
import GainCell from './GainCell';

interface Props {
  holdings: Holding[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}

const INITIAL_VISIBLE = 6;

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="h-4 w-4 cursor-pointer rounded border-koin-border text-koin-blue-600 accent-koin-blue-600 focus:ring-koin-blue-500"
    />
  );
}

export default function HoldingsTable({ holdings, selectedIds, onToggle, onToggleAll }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visibleHoldings = useMemo(
    () => (showAll ? holdings : holdings.slice(0, INITIAL_VISIBLE)),
    [holdings, showAll],
  );

  const allSelected = holdings.length > 0 && selectedIds.size === holdings.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-koin-dark-surface dark:text-koin-dark-text sm:p-6">
      <h2 className="mb-4 text-base font-bold text-koin-text dark:text-koin-dark-text sm:text-lg">Holdings</h2>

      {/* ---------- Mobile list (below md) ---------- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 border-b border-koin-border px-1 pb-2 text-xs font-medium text-koin-muted dark:border-koin-dark-border dark:text-koin-dark-muted">
          <Checkbox checked={allSelected} onChange={onToggleAll} label="Select all holdings" />
          <span className="flex-1">Asset</span>
          <span>Holdings</span>
        </div>
        <ul>
          {visibleHoldings.map((h) => (
            <li key={h.id} className="flex items-center gap-3 border-b border-koin-border/70 px-1 py-3 last:border-b-0 dark:border-koin-dark-border">
              <Checkbox checked={selectedIds.has(h.id)} onChange={() => onToggle(h.id)} label={`Select ${h.coin}`} />
              <CoinIcon src={h.logo} symbol={h.coin} size={30} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-koin-text dark:text-koin-dark-text">{h.coinName}</p>
                <p className="text-xs text-koin-muted dark:text-koin-dark-muted">{h.coin}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums text-koin-text dark:text-koin-dark-text">
                  {formatTokenAmount(h.totalHolding)} {h.coin}
                </p>
                <p className="text-xs text-koin-muted tabular-nums dark:text-koin-dark-muted">{formatCurrency(h.currentPrice)}/{h.coin}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Desktop table (md and up) ---------- */}
      <div className="koin-scroll hidden overflow-x-auto md:block">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-koin-page text-xs font-semibold uppercase tracking-wide text-koin-muted dark:bg-koin-dark-surface-alt dark:text-koin-dark-muted">
              <th className="rounded-l-lg py-3 pl-4 pr-2">
                <Checkbox checked={allSelected} onChange={onToggleAll} label="Select all holdings" />
              </th>
              <th className="py-3 pr-4">Asset</th>
              <th className="py-3 pr-4">
                Holdings
                <div className="text-[10px] font-normal normal-case text-koin-muted/80">Avg. buy price</div>
              </th>
              <th className="py-3 pr-4 text-right">
                Current Price
              </th>
              <th className="py-3 pr-4 text-right">Short-term</th>
              <th className="py-3 pr-4 text-right">Long-term</th>
              <th className="rounded-r-lg py-3 pr-4 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((h) => {
              const isSelected = selectedIds.has(h.id);
              return (
                <tr
                  key={h.id}
                  className={`border-b border-koin-border/70 text-sm transition-colors last:border-b-0 dark:border-koin-dark-border ${
                    isSelected ? 'bg-koin-blue-50 dark:bg-koin-dark-surface-alt' : 'hover:bg-koin-page dark:hover:bg-koin-dark-surface-alt'
                  }`}
                >
                  <td className="py-3 pl-4">
                    <Checkbox checked={isSelected} onChange={() => onToggle(h.id)} label={`Select ${h.coin}`} />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <CoinIcon src={h.logo} symbol={h.coin} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-koin-text dark:text-koin-dark-text">{h.coinName}</p>
                        <p className="text-xs text-koin-muted dark:text-koin-dark-muted">{h.coin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="font-medium tabular-nums text-koin-text dark:text-koin-dark-text">
                      {formatTokenAmount(h.totalHolding)} {h.coin}
                    </p>
                    <p className="text-xs text-koin-muted tabular-nums dark:text-koin-dark-muted">{formatCurrency(h.averageBuyPrice)}/{h.coin}</p>
                  </td>
                  <td className="py-3 pr-4 text-right font-medium tabular-nums text-koin-text">
                    {formatCurrency(h.currentPrice)}
                  </td>
                  <td className="py-3 pr-4">
                    <GainCell data={h.stcg} unit={h.coin} />
                  </td>
                  <td className="py-3 pr-4">
                    <GainCell data={h.ltcg} unit={h.coin} />
                  </td>
                  <td className="py-3 pr-4 text-right font-medium tabular-nums text-koin-text">
                    {isSelected ? `${formatTokenAmount(h.totalHolding)} ${h.coin}` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {someSelected && (
        <p className="mt-3 text-xs text-koin-muted dark:text-koin-dark-muted">{selectedIds.size} of {holdings.length} assets selected</p>
      )}

      {holdings.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-4 text-sm font-semibold text-koin-blue-600 underline decoration-koin-blue-300 underline-offset-2 hover:text-koin-blue-700"
        >
          {showAll ? 'View less' : 'View all'}
        </button>
      )}
    </div>
  );
}
