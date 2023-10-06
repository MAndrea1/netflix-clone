// page.tsx

import Banner from "./components/Banner"
import {requests, fetchData} from "./utils/fetchRequests"
import dataPopular from './mockData/apiPopular.json'
import dataUpcoming from './mockData/apiUpcoming.json'
import dataRomance from './mockData/apiRomance.json'
import dataSF from './mockData/apiSF.json'
import dataThriller from './mockData/apiThriller.json'
import dataAction from './mockData/apiAction.json'
import dataAnimation from './mockData/apiAnimation.json'
import { Movie } from "@/typings";
import CatalogueRow from "./components/CatalogueRow"

export default async function Home() {
  let fetchPopular: Movie[];
  let fetchUpcomingURL: Movie[];
  let fetchRomanceURL: Movie[];
  let fetchScienceFictionURL: Movie[];
  let fetchThrillerURL: Movie[];
  let fetchActionURL: Movie[];
  let fetchAnimationURL: Movie[];
  
  if (process.env.DEVELOPMENT_MODE === 'true') {
    // Use mock data for development
    fetchPopular = dataPopular.results;
    fetchUpcomingURL = dataUpcoming.results;
    fetchRomanceURL = dataRomance.results;
    fetchScienceFictionURL = dataSF.results;
    fetchThrillerURL = dataThriller.results;
    fetchActionURL = dataAction.results;
    fetchAnimationURL = dataAnimation.results;
  } else {
    // Fetch real data for production
    [fetchPopular, 
      fetchUpcomingURL, 
      fetchRomanceURL, 
      fetchScienceFictionURL, 
      fetchThrillerURL, 
      fetchActionURL, 
      fetchAnimationURL] = await Promise.all([
      fetchData(requests.fetchPopularURL, requests.fetchGETOptions),
      fetchData(requests.fetchUpcomingURL, requests.fetchGETOptions),
      fetchData(requests.fetchRomanceURL, requests.fetchGETOptions),
      fetchData(requests.fetchScienceFictionURL, requests.fetchGETOptions),
      fetchData(requests.fetchThrillerURL, requests.fetchGETOptions),
      fetchData(requests.fetchActionURL, requests.fetchGETOptions),
      fetchData(requests.fetchAnimationURL, requests.fetchGETOptions),
    ]);
  }
 
  return (
    <>
      <main className="relative flex min-h-screen flex-col">
        <Banner fetchPopular={fetchPopular}/>
        <section className="px-4 -mt-12 md:-mt-24 lg:-mt-44 lg:px-20">
          <CatalogueRow title="Upcoming" movieList={fetchUpcomingURL}/>
          <CatalogueRow title="Romance" movieList={fetchRomanceURL}/>
          <CatalogueRow title="Science Fiction" movieList={fetchScienceFictionURL}/>
          <CatalogueRow title="Thriller" movieList={fetchThrillerURL}/>
          <CatalogueRow title="Action" movieList={fetchActionURL}/>
          <CatalogueRow title="Animation" movieList={fetchAnimationURL}/>
        </section>
      </main>
    </>
  )
}
