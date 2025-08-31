import { Project } from "@/app/api/projects/route"
import useSWR from "swr"

type ApiRes<T> = { data: T }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useProjects(page = 1, limit = 10) {
  const key = `/api/projects?page=${page}&limit=${limit}`
  const { data, error, isLoading, isValidating } = useSWR<ApiRes<Project[]>>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      keepPreviousData: true,
    }
  )

  const projects = data?.data
  const isInitialLoading = isLoading && !projects
  const isRefreshing = isValidating && !!projects

  return { projects, loading: isInitialLoading, isRefreshing, error }
}
