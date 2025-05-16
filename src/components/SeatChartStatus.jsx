import React, { useEffect, useState } from "react";

const SeatChartStatus = ({ percentage }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    let current = 0;

    const step = () => {
      if (current < percentage) {
        current += 1;
        setAnimatedPercent(current);
        setTimeout(step, 10);
      } else {
        setAnimatedPercent(percentage);
      }
    };

    step();
  }, [percentage]);

  const angle = (animatedPercent / 100) * 180; // 0~180도

  return (
    <div className="absolute top-[0px] left-0 w-[416px] h-[209px] flex items-center justify-center">
      <svg width="416" height="209" viewBox="0 0 416 209">
        {/* 회색 배경 반원 */}
        <path
          d="M 0 208 A 208 208 0 0 1 416 208"
          fill="none"
          stroke="#8f8f8f"
          strokeWidth="36"
        />

        {/* 시계바늘 */}
        <line
          x1="208"
          y1="208"
          x2="208"
          y2="0"
          stroke="#5CAB7C"
          strokeWidth="20"
          strokeLinecap="round"
          transform={`rotate(${angle} 208 208)`}
          style={{ transition: "transform 0.1s linear" }}
        />
      </svg>

      {/* 퍼센트 숫자 */}
      <div className="absolute top-[40%] left-[28%] w-[244px] text-[72.4px] font-bold text-black text-center">
        {animatedPercent}%
      </div>
    </div>
  );
};

export default SeatChartStatus;
