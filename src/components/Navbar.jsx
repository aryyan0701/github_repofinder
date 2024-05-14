import React from 'react'
import { Link } from 'react-router-dom';
import { TbReportSearch } from "react-icons/tb";
import { TbWorldSearch } from "react-icons/tb";

function Navbar() {
  return (
    <header className="bg-black py-1">
    <div className="container mx-auto pt-2 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
      <Link to="/" className="flex items-center space-x-1 mb-4 sm:mb-4 select-none">
      <TbWorldSearch className='hidden sm:inline text-white text-3xl' />
        <span className="hidden sm:inline text-white font-bold text-3xl select-none">RepoFinder</span>
      </Link>
      <nav className="flex items-center font-Hublot">
        <ul className="flex space-x-2 sm:space-x-4 text-gray-300 font-bold select-none">
          <li>
            <Link to="/" className="px-2 sm:px-4 py-2 block font-bold text-xl text-white transition duration-150 ease-in-out hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Search" className="px-2 sm:px-4 py-2 block font-bold text-xl text-white transition duration-150 ease-in-out hover:text-gray-300">
              Search
            </Link>
          </li>
          <li>
            <Link to="/About" className="px-2 sm:px-4 py-2 block font-bold text-xl text-white transition duration-150 ease-in-out hover:text-gray-300">
              About
            </Link>
          </li>
          </ul>
      </nav>
    </div>
  </header>
  )
}

export default Navbar