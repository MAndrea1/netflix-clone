'use client'

import { Movie } from '@/typings'
import { thumnUrlImage } from '../utils/fetchRequests'
import Image from 'next/image'
import React, { useState } from 'react'

type movie = {
  movie: Movie
}

const Thumbnail = ({movie}: movie) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageData, setImageData] = useState(null); // To store the image data

  // This function will be called when the image is successfully loaded
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // This function will be called if the image fails to load
  const handleImageError = () => {
    setImageLoaded(false);
  };  

  return (
    <>
      {imageLoaded ? (
        <div className='relative rounded cursor-pointer h-24 min-w-[50%] transition md:min-w-[25%] md:h-40 md:hover:scale-105 md:my-1 md:hover:my-1 md:hover:z-40 lg:h-32 lg:min-w-[17%]'>
          <Image 
          src={`${thumnUrlImage + movie?.backdrop_path || movie?.poster_path}`} 
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 17vw"   
          style={{
            objectFit: 'cover',
          }}
          alt={`${movie?.title}`}
          onError={handleImageError}          
          ></Image>        
        </div>
        ) : (
          <div className='bg-black text-white flex items-center p-3 text-center justify-center relative rounded cursor-pointer h-24 min-w-[50%] transition md:min-w-[25%] md:h-40 md:hover:scale-105 md:my-1 md:hover:my-1 md:hover:z-40 lg:h-32 lg:min-w-[17%]'>
          {movie?.title || "Image not available"}
        </div>
      )}
    </>
  )
}

export default Thumbnail