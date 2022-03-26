import fs from 'fs'
import path from 'path'

const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, 'g'), replace)
}

const resolveMailTemplate = async (template: string, data: any) => {
  let dir = `../mail-templates/${template}.html`
  dir = path.resolve(__dirname, dir)

  let html = await fs.promises.readFile(dir, 'utf8')

  Object.keys(data).map((i) => {
    html = replaceAll(html, `{{ ${i} }}`, data[i])
  })

  return html
}

export const welcomeMailTemplate = (link: string, template: string) => {
  const data = { link, title: 'Welcome to Lendsqr' }
  return resolveMailTemplate(template, data)
}
