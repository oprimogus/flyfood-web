export const formatCurrency = (
  value: number,
  currency = 'BRL',
  locale = 'pt-br'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value / 100)
}
