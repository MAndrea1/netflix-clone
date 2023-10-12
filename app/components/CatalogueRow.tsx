'use client'
import { Movie } from '@/typings'
import React, { useEffect, useRef, useState } from 'react'
import Thumbnail from './Thumbnail'

type propsType = {
  title: string,
  movieList: Movie[]
}

const CatalogueRow = ({title, movieList}: propsType) => {
  const reference = useRef<HTMLDivElement>(null)
  const [moved, setMoved] = useState(0)

  const handleClick = (direction: number) => {
    const [scrollLeft, clientWidth] = [reference.current?.scrollLeft || 0, reference.current?.clientWidth || 0]
    
    const scrollTo = direction === 1 ? scrollLeft - clientWidth : scrollLeft + clientWidth
    reference.current?.scrollTo({left: scrollTo, behavior: 'smooth'})

    if (scrollTo <= 0) {
      setMoved(0)
    } else {
      setMoved(1)
    }
  }

  return (
    <div className='mt-4 md:mt-6'>
      <h2 className='font-bold text-xs md:text-sm md:mb-2 lg:text-2xl'>{title}</h2>
      <div className='group relative hover:transition-all'>
        <div className={`hidden absolute select-none z-40 items-center cursor-pointer transition duration-500 hover:bg-stone-950 hover:bg-opacity-50 ${moved === 1 && 'md:flex'} md:h-44 md:pb-2 md:items-center lg:h-36`} onClick={() => handleClick(1)}>
          <span className={`clickable drop-shadow-md text-4xl px-3 lg:text-5xl lg:px-4`}>‹</span>
        </div>
        <div ref={reference} className='flex items-center overflow-x-scroll space-x-1 no-scrollbar md:space-x-2'>
          {movieList?.map(movie => <Thumbnail key={movie.id} movie={movie}/>)}
        </div>
        <div className={`hidden absolute select-none right-0 top-0 z-40 items-center cursor-pointer transition duration-500 hover:bg-stone-950 hover:bg-opacity-50 md:flex md:h-44 md:pb-2 md:items-center lg:h-36`} onClick={() => handleClick(-1)}>
          <span className={`clickable drop-shadow-md text-4xl px-3 lg:text-5xl lg:px-4`}>›</span>
        </div>
      </div>
    </div>
  )
}

export default CatalogueRow