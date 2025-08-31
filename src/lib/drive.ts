// lib/drive.ts
const DRIVE_API = "https://www.googleapis.com/drive/v3/files"
const DRIVE_FIELDS = "nextPageToken,files(id,name,mimeType)"
const PAGE_SIZE = 100

function mustEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

// Escape single quote di nama folder: O'Neil -> O\'Neil (sesuai sintaks Drive query)
function escapeForQueryName(name: string) {
  return name.replace(/'/g, "\\'")
}

async function gfetch(url: string, revalidate: number) {
  const res = await fetch(url, { next: { revalidate } })
  const text = await res.text()
  if (!res.ok) {
    // lempar body mentah buat di-log
    throw new Error(`Drive API error ${res.status}: ${text}`)
  }
  return JSON.parse(text)
}

type ListOpts = {
  corpora?: "allDrives" | "user"
  includeAll?: boolean // includeItemsFromAllDrives + supportsAllDrives
}

async function findFolderIdByNameOnce(
  name: string,
  parentId: string,
  key: string,
  revalidate: number,
  opts: ListOpts
): Promise<string | undefined> {
  const q = encodeURIComponent(
    `name='${escapeForQueryName(
      name
    )}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
  )

  const params = [
    `q=${q}`,
    `fields=${encodeURIComponent("files(id,name)")}`,
    `pageSize=10`,
    `key=${key}`,
  ]

  if (opts.corpora) params.push(`corpora=${opts.corpora}`)
  if (opts.includeAll)
    params.push("includeItemsFromAllDrives=true", "supportsAllDrives=true")

  const url = `${DRIVE_API}?${params.join("&")}`
  const json = await gfetch(url, revalidate)
  return json.files?.[0]?.id
}

export async function resolveFolderPathIds(
  path: string[],
  revalidate = 3600,
  debug = false
) {
  const key = mustEnv("GOOGLE_API_KEY")
  const baseId = mustEnv("GOOGLE_DRIVE_FOLDER_ID")

  let parentId = baseId
  const trace: {
    segment: string
    tried: Array<{ mode: string; ok: boolean; id?: string }>
  }[] = []

  for (const raw of path) {
    const segment = raw.trim()
    const entry = {
      segment,
      tried: [] as Array<{ mode: string; ok: boolean; id?: string }>,
    }
    trace.push(entry)

    try {
      const id = await findFolderIdByNameOnce(
        segment,
        parentId,
        key,
        revalidate,
        {
          corpora: "allDrives",
          includeAll: true,
        }
      )
      entry.tried.push({ mode: "allDrives", ok: !!id, id })
      if (id) {
        parentId = id
        continue
      }
    } catch {
      entry.tried.push({ mode: "allDrives", ok: false })
    }

    try {
      const id = await findFolderIdByNameOnce(
        segment,
        parentId,
        key,
        revalidate,
        {
          corpora: "user",
          includeAll: false,
        }
      )
      entry.tried.push({ mode: "user", ok: !!id, id })
      if (id) {
        parentId = id
        continue
      }
    } catch {
      entry.tried.push({ mode: "user", ok: false })
    }

    throw new Error(`Folder not found: ${segment}`)
  }

  // ✅ selalu return object, nggak union lagi
  return debug ? { folderId: parentId, trace } : { folderId: parentId }
}

export type MediaItem = {
  id: string
  name: string
  mimeType: string
  url: string
  thumbUrl: string
  viewUrl: string
}

async function listOnce(
  folderId: string,
  key: string,
  revalidate: number,
  opts: ListOpts
) {
  const q = encodeURIComponent(
    `'${folderId}' in parents and trashed=false and (` +
      `mimeType contains 'image/' or ` +
      `mimeType contains 'video/' or ` +
      `mimeType='application/pdf' or ` +
      `mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document' or ` +
      `mimeType='application/msword' or ` +
      `mimeType='application/vnd.openxmlformats-officedocument.presentationml.presentation' or ` +
      `mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'` +
      `)`
  )

  const params = [
    `q=${q}`,
    `fields=${encodeURIComponent(DRIVE_FIELDS)}`,
    `pageSize=${PAGE_SIZE}`,
    `orderBy=name`,
    `key=${key}`,
  ]
  if (opts.corpora) params.push(`corpora=${opts.corpora}`)
  if (opts.includeAll)
    params.push("includeItemsFromAllDrives=true", "supportsAllDrives=true")

  let pageToken = ""
  const out: Array<{ id: string; name: string; mimeType: string }> = []

  do {
    const url = `${DRIVE_API}?${params.join("&")}${
      pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""
    }`
    const json = await gfetch(url, revalidate)
    out.push(...(json.files ?? []))
    pageToken = json.nextPageToken ?? ""
  } while (pageToken)

  return out
}

export async function listMediaInFolder(folderId: string, revalidate = 3600) {
  const key = mustEnv("GOOGLE_API_KEY")

  // Coba allDrives → fallback user
  let files: Array<{ id: string; name: string; mimeType: string }> = []
  try {
    files = await listOnce(folderId, key, revalidate, {
      corpora: "allDrives",
      includeAll: true,
    })
  } catch {
    files = await listOnce(folderId, key, revalidate, {
      corpora: "user",
      includeAll: false,
    })
  }

  const media: MediaItem[] = files.map((f) => ({
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    url: `https://drive.google.com/uc?export=view&id=${f.id}`,
    thumbUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1200`,
    viewUrl: `https://drive.google.com/file/d/${f.id}/view`,
  }))

  return media
}
