export function formatCurrency(value: number, options?: { maximumFractionDigits?: number }): string {
  const maximumFractionDigits = options?.maximumFractionDigits ?? 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
}

export function formatSignedCurrency(value: number): string {
  const sign = value < 0 ? '-' : value > 0 ? '+' : '';
  return `${sign}${formatCurrency(value)}`;
}

export function formatNet(value: number): string {
  const sign = value < 0 ? '- ' : '';
  return `${sign}${formatCurrency(value)}`;
}

export function formatTokenAmount(value: number): string {
  if (value === 0) return '0';
  const abs = Math.abs(value);

  if (abs < 0.000001) {
    return value.toExponential(2);
  }
  if (abs < 1) {
    return value.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
  }
  if (abs < 1000) {
    return value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  }
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}
