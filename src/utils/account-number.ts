export const generateAccountNumber = (id: any) => {
  let year: string | number = new Date().getFullYear()
  let month: string | number = new Date().getMonth()

  id = String(id).padStart(4, '0')
  year = String(year).padStart(4, '0')
  month = String(month).padStart(2, '0')

  return year + month + id
}
