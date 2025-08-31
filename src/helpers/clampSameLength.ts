function clampSameLength<T extends Record<string, string[]>>(cols: T): T {
  const lens = Object.values(cols)
    .map((a) => a.length)
    .filter((n) => n > 0)
  const min = lens.length ? Math.min(...lens) : 0
  const out: any = {}
  for (const k of Object.keys(cols)) out[k] = cols[k].slice(0, min)
  return out as T
}

export default clampSameLength
