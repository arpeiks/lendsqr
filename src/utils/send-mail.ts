import transporter from './nodemailer'

export const sendVerifyAccountMail = async () =>
  await transporter.sendMail({
    from: 'Lendsqr 👻',
    to: 'arpeiks@gmail.com',
    subject: 'Welcome to Lendsqr 👻',
    text: 'Welcome, Verify your account',
    html: '<b>Welcome, Verify your account</b>',
  })
