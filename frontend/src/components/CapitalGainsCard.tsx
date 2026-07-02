import type { CapitalGainsData, NetGains } from '../types';
import { formatCurrency, formatNet } from '../utils/format';

interface Props {
  variant: 'pre' | 'after';
  data: CapitalGainsData;
  net: NetGains;
  savings?: number;
  showSavings?: boolean;
}

export default function CapitalGainsCard({ variant, data, net, savings = 0, showSavings = false }: Props) {
  const isAfter = variant === 'after';

  const containerClass = isAfter
    ? 'bg-gradient-to-br from-koin-blue-600 to-koin-blue-500 text-white shadow-lg shadow-koin-blue-600/20'
    : 'bg-white text-koin-text shadow-sm dark:bg-koin-dark-surface dark:text-koin-dark-text';

  const labelClass = isAfter ? 'text-blue-100' : 'text-koin-muted dark:text-koin-dark-muted';
  const columnHeadClass = isAfter ? 'text-blue-100' : 'text-koin-muted dark:text-koin-dark-muted';
  const lossClass = isAfter ? 'text-red-200' : 'text-koin-loss';
  const netClass = isAfter ? 'text-white' : 'text-koin-text dark:text-koin-dark-text';

  return (
    <div className={`rounded-2xl border ${isAfter ? 'border-transparent' : 'border-koin-border dark:border-koin-dark-border'} p-5 sm:p-6 ${containerClass}`}>
      <h2 className="text-base font-bold sm:text-lg">{isAfter ? 'After Harvesting' : 'Pre Harvesting'}</h2>

      <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 text-sm sm:gap-x-8">
        <span />
        <span className={`text-right font-medium ${columnHeadClass}`}>Short-term</span>
        <span className={`text-right font-medium ${columnHeadClass}`}>Long-term</span>

        <span className={labelClass}>Profits</span>
        <span className="text-right font-semibold tabular-nums">{formatCurrency(data.stcg.profits)}</span>
        <span className="text-right font-semibold tabular-nums">{formatCurrency(data.ltcg.profits)}</span>

        <span className={labelClass}>Losses</span>
        <span className={`text-right font-semibold tabular-nums ${lossClass}`}>- {formatCurrency(data.stcg.losses)}</span>
        <span className={`text-right font-semibold tabular-nums ${lossClass}`}>- {formatCurrency(data.ltcg.losses)}</span>

        <span className={labelClass}>Net Capital Gains</span>
        <span className={`text-right font-bold tabular-nums ${netClass}`}>{formatNet(net.stcgNet)}</span>
        <span className={`text-right font-bold tabular-nums ${netClass}`}>{formatNet(net.ltcgNet)}</span>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-2 border-t border-dashed border-white/0 pt-1">
        <span className={`text-sm font-semibold sm:text-base ${isAfter ? 'text-white' : 'text-koin-text'}`}>
          {isAfter ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
        </span>
        <span className="text-xl font-extrabold tabular-nums sm:text-2xl">{formatNet(net.realised)}</span>
      </div>

      {isAfter && showSavings && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm font-medium">
          <span aria-hidden>🎉</span>
          <span>
            You are going to save upto <span className="font-bold">{formatCurrency(savings)}</span>
          </span>
        </div>
      )}
    </div>
  );
}
