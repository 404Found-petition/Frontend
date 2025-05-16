import React from "react";

export const PetitionListCard = ({ title, summary, probability }) => {
  return (
    <div className="w-[240px] h-[140px] relative bg-[#E6F4EC] rounded-[15px] border border-[#c5ded1]">
      <div className="absolute top-[18px] left-[20px] text-[11px] font-bold leading-[14px] tracking-[-0.22px] text-[#1A1A1A]">
        예측 이행 확률
      </div>
      <div className="absolute top-[38px] left-[20px] w-[200px] text-[13px] font-bold leading-[16px] tracking-[-0.26px] text-[#1A1A1A] break-keep">
        {title || "부서 없음"}
      </div>
      <div className="absolute top-[92px] left-[20px] w-[200px] text-[11px] leading-[14px] tracking-[-0.22px] text-[#333] break-words">
        {summary || "요약 정보가 없습니다."}
      </div>
      <div className="absolute bottom-[14px] right-[20px] text-[16px] font-bold leading-[20px] tracking-[-0.32px] text-[#2D8F5C]">
        {typeof probability === "number" ? `${probability}%` : "0%"}
      </div>
    </div>
  );
};
