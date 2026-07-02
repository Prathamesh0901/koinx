import { useState } from 'react';

export default function CoinIcon({ src, symbol, size = 32 }: { src: string; symbol: string; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-koin-blue-100 font-bold text-koin-blue-600 dark:bg-koin-dark-surface-alt dark:text-koin-blue-300"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {symbol.replace('$', '').slice(0, 1)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={symbol}
      width={size}
      height={size}
      className="shrink-0 rounded-full bg-koin-page object-contain dark:bg-koin-dark-surface-alt"
      onError={() => setFailed(true)}
    />
  );
}
