'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Movie } from '@/typings'
import { getRandomElement } from '../utils/utilFuncions'
import { baseUrlImage } from '../utils/fetchRequests'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

// Added to avoid the "fetchPopular is not assignable to type 'intrinsicattributes'" error.
type movieList = {
  fetchPopular: Movie[]
}

const banner = ({fetchPopular}: movieList) => {
  const [featuredMovie, setfeaturedMovie] = useState<Movie|null>(null)

  useEffect(() => {
    setfeaturedMovie(getRandomElement(fetchPopular))
  }, [fetchPopular])

  console.log(featuredMovie)

  return (
    <div className='flex flex-col align-bottom h-60 md:h-[55vh] lg:h-[95vh]'>
      <div className='absolute top-0 left-0 w-full h-60 md:h-[55vh] lg:h-[95vh] -z-10'>
        <Image 
          src={`${baseUrlImage + featuredMovie?.backdrop_path||featuredMovie?.poster_path}`} 
          layout="fill" 
          objectFit='cover'
          alt={`${featuredMovie?.title}`}
        ></Image>
      </div>
      <div className='mt-auto px-8 mb-20 md:mb-28 lg:mb-52 lg:px-20'>
        <h1 className='drop-shadow-lg font-bold text-xl md:text-4xl md:mb-3 lg:text-6xl'>{featuredMovie?.title}</h1>
        <p className='hidden md:drop-shadow-sm md:flex md:max-w-lg md:text-lg lg:drop-shadow-lg lg:max-w-2xl lg:text-xl'>{featuredMovie?.overview}</p>
        <div className='flex space-x-4 mt-2 md:mt-5 lg:mt-10'>
          <button className='playButton'><span className='text-lg pr-1 md:text-3xl lg:text-4xl md:pr-2'>▶</span>Play</button>
          <button className='playButton bg-stone-500 hover:bg-stone-600 text-white'><span className='text-base pr-2 md:text-2xl lg:text-3xl md:pr-4'>ⓘ</span>More Info</button>
        </div>
      </div>
    </div>
  )
}

export default banner