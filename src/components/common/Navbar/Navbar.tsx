import NavList from "./NavList";

const Navbar = () => {
  return (
    <div className="container flex flex-col justify-center items-center relative lg:fixed left-1/2 transform translate-x-[-50%]">
        <a href="#" className="text-xl text-slate-100 my-8">
            Portfolio
        </a>
        <NavList  />
    </div>
  )
};

export default Navbar;
