import { loadInformations } from "@/lib/informations"
import { loadAllProjects } from "@/lib/projects"
import { loadAllBlogs } from "@/lib/blogs"

export async function getInformationsSSR() {
  return await loadInformations()
}

export async function getProjectsSSR() {
  return await loadAllProjects()
}

export async function getBlogsSSR() {
  return await loadAllBlogs()
}
