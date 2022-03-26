import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  host: 'smtp.gmail.com',
  auth: {
    pass: 'pocdenjwcwbqflmz',
    user: 'ribbon.v1testmail@gmail.com',
  },
})

export const sendMail = async (to: string, html: string) => {
  return await transporter.sendMail({
    to,
    html,
    from: 'Lendsqr 👻',
    subject: 'Welcome to Lendsqr 👻',
  })
}
