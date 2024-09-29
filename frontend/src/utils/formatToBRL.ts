/**
 * Formats a number as Brazilian Real currency string.
 * @param value The number to format
 * @param options Optional configuration for the formatter
 * @returns Formatted currency string
 */
export function formatToBRL(value: number, options: {
  style?: 'currency' | 'decimal' | 'percent',
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name',
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
} = {}): string {
  const {
    style = 'currency',
    currencyDisplay = 'symbol',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  return new Intl.NumberFormat('pt-BR', {
    style,
    currency: 'BRL',
    currencyDisplay,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
}