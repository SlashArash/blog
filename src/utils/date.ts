export const PersianDate = (dateTime: string): string => {
  const date = new Date(dateTime)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat('fa-IR', options).format(date)
}

export const persianCurrentDate = () => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return new Intl.DateTimeFormat('fa-IR', options).format(new Date())
}
