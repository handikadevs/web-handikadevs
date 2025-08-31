import { loadAllBlogs } from "./blogs/route"
import { loadInformations } from "./informations/route"
import { loadAllProjects } from "./projects/route"

export async function getInformationsSSR() {
  return await loadInformations()
}

export async function getProjectsSSR() {
  return await loadAllProjects()
}

export async function getBlogsSSR() {
  return await loadAllBlogs()
}
