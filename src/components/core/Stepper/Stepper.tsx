import { FC } from "react";
import StepperStep from "./StepperStep";

const Stepper: FC<any> = ({ data }) => {
  return (
    <div className="">
      {data.length > 0 &&
        data.map((item: any, index: number) => (
          <div key={index} className="relative">
            <StepperStep data={item} isLast={index == data.length - 1} />
          </div>
        ))}
    </div>
  );
};

export default Stepper;
