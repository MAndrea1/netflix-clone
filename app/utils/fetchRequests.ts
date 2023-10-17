const BEARER_TOKEN = process.env.BEARER_TOKEN
const BASE_URL = 'https://api.themoviedb.org/3'
const baseUrlImage = 'https://image.tmdb.org/t/p/original'
const thumnUrlImage = 'https://image.tmdb.org/t/p/w500'

type FetchOptions = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}

'/discover/movie?language=en-US&page=1&with_genres=10749'
'/discover/movie?language=en-US&page=1&with_genres=10749'

const requests = {
  fetchPopularURL: `${BASE_URL}/movie/popular?language=en-US&sort_by=popularity.desc&page=1`,
  fetchNowPlayingURL: `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
  fetchUpcomingURL: `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
  fetchRomanceURL: `${BASE_URL}/discover/movie?language=en-US&page=1&with_genres=10749`,
  fetchScienceFictionURL: `${BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&page=1&with_genres=878`,
  fetchThrillerURL: `${BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&page=1&with_genres=53`,
  fetchActionURL: `${BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&page=1&with_genres=28`,
  fetchAnimationURL: `${BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&page=1&with_genres=16`,
  fetchVideo: `${BASE_URL}/movie/`,
  fetchGETOptions: {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
        credentials: "omit"
      }
  }
}

async function fetchData(url: string, options: FetchOptions) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Provide a default value or handle the error as needed
  }
}

export { requests, fetchData, baseUrlImage, thumnUrlImage };