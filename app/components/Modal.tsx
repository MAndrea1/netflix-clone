'use client'

import ModalMUI from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, currentMovieState } from '../recoil/atoms/modalAtom';
import { requests } from '../utils/fetchRequests';
import ReactPlayer from 'react-player';
import { PlusIcon, SpeakerXMarkIcon, HandThumbUpIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

type fetchedVideos = {
  name: string,
  key: string,
  type: string
}

const Modal = () => {
  const [showModal, setShowModal ] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie ] = useRecoilState(currentMovieState)
  const [trailer, setTrailer] = useState("")
  const [muted, setMuted] = useState(true)

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if(!currentMovie) return

    async function fetchData() {
      const data = await fetch(
        `${requests.fetchVideo}${currentMovie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((res) => res.json()).catch((err) => console.log(err.message))
      
      if (data?.results.length > 0) {
        const trailerKey = data.results.filter((video: fetchedVideos) => video.type === "Trailer")
        setTrailer(trailerKey[0].key)
      }
    }

    fetchData();    
  }, [currentMovie])

  console.log("data", "https://www.youtube.com/watch?v="+trailer)

  return (
    <ModalMUI
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='left-0 right-0 z-50 mx-auto w-[100%] overflow-hidden scrollbar-hide'
    >
      <>
        <button onClick={handleClose} className='absolute right-5 top-5 z-50 h-9 w-9 rounded-full'>
          <span className='h-6 w-6 select-none'>X</span>
        </button>
        <div className='relative h-full w-full lg:h-[50vh] lg:w-[70vw] mx-auto lg:top-20'>
          <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute'}}
            playing
            muted={true}
          />
          <div className='absolute bottom-5 px-6 z-40 w-full'>
            <div className="flex flex-row justify-between">
              <div className='flex flex-row h-12 space-x-3 items-center'>
                <button className='flex items-center text-black bg-white rounded-sm font-bold px-10 py-2'>▶ Play</button>
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
      </>
    </ModalMUI>
  )
}

export default Modal