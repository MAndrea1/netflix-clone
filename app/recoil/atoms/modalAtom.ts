import { Movie } from "@/typings";
import { atom } from "recoil";
import { DocumentData } from "firebase/firestore";

// track if modal is open
export const modalState = atom({
  key: 'modalState',
  default: false,
})

// track if modal movie is playing
export const modalMovieState = atom({
  key: 'modalMovieState',
  default: false,
})

// Track selected movie
export const currentMovieState = atom<Movie | DocumentData | null>({
  key: 'currentMovie',
  default: null
})