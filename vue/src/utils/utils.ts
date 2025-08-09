export const formatCurrency = (value: number, currency = 'BRL', locale = 'pt-br'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
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
  if (typeof value === 'string' && value.includes('h')) {
    const [hours, minutes] = value.split('h').map((part) => Number.parseInt(part) || 0)
    return hours * 60 + minutes
  }
  return Number.parseInt(value, 10)
}

export const calculateDistance = (
  lat1: string,
  lon1: string,
  lat2: string,
  lon2: string,
): string => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return ''
  }
  const earthRadius = 6371
  const dLat = (Number(lat2) - Number(lat1)) * (Math.PI / 180)
  const dLon = (Number(lon2) - Number(lon1)) * (Math.PI / 180)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(Number(lat1) * (Math.PI / 180)) *
      Math.cos(Number(lat2) * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceInKm = earthRadius * c

  if (distanceInKm < 1) {
    const distanceInMeters = Math.round(distanceInKm * 1000)
    const roundedDistance = Math.round(distanceInMeters / 50) * 50
    return `${roundedDistance} m`
  }

  return `${distanceInKm.toFixed(2)} km`
}
