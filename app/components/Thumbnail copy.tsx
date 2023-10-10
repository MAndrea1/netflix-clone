import { useEffect, useState } from 'react';
import { thumnUrlImage } from '../utils/fetchRequests'
import Image from 'next/image'
import { Movie } from '@/typings'

type movie = {
  movie: Movie
}

const Thumbnail = ({movie}: movie) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isCached, setIsCached] = useState(false);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const imageUrl: string = `${thumnUrlImage + movie?.backdrop_path || movie?.poster_path}`;

  console.log("http://localhost:3000/_next/image?url=https://image.tmdb.org/t/p/w500/mRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg&w=256&q=75")
  console.log(imageUrl)

  useEffect(() => {
    // Check if the image is in the cache
    caches.open('next-image').then((cache) => {
      cache.match(imageUrl).then((response) => {
        if (response) {
          // The image is in the cache
          setIsCached(true);
        }
      });
    });
  }, [imageUrl]);

  return (
    <>
      {isCached || imageLoaded ? (
        // If the image is in the cache, display it
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
        <div style={{ backgroundColor: 'black' }}>
          {/* Your fallback content */}
          <p>{movie?.title}</p>
        </div>
      )}
    </>
  );
}

export default Thumbnail
