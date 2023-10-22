import { Movie } from '@/typings';
import React from 'react'
import Thumbnail from './Thumbnail';

type MoviesProp = {
  // movies: Movie[];
  movies: Movie[] | null;
}

const MovieGrid = ( { movies }: MoviesProp) => {
  return (
    <>
      <div className='mt-4 md:mt-6'>
        <div className='group relative hover:transition-all'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {movies?.map(movie => <Thumbnail key={movie.id} movie={movie}/>)}
          </div>
        </div>
      </div>      
    </>
  )
}

export default MovieGrid