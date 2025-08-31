import { InformationDetail } from "@/lib/informations"
import useSWRImmutable from "swr/immutable"

type ApiRes<T> = { data: T }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useInformations() {
  const key = "/api/informations"
  const { data, isLoading, error, isValidating } = useSWRImmutable<
    ApiRes<InformationDetail>
  >(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
    keepPreviousData: true,
  })

  const info = data?.data
  const isInitialLoading = isLoading && !info
  const isRefreshing = isValidating && !!info

  return { info, loading: isInitialLoading, isRefreshing, error }
}
