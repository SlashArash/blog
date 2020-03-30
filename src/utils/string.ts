export const kebabCase = (str: string) =>
  str.split(/[_\s]/).reduce((res, part) => {
    if (part.length > 0) {
      if (res.length > 0) {
        res = `${res}-${part}`
      }
      return part
    }
    return res
  }, '')
