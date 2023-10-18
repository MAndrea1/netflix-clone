'use client'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalState, currentMovieState } from '../recoil/atoms/modalAtom'
import { Movie } from '@/typings'

type movie = {
  movie: Movie
}

const InfoButton = ({movie}: movie) => {
  const [showModal, setShowModal ] = useRecoilState(modalState)
  const setCurrentMovie = useSetRecoilState(currentMovieState)

  return (
    <button onClick={() => {setShowModal(true); setCurrentMovie(movie)}} className='playButton bg-stone-500 hover:bg-stone-600 text-white'><span className='text-base pr-2 md:text-2xl lg:text-3xl md:pr-4'>ⓘ</span>More Info</button>
  )
}

export default InfoButton