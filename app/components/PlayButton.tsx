'use client'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalState, currentMovieState, modalMovieState } from '../recoil/atoms/modalAtom'
import { Movie } from '@/typings'

type movie = {
  movie: Movie
}

const PlayButton = ({movie}: movie) => {
  const [showModal, setShowModal ] = useRecoilState(modalState)
  const setMovieState = useSetRecoilState(modalMovieState)
  const setCurrentMovie = useSetRecoilState(currentMovieState)

  return (
    <button onClick={() => {setShowModal(true); setCurrentMovie(movie), setMovieState(true)}} className='playButton'><span className='text-lg pr-1 md:text-3xl lg:text-4xl md:pr-2'>▶</span>Play</button>
  )
}

export default PlayButton