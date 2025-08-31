"use client"

import { Grid, Text } from "@once-ui-system/core"
import { useBlogs } from "@/hooks/blogs/useBlogs"
import { useMemo } from "react"
import { Blog, UniversalSkeleton, LoadingBoundary } from "@/components"

interface BlogpageProps {
  range?: [number] | [number, number]
  columns?: "1" | "2" | "3"
  thumbnail?: boolean
  direction?: "row" | "column"
  hidden?: boolean
}

export const Blogpage = ({
  range,
  columns = "1",
  thumbnail = false,
  direction,
  hidden = false,
}: BlogpageProps) => {
  const { blogs, loading, isRefreshing } = useBlogs()

  const blogList = useMemo(() => {
    const list = blogs || []
    return list
  }, [blogs])

  const displayedBlogs = range
    ? blogList.slice(range[0] - 1, range[1] ?? blogList.length)
    : blogList

  if (loading || isRefreshing) {
    return (
      <LoadingBoundary
        loading={!loading}
        fallback={
          <UniversalSkeleton
            variant={direction === "column" ? "blog-column" : "blog-row"}
            count={displayedBlogs.length}
          />
        }
      />
    )
  }

  if (displayedBlogs.length === 0) {
    if (hidden) return null
    return (
      <Text
        align="center"
        variant="heading-strong-l"
        onBackground="neutral-weak"
      >
        No results available
      </Text>
    )
  }

  return (
    <Grid
      columns={columns}
      mobileColumns="1"
      fillWidth
      marginBottom="40"
      gap="12"
    >
      {displayedBlogs.map((blog) => (
        <Blog
          key={blog.slug}
          slug={blog.slug}
          title={blog.metadata.title}
          images={blog.metadata.images}
          created_at={blog.metadata.created_at}
          updated_at={blog.metadata.updated_at}
          tags={blog.metadata.tags}
          thumbnail={thumbnail}
          direction={direction}
        />
      ))}
    </Grid>
  )
}
