import NavList from "./NavList";
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-dark dark:bg-gray-900 fixed w-full z-20 top-0 start-0 text-slate-300 h-[96px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Portfolio
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-300 rounded-lg md:hidden hover:bg-slate-600 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {setIsOpen(!isOpen)}}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <NavList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
