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

export const formatRating = (value: number): string => {
  return (value / 100).toFixed(2)
}

export const formatDeliveryTimeToHour = (value: number) => {
  if (value >= 60) {
    const hours = Math.floor(value / 60)
    const remainingMinutes = value % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }
  return `${value} min`
}

export const formatDeliveryTimeToMinutes = (value: string) => {
  if (typeof value === "string" && value.includes("h")) {
    const [hours, minutes] = value.split("h").map((part) => parseInt(part) || 0);
    return hours * 60 + minutes
  }
  return parseInt(value, 10)
}