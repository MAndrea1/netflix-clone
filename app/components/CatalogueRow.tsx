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
      <div className='group relative'>
        <span className={`hidden drop-shadow-md absolute cursor-pointer text-4xl pl-3 z-50 md:pt-10 lg:text-5xl lg:pl-4 lg:pt-12 ${moved === 1 && 'md:flex'}`} onClick={() => handleClick(1)}>‹</span>
        <div ref={reference} className='flex items-center overflow-x-scroll space-x-1 no-scrollbar md:space-x-2'>
          {movieList?.map(movie => <Thumbnail key={movie.id} movie={movie}/>)}
        </div>
        <span className='hidden drop-shadow-md absolute right-0 top-0 cursor-pointer text-4xl pr-1 z-50 md:flex md:pt-10 lg:text-5xl lg:pt-12'onClick={() => handleClick(-1)}>›</span>
      </div>
    </div>
  )
}

export default CatalogueRow