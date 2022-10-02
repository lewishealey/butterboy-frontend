import React from "react";
import useMightyMouse from "react-hook-mighty-mouse";

const ButterHead = ({ settings }) => {
  const {
    selectedElement: {
      position: { angle: angleLeftEye },
    },
  } = useMightyMouse(true, "left-eye", { x: 20, y: 20 });
  const {
    selectedElement: {
      position: { angle: angleRightEye },
    },
  } = useMightyMouse(true, "right-eye", { x: 20, y: 20 });

  const rotateLeftEye = `rotate(${-angleLeftEye}deg)`;
  const rotateRightEye = `rotate(${-angleRightEye}deg)`;

  return (
    <div className="relative hidden md:block">
      <div
        id="left-eye"
        className="absolute z-20"
        style={{
          bottom: "5%",
          left: "41%",
          width: "8%",
          height: "17%",
          transform: rotateLeftEye,
        }}
      >
        <div className="h-4 md:h-8 w-4 md:w-8 bg-cream rounded-full absolute right-0" />
      </div>
      <div
        id="right-eye"
        className="absolute z-20"
        style={{
          bottom: "4%",
          right: "35%",
          width: "5%",
          height: "16%",
          transform: rotateRightEye,
        }}
      >
        <div className="h-4 md:h-8 w-4 md:w-8 bg-cream rounded-full absolute right-0" />
      </div>
      <img src="/head.svg" className="w-full m-auto md:w-2/5" />
    </div>
  );
};

export default ButterHead;
