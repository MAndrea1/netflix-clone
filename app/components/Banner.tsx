import Image from 'next/image'
import { Movie } from '@/typings'
import { getRandomElement, shortenString } from '../utils/utilFuncions'
import { baseUrlImage } from '../utils/fetchRequests'
import InfoButton from './InfoButton'
import PlayButton from './PlayButton'

// Added to avoid the "fetchPopular is not assignable to type 'intrinsicattributes'" error.
type movieList = {
  fetchPopular: Movie[]
}

const banner = ({fetchPopular}: movieList) => {
  const featuredMovie = getRandomElement(fetchPopular)

  return (
    <div className='flex flex-col align-bottom h-60 md:h-[24rem] lg:h-[95vh]'>
      <div className='absolute top-0 left-0 w-full h-60 md:h-[34rem] lg:h-[95vh] -z-10'>
        <Image 
          src={`${baseUrlImage + '/' + featuredMovie?.backdrop_path||featuredMovie?.poster_path}`} 
          fill
          style={{
            objectFit: 'cover',
          }}
          alt={`${featuredMovie?.title}`}
          priority={true}
        ></Image>
        <div className='absolute bg-gradient-to-t from-stone-950 from-20% md:from-30% bottom-0 w-full h-28 md:h-[30rem] lg:h-[55vh] z-0'></div>
      </div>
      <div className='mt-auto px-8 mb-16 md:mb-5 lg:mb-52 lg:px-20'>
        <h1 className='drop-shadow-lg font-bold text-xl md:text-4xl md:mb-3 lg:text-6xl'>{featuredMovie?.title}</h1>
        <p className='hidden md:drop-shadow-lg md:flex md:max-w-lg md:text-lg lg:drop-shadow-lg lg:max-w-2xl lg:text-xl'>{shortenString(featuredMovie?.overview, 200)}</p>
        <div className='flex space-x-4 mt-2 md:mt-5 lg:mt-10'>
          <PlayButton movie={featuredMovie}/>
          <InfoButton movie={featuredMovie}/>
        </div>
      </div>
    </div>
  )
}

export default banner