import { useState, useEffect } from "react";
import ProfileImage from "../../../assets/profile-cropped.png";

const Profile = () => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [collapseClass, setCollapseClass] = useState(" w-0");
  const [isMobile, setIsMobile] = useState(false);

  const sentences = isMobile
    ? ["CS Undergrad", "Full Stack Developer", "Web3 Enthusiast"]
    : [
        "I am a CS Undergrad",
        "I am a Full Stack Developer",
        "I am a Web3 Enthusiast",
      ];

  const typeWriterClass =
    "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth < 1024);
  }

  useEffect(() => {
    setTimeout(() => setCollapseClass(" w-full"), 100);
    window.addEventListener("resize", handleWindowSizeChange);
    const incrementSentence = async () => {
      setCollapseClass(" w-0");
      setTimeout(() => {
        setCurrentSentence((oldVal) => {
          let sentenceIndex;
          if (oldVal >= sentences.length - 1) {
            sentenceIndex = 0;
          } else {
            sentenceIndex = oldVal + 1;
          }

          return sentenceIndex;
        });
      }, 1100);
      setTimeout(() => {
        setCollapseClass(" w-full");
      }, 1000);
    };
    const id = setInterval(incrementSentence, 4000);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="relative">
      {!isMobile ? (
        <>
          <img
            src={ProfileImage}
            alt="hero"
            className="object object-cover rounded-full border-4 border-[#8f94fb] bg-[#4e54c8] w-1/3"
          />
          <div className="absolute border-4 border-[#8f94fb] w-5/6 top-1/2 right-0 xl:min-h-48 lg:min-h-36 min-h-24 transform translate-y-[-50%] text-end -z-50 rounded-3xl lg:pr-12 lg:py-4 pr-8">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl text-slate-100">Mohammad Bilal Aziz</h2>
              <div className="text-xl text-slate-300">
                <div className={`${typeWriterClass}${collapseClass}`}>
                  {sentences[currentSentence]}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={ProfileImage}
            alt="hero"
            className="object object-cover rounded-full border-4 border-[#8f94fb] bg-[#4e54c8] w-2/3 mx-auto mt-24 mb-8"
          />
          <div className="border-4 border-[#8f94fb] w-full min-h-24 text-start rounded-3xl px-12 py-8">
            <div className="flex flex-col justify-center h-full ">
              <h2 className="text-3xl text-slate-100">Mohammad Bilal Aziz</h2>
              <div className="text-xl text-slate-300">
                <div className={`${typeWriterClass}${collapseClass}`}>
                  {sentences[currentSentence]}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
