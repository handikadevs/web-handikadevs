function zipToObjects<T extends Record<string, string[]>>(cols: T) {
  const keys = Object.keys(cols) as (keyof T)[]
  const max = Math.max(...keys.map((k) => cols[k]?.length ?? 0))
  const out: Record<string, any>[] = []
  for (let i = 0; i < max; i++) {
    const obj: Record<string, any> = {}
    keys.forEach((k) => {
      obj[k as string] = cols[k]?.[i] ?? ""
    })
    out.push(obj)
  }
  return out
}

export default zipToObjects
