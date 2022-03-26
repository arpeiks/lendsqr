import * as lodash from 'lodash'

const defMap = (x: any) => x
export const snakeCaseObjectMap = (model: any, mapFn: any = defMap): any => {
  if (Array.isArray(model)) return model.map((mod) => snakeCaseObjectMap(mod))

  const object = Object.assign({}, model)

  return Object.keys(object).reduce((result: any, key) => {
    result[lodash.snakeCase(key)] = mapFn(object[key])
    return result
  }, {})
}

export const camelCaseObjectMap = (model: any, mapFn: any = defMap): any => {
  if (Array.isArray(model)) return model.map((mod) => camelCaseObjectMap(mod))

  const object = Object.assign({}, model)

  return Object.keys(object).reduce((result: any, key) => {
    result[lodash.camelCase(key)] = mapFn(object[key])
    return result
  }, {})
}
