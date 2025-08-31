type Entry<T> = { value: T; expiresAt: number }

const store = new Map<string, Entry<any>>()

export function getCache<T>(key: string): T | undefined {
  const e = store.get(key)
  if (!e) return undefined
  if (Date.now() > e.expiresAt) {
    store.delete(key)
    return undefined
  }
  return e.value as T
}

export function setCache<T>(key: string, value: T, ttlSeconds: number) {
  store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
}

export async function getOrSet<T>(
  key: string,
  ttlSeconds: number,
  loader: () => Promise<T>
): Promise<T> {
  const from = getCache<T>(key)
  if (from !== undefined) return from
  const val = await loader()
  setCache(key, val, ttlSeconds)
  return val
}
