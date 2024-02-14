import { FC } from "react";
import { useInView } from "react-intersection-observer";
import "./stepper.css";
import Card from "../../Cards/Card";

const StepperStep: FC<any> = ({ data, isLast }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Change this to false if you want the animation to occur every time it comes into view
    threshold: 0.5, // Adjust this value to control when the animation should start
  });
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center py-2 my-[128px] ${
        inView ? "animate-fade-in" : "opacity-0 invisible"
      }`}
    >
      <div className="head rounded-full w-[64px] h-[64px] blue-shadow z-10 relative">
        <img
          src={`public/${data.imgPath}`}
          alt="Fainin Logo"
          className="w-full h-full object-cover rounded-full"
        />
        {!isLast && (
          <div className="vertical-stepper-divider blue-shadow"></div>
        )}
      </div>
      <div className="connector blue-shadow lg:w-[172px] w-[128px] h-[0px]"></div>
      <div className="">
        <Card>
          <h1 className="text-3xl pt-2">{data.title}</h1>
          <div className="text-sm flex justify-between items-center py-2">
            <p className="text-slate-400">{data.duration}</p>
            <p className="text-slate-400">
              {data.mode}, {data.location}
            </p>
          </div>
          <p>{data.description}</p>
          <div className="py-4 scroll-x">
            {data.skills.length > 0 &&
              data.skills.map((item: any, index: number) => (
                <span
                  key={index}
                  className="text-sm px-2 py-[1px] bg-[#5E57FF] m-2 rounded-md"
                >
                  {item}
                </span>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StepperStep;
