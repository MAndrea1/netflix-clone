import { Movie } from "@/typings"

export async function fetchComponent(page: number, url:string) {
  const perPage = 20;
  const apiUrl = `${url}&page=${page}`

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results as Movie[]
  } catch (error) {
    console.error(error);
    return null
  }
}