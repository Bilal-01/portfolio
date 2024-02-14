import { useInView } from "react-intersection-observer";
import Stepper from "../core/Stepper/Stepper";
import "./experience.css";
import experienceData from "../../data/experience";

const Experience = () => {
  const [refHeading, inViewHeading] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  const [refDivider, inViewDivider] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  return (
    <div className="">
      <div className="text-slate-100 text-center">
        <p
          ref={refHeading}
          className={`md:text-[64px] text-[32px] mt-[48px] ${
            inViewHeading ? "animate-fade-in" : "opacity-0 invisible"
          }`}
        >
          Professional Experience
        </p>
        <div
          ref={refDivider}
          className={`experience-divider mt-[36px] mb-[64px] ${
            inViewDivider ? "animate-fade-in" : "opacity-0 invisible"
          }`}
        ></div>
        <Stepper data={experienceData} />
      </div>
    </div>
  );
};

export default Experience;
