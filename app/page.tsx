// page.tsx

import Banner from "./components/Banner"
import {requests, fetchData} from "./utils/fetchRequests"
import dataPopular from './mockData/apiPopular.json'
import dataUpcoming from './mockData/apiUpcoming.json'
import dataRomance from './mockData/apiRomance.json'
import { Movie } from "@/typings";

export default async function Home() {
  let fetchPopular: Movie[];
  let fetchUpcomingURL: Movie[];
  let fetchromanceURL: Movie[];
  
  if (process.env.DEVELOPMENT_MODE === 'true') {
    // Use mock data for development
    fetchPopular = dataPopular.results;
    fetchUpcomingURL = dataUpcoming.results;
    fetchromanceURL = dataRomance.results;
  } else {
    // Fetch real data for production
    [fetchPopular, fetchUpcomingURL, fetchromanceURL] = await Promise.all([
      fetchData(requests.fetchPopularURL, requests.fetchGETOptions),
      fetchData(requests.fetchUpcomingURL, requests.fetchGETOptions),
      fetchData(requests.fetchRomanceURL, requests.fetchGETOptions),
    ]);
  }

  console.log(fetchPopular[0].title)
  console.log(fetchUpcomingURL[0].title)
  console.log(fetchromanceURL[0].title)
 
  return (
    <>
      <main className="relative flex min-h-screen flex-col">
        <Banner fetchPopular={fetchPopular}/>
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
