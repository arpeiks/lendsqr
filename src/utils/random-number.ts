export const randomNumber = (len = 6): string => {
  let num = ''
  const digits = '0123456789'

  for (let i = 0; i < len; i++) {
    num += digits[Math.floor(Math.random() * 10)]
  }

  return num
}
