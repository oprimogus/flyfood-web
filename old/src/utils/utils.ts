export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const formatCurrency = (value: number, currency: string = "BRL", locale: string = "pt-br"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(value / 100)
}