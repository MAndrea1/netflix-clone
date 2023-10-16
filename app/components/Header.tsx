'use client'
// Header.tsx

import { useEffect, useState } from "react"
import Image from "next/image"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import InstallApp from "./InstallApp"
import useAuth from "../hooks/useAuth"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()


  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY more than 0 would mean that the user had scrolled
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    // window will listen to the event "scroll", and will call our handleScroll function
    window.addEventListener("scroll", handleScroll)

    return() => {
      // If we unmount this component, the listeners won't be automatically removed. We should remove them explicitly to avoid unexpected behavior.
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'md:bg-slate-950'}
      fixed flex justify-between items-center w-full top-0 z-50 px-4 py-1 md:py-3 lg:px-16 lg:py-4 transition-all bg-gradient-to-b from-slate-950`}>

      {/* 
        Tailwind is mobile first, so all styling will start for small screens, and then we apply breakpoints for bigger screens
        Here, we are adding a horizontal space between the children of 2, which will change to 10 in bigger screens
      */}
      <div className="flex items-center space-x-2 md:space-x-10">  
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix logo" 
          width={90} 
          height={90}
          className="cursor-pointer object-contain w-14 lg:w-24"  // contain : resize image to fill the box whilst preserving its aspect-ratio.
        />
      {/* 
        Again, here we are hiding the menu and only showing it in bigger screens
      */}
        <ul className="md:flex space-x-6 items-center">
          {/* To style multiple elements, we'll create a custom class "headerLink". We'll complete this style in globals.css */}
          <li className="headerLink"><Link href={"/"}>Home</Link></li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New</li>
          <li className="headerLink">My List</li>
          <InstallApp/>
        </ul>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-6">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
        <BellIcon className="h-6 w-6" />
        {/* <Link href={"/"}> */}
          <Image 
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDL_yALlcQAXnZ7Q9Z7KijBP8EsWuymdQl7xv3-W0FwEt2nHlZnQFACQ4ecEfYqTGjd9Y&usqp=CAU"} 
            alt={"User icon"}
            width={40}
            height={40}
            className="cursor-pointer rounded w-8 lg:w-10"
            onClick={() => {logout()}}
          >
          </Image>
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header