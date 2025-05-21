import React from "react";

// 최대 10글자까지는 줄바꿈 없이 유지, 이후는 띄어쓰기 기준으로 줄바꿈
const splitByLength = (text, max = 10) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (let word of words) {
    const withoutSpaces = (currentLine + word).replace(/\s/g, "");
    if (withoutSpaces.length <= max) {
      currentLine = currentLine ? currentLine + " " + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines.map((line, i) => <div key={i}>{line}</div>);
};

export const PetitionCard = ({ title, summary, probability }) => {
  return (
    <div className="w-full bg-[#E8F7ED] rounded-xl border border-[#a1a1a1] px-4 py-3 shadow-sm">
      {/* 부서명 - 좌측 정렬로 변경 */}
      <div className="text-[13px] font-bold text-black text-left mb-2">
        {title}
      </div>

      {/* 제목 박스 */}
      <div className="bg-white rounded-lg px-3 py-2 mb-3 text-black text-[18px] font-medium text-center leading-snug">
        {splitByLength(summary, 10)}
      </div>

      {/* 퍼센트 바 */}
      <div className="relative w-full h-[16px] bg-[#D9D9D9] mt-2 mb-1">
        <div
          className="absolute top-0 left-0 h-full bg-[#93E1B3]"
          style={{ width: `${probability}%` }}
        />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[12px] font-semibold text-black leading-[16px]">
          {probability}%
        </div>
      </div>
    </div>
  );
};
