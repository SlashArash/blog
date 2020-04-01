export const kebabCase = (str: string) =>
  str.split(/[_\s\u200C]/).reduce((res, part) => {
    if (part.length > 0) {
      if (res.length > 0) {
        return `${res}-${part}`
      }
      return part
    }
    return res
  }, '')
