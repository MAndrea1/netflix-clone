const BEARER_TOKEN = process.env.BEARER_TOKEN
const BASE_URL = "https://api.themoviedb.org/3"

const requests = {
  fetchPopularURL: `${BASE_URL}/movie/popular?language=en-US&page=1`,
  fetchNowPlayingURL: `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
  fetchGETOptions: {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
  }
}

export default requests