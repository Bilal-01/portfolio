const NavList = () => {
  const links = [
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Achievements",
    "Blogs",
  ];

  return (
    <ul className="text-slate-300 flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-[#8f94fb] rounded-lg bg-dark md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
      {links.map((link, ind) => (
        <li key={ind} className="w-[96px] h-[48px] text-center py-2 group">
          <a
            href="#"
            className="block text-slate-300 rounded md:p-0
              hover:bg-gray-100 md:hover:bg-transparent hover:text-slate-100  
              md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
