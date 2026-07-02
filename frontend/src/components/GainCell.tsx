import type { GainBalance } from '../types';
import { formatSignedCurrency, formatTokenAmount } from '../utils/format';

export default function GainCell({ data, unit }: { data: GainBalance; unit: string }) {
  if (data.balance === 0 && data.gain === 0) {
    return <span className="text-sm text-koin-muted dark:text-koin-dark-muted">-</span>;
  }

  const colorClass = data.gain > 0 ? 'text-koin-gain' : data.gain < 0 ? 'text-koin-loss' : 'text-koin-text dark:text-koin-dark-text';

  return (
    <div className="text-right">
      <div className={`text-sm font-semibold tabular-nums ${colorClass}`}>{formatSignedCurrency(data.gain)}</div>
      <div className="text-xs text-koin-muted tabular-nums dark:text-koin-dark-muted">
        {formatTokenAmount(data.balance)} {unit}
      </div>
    </div>
  );
}
