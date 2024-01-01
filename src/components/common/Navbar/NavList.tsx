const NavList = () => {
  return (
    <ul
      className={"list-none flex lg:flex-row flex-col text-center flex-grow lg:space-x-8 space-x-0 my-2 text-xl lg:text-md"}
    >
      <li className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2">Experience</li>
      <li className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2">Projects</li>
      <li className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2">Skills</li>
      <li className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2">Achievements</li>
      <li className="text-slate-300 hover:cursor-pointer hover:text-slate-100 mt-2">Blogs</li>
    </ul>
  );
};

export default NavList;
