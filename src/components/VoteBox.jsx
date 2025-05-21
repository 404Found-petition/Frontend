import React from "react";

const VoteBox = () => {
  return (
    <div className="border border-black rounded-lg bg-[#e6f7e6] p-4">
      <div className="flex w-full">
        <button className="flex-1 h-[48px] bg-[#15803D] text-white font-bold rounded-l-md hover:opacity-90">
          YES
        </button>
        <button className="flex-1 h-[48px] bg-[#15803D] text-white font-bold rounded-r-md hover:opacity-90 border-l border-white">
          NO
        </button>
      </div>
    </div>
  );
};

export default VoteBox;


// 5.15 2:45 디자인 PostVoteBox랑 통일시키고 제목 입력할 수 있고 입력 시작시 "투표 제목을 입력하세요" 문구 사라짐
//5.21 10:25 투표 제목란 없앰