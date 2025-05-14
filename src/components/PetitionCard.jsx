// PetitionCard.jsx
import React from "react";

export const PetitionCard = ({ title, summary, probability }) => {
  return (
    <div className="relative w-[313px] h-[157px] rounded-xl border border-gray-300 bg-white shadow-md p-4">
      {/* 부서명 */}
      <div className="text-center font-bold text-[15.7px]">{title}</div>

      {/* 요약 설명 */}
      <div className="mt-2 text-center text-sm leading-snug">
        {summary}
      </div>

      {/* 퍼센트 바 */}
      <div className="absolute bottom-[22px] left-6 w-[273px] h-6 bg-gray-300 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-lime-400"
          style={{ width: `${probability}%` }}
        ></div>
      </div>

      {/* 퍼센트 텍스트 */}
      <div className="absolute bottom-[22px] left-1/2 transform -translate-x-1/2 text-center font-medium text-black text-sm">
        {probability}%
      </div>
    </div>
  );
};
