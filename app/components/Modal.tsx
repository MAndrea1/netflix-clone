'use client'

import ModalMUI from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, currentMovieState, modalMovieState } from '../recoil/atoms/modalAtom';
import { requests } from '../utils/fetchRequests';
import ReactPlayer from 'react-player';
import { PlusIcon, SpeakerXMarkIcon, HandThumbUpIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { Genre } from '@/typings';
import { getRandomIndex } from '../utils/utilFuncions';

type fetchedVideos = {
  name: string,
  key: string,
  type: string
}

const Modal = () => {
  const [showModal, setShowModal ] = useRecoilState(modalState)
  const [movieState, setMovieState ] = useRecoilState(modalMovieState)
  const currentMovie = useRecoilValue(currentMovieState)
  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)

  const handleClose = () => {
    setMovieState(false)
    setShowModal(false)
  }

  useEffect(() => {
    if(!currentMovie) return

    async function fetchData() {
      const data = await fetch(
        `${requests.fetchVideo}${currentMovie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((res) => res.json()).catch((err) => console.log(err.message))
      
      if (data?.results.length > 0) {
        const trailerKey = data.results.filter((video: fetchedVideos) => video.type === "Trailer")
        const index = getRandomIndex(trailerKey)
        setTrailer(trailerKey[index].key)
      }
    }
    
    async function fetchGenre() {
      const data = await fetch(requests.fetchGenresURL)
      .then((res) => res.json())
      .then((res) => setGenres(res.genres))
      .catch((err) => console.log(err.message))
    }
    
    fetchData();    
    fetchGenre();    
  }, [currentMovie])

  return (
    <ModalMUI
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`${movieState? 'overflow-hidden' : 'overflow-scroll'}`}
    >
      <div className={`absolute w-[100vw] h-[100vh] transform ${movieState? 'bottom-0 right-0': '-translate-x-1/2 md:min-w-[60vw] md:max-w-full lg:w-[60vw] md:h-fit left-1/2 lg:top-1/2 lg:-translate-y-1/2'}`}>
        <button onClick={handleClose} className={`absolute transition duration-[.4s] right-4 top-4 z-50 h-12 w-12 lg:h-10 lg:w-10 rounded-full bg-slate-950 lg:bg-transparent  ${movieState? 'opacity-20 lg:opacity-0 lg:hover:opacity-100' : 'hover:bg-stone-800 hover:bg-opacity-50'}`}>
          <span className='h-6 w-6 select-none'>X</span>
        </button>
        <div className={`flex flex-col bg-stone-950 ${movieState? '' : 'max-h-[70vh]'}`}>
          <div className={`aspect-video ${movieState? 'w-[100vw] h-[100vh]' : 'lg:w-[60vw]'}`}>
            <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            playing={true}
            muted={muted}
            controls={movieState}
            className="relative z-0"
            />
            <div className={`relative -mt-16 px-6 z-50 w-full ${movieState? 'hidden' : ''}`}>
              <div className="flex flex-row justify-between items-center">
                <div className='flex flex-row h-12 space-x-3 items-center'>
                  <button onClick={() => setMovieState(true)} className='flex items-center text-black bg-white rounded-sm font-bold px-10 py-2'>▶ Play</button>
                  <PlusIcon className='h-9 w-9 modalButton'/>
                  <HandThumbUpIcon className='h-9 w-9 modalButton'/>
                </div>
                <div onClick={() => setMuted(!muted)}>
                  {muted 
                  ? <SpeakerXMarkIcon className='h-9 w-9 modalButton'/>
                  : <SpeakerWaveIcon className='h-9 w-9 modalButton'/>
                  }
                </div>
              </div>
            </div>          
          </div>
        </div>
        <div className={`bg-stone-950 text-white p-3 md:p-8 ${movieState? 'hidden' : ''}`}>
          <h2 className='font-bold text-2xl'>{currentMovie?.title}</h2>
          <p className='my-3 md:my-6'>{currentMovie?.overview}</p>
          <span className='text-stone-500'>Genres: </span>
          {
            currentMovie?.genre_ids.map((genreId: number) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre?.name
            }).join(", ")
          }
          <p className='text-sm'><span className='text-stone-500'>Release date: </span> {currentMovie?.release_date}</p>
          <span className='text-green-600'>{currentMovie?.vote_average * 10}% match</span>

        </div>
      </div>
    </ModalMUI>
  )
}

export default Modal