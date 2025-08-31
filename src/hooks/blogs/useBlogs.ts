import { Blog } from "@/app/api/blogs/route"
import useSWR from "swr"

type ApiRes<T> = { data: T }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useBlogs(page = 1, limit = 10) {
  const key = `/api/blogs?page=${page}&limit=${limit}`
  const { data, error, isLoading, isValidating } = useSWR<ApiRes<Blog[]>>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      keepPreviousData: true,
    }
  )

  const blogs = data?.data
  const isInitialLoading = isLoading && !blogs
  const isRefreshing = isValidating && !!blogs

  return { blogs, loading: isInitialLoading, isRefreshing, error }
}
