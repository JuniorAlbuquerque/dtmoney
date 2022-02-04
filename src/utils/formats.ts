export const formatCurrency  = (value: number, type?: string) => {
  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

  if (type === 'withdraw' && value !== 0) {
    return `- ${currency}`
  }

  return currency
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}