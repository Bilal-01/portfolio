const NavList = () => {
  const links = ["Experience", "Projects", "Skills", "Achievements", "Blogs"];

  return (
    <ul
      className={
        "list-none flex lg:flex-row flex-col text-center flex-grow lg:space-x-16 space-x-0 my-2 text-lg lg:text-md"
      }
    >
      {links.map((link, ind) => (
        <li
          key={ind}
          className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2  px-8 py-2 hover:bg-white hover:bg-opacity-20"
        >
          {link}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
