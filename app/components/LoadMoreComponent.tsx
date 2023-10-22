"use client"

import { Movie } from "@/typings"
import { useEffect, useState } from "react"
import { useInView }  from "react-intersection-observer"
import { Spinner } from "./Spinner"
import { fetchComponent } from "../utils/fetchComponent"
import MovieGrid from "./MovieGrid"

type stringProp = {
  url: string
}

export function LoadMoreComponent({url}:stringProp ) {
  const [loadedItems, setLoadedItems] = useState<Movie[]>([])
  const [loadedPages, setLoadedPages] = useState(1)

  const { ref, inView } = useInView()

  const loadMoreItems = async() => {
    const nextPage = loadedPages + 1
    const newItems = await fetchComponent(nextPage, url) ?? []
    setLoadedItems((prevItems: Movie[]) => [...prevItems, ...newItems])
    setLoadedPages(nextPage)
  }

  useEffect(() => {
    if (inView) {
      loadMoreItems()
    }
  }, [inView])

  return(
    <>
      <MovieGrid movies={loadedItems} />
      <div className="flex justify-center items-center p-4 col-span-1" ref={ref}>
        <Spinner/>
      </div>
    </>
  )
}

