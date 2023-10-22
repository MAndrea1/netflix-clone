import { LoadMoreComponent } from "@/app/components/LoadMoreComponent"
import { fetchComponent } from "@/app/utils/fetchComponent"

const MoviesPage = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&language=en-US&sort_by=popularity.desc`
  const movies = await fetchComponent(1, url)

  return (
    <>
      <main className="relative flex min-h-screen flex-col px-3 mt-14 md:mt-12 md:px-8 lg:mt-22">
      <h1 className='drop-shadow-lg font-bold text-xl md:text-3xl md:py-4 lg:py-8 lg:text-5xl'>Movies</h1>
        <section className="text-white">
        <LoadMoreComponent url={url}/>
        </section>
      </main>
    </>
  )
}

export default MoviesPage