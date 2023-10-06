export type Genre = {
  id: number,
  name: string
}

export type Movie = {
  adult: bool,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: bool,
  vote_average: number,
  vote_count: number
}