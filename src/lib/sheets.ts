import { parse } from "csv-parse/sync"

/**
 * Parse CSV text menjadi array objek.
 */
export function csvToRows<T = Record<string, string>>(csv: string): T[] {
  return parse(csv, { columns: true, skip_empty_lines: true, bom: true }) as T[]
}

/**
 * Bangun URL CSV dari ID sheet dan gid tab (format publish-to-web).
 */
export function sheetCsvUrl(sheetId: string, gid: string | number) {
  return `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=${gid}&single=true&output=csv`
}

/**
 * Fetch CSV dari URL lalu parse.
 */
export async function fetchCsvRows<T>(url: string): Promise<T[]> {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error(`CSV fetch ${res.status}`)
  return csvToRows<T>(await res.text())
}

/**
 * Pecah string dengan delimiter '|'.
 */
export const splitPipes = (s?: string) =>
  s?.trim()
    ? s
        .split("|")
        .map((x) => x.trim())
        .filter(Boolean)
    : []
