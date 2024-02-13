import "./profile.css";

const Profile = () => {
  return (
    <div className="relative h-[512px] md:h-[512px] w-full mx-auto pt-[128px]">
      <div className="subtle-light-effect"></div>
      <p className="text-center mt-[56px] text-[1.4rem] md:text-[2.4rem] lg:text[3.6rem] text-slate-100 slideInFromTop">
        Mohammad Bilal Aziz
      </p>
      <p className="text-slate-200 w-full md:w-[60%] mx-auto text-sm mt-2 md:text-lg lg:text-xl text-center slideInFromBottom">
        Motivated developer with a passion for solving complex problems through
        innovative technology solutions
      </p>

      <div className="text-center mt-[128px]">
        <div className="button-wrapper">
          <button className="text-slate-300 text-xl mx-auto border rounded-[24px] px-4 md:px-8 py-2 hover:cursor-pointer hover:bg-[neon-green] box">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
