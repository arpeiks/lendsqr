import transporter from './nodemailer'

export const sendVerifyAccountMail = async (to: string, html: string) => {
  return await transporter.sendMail({
    to,
    html,
    from: 'Lendsqr 👻',
    subject: 'Welcome to Lendsqr 👻',
  })
}
