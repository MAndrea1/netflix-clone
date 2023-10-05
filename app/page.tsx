// page.tsx

import Banner from "./components/Banner"
import requests from "./utils/fetchRequests"
import dataPopular from './mockData/apiPopular.json'
import dataNowPlaying from './mockData/apiNowPlaying.json'

export default async function Home() {
  let fetchPopular, fetchNowPlaying;

  if (process.env.DEVELOPMENT_MODE === 'true') {
    // Use mock data for development
    fetchPopular = dataPopular;
    fetchNowPlaying = dataNowPlaying;
  } else {
    // Fetch real data for production
    [fetchPopular, fetchNowPlaying] = await Promise.all([
      fetch(requests.fetchPopularURL, requests.fetchGETOptions).then((res) => res.json().catch(err => console.error('error:' + err))),
      fetch(requests.fetchNowPlayingURL, requests.fetchGETOptions).then((res) => res.json().catch(err => console.error('error:' + err))),
    ]);
  }
 
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center bg-red-600">
        <Banner/>
        <section>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
          <p>row</p>
        </section>
      </main>
    </>
  )
}
