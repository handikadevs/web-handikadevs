export const splitToList = (input: string): string[] => {
  const matches = [...input.matchAll(/<>\s*([\s\S]*?)\s*<\/>/g)]
  return matches.map((m) => m[1].trim())
}

export const splitFragments = (input: string): string[] => {
  const matches = [...input.matchAll(/<>\s*([\s\S]*?)\s*<\/>/g)]
  return matches.length > 0 ? matches.map((m) => m[1].trim()) : []
}
