// Old thumbnail - unable to check caches to verify if the current image was cached
// Opted for disabling fallback image instead

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
    console.log("this image failed")
    setImageLoaded(false);
  };

  const imageUrl: string = `${thumnUrlImage + movie?.backdrop_path || movie?.poster_path}`;
  // const cacheName: string = "http://localhost:3000/_next/image?url=" + encodeURIComponent(imageUrl) + "&w=256&q=75"

  useEffect(() => {
    // Check if the image is in the cache
    // caches.open('next-image').then((cache) => {
    //   const request = new Request(imageUrl);
    //   cache.match(request).then((response) => {
    //     if (response) {
    //       // The image is in the cache
    //       setIsCached(true);
    //     }
    //   });
    // });

    // caches.keys().then(function(cacheNames) {
    //   cacheNames.forEach(function(cacheName) {
    //     console.log('Cache name:', cacheName);
    //   });
    // }).catch(function(error) {
    //   console.error('Error getting cache keys:', error);
    // }); 

    // caches.open('next-image').then(function(cache) {
    //   return cache.keys().then(function(requests) {
    //     requests.forEach(function(request) {
    //       // console.log("----")
    //       // console.log('Resource URL:', request.url);
    //       // console.log('Resource URL:', cacheName);
    //       // console.log("----")

    //       cache.match(request).then((response) => {

    //         console.log("request1:", request)

    //         if (response) {
    //           // The image is in the cache
    //           setIsCached(true);
    //           console.log('Image is cached:', request.url);
    //         } else {
    //           console.log('Image is NOT cached:', request.url);
    //         }
    //       }).catch((error) => {
    //         console.error('Error checking cache:', error);
    //       });          

    //     });
    //   });
    // }).catch(function(error) {
    //   console.error('Error getting resource names:', error);
    // });

    // caches.open('next-image').then((cache) => {
    //   const request = new Request(cacheName, { mode: 'no-cors', referrer: '', credentials: 'omit' });
    //   cache.match(request).then((response) => {

    //     console.log("request2:", request)

    //     if (response) {
    //       // The image is in the cache
    //       setIsCached(true);
    //       console.log('Image is cached:', request.url);
    //     } else {
    //       console.log('Image is NOT cached:', request.url);
    //     }
    //   }).catch((error) => {
    //     console.error('Error checking cache:', error);
    //   });
    // });    

  }, [imageUrl]);

  return (
    <>
      {imageLoaded ? (
        // If the image is in the cache, display it
        <div className='relative rounded cursor-pointer h-24 min-w-[50%] transition md:min-w-[25%] md:h-40 md:hover:scale-105 md:my-1 md:hover:my-1 md:hover:z-30 lg:h-32 lg:min-w-[17%]'>
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
        <div className='bg-black text-white flex items-center p-3 text-center justify-center relative rounded cursor-pointer h-24 min-w-[50%] transition md:min-w-[25%] md:h-40 md:hover:scale-105 md:my-1 md:hover:my-1 md:hover:z-30 lg:h-32 lg:min-w-[17%]'>
        {movie?.title || "Image not available"}
      </div>
      )}
    </>
  );
}

export default Thumbnail
