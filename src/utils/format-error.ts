import { ValidationError } from 'class-validator'

function dfs(src: ValidationError[], dest: string[], msg: any = null) {
  const cur = msg ? `${msg}` : ''
  for (const validationError of src) {
    if (validationError.constraints) {
      for (const key in validationError.constraints) {
        if (validationError.constraints[key]) {
          dest.push(`${validationError.constraints[key]}`)
        }
      }
    }

    if (validationError.children && validationError.children.length) {
      const formatProperty = cur
        ? `.${validationError.property}`
        : `${validationError.property}`
      const field = isNaN(parseInt(validationError.property, 10))
        ? formatProperty
        : `[${validationError.property}]`
      dfs(validationError.children, dest, `${cur}${field}`)
    }
  }
}

export class Format {
  public static error(validationErrors: ValidationError[]) {
    const dest: string[] = []
    dfs(validationErrors, dest)
    return dest
  }
}
