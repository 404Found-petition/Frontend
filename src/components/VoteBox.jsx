import React from "react";
import line14 from "../assets/line-14.svg";

const VoteBox = () => {
  return (
    <div className="bg-[#e3f8eb] p-6 rounded-md mt-4 text-center">
      <div className="text-[#8d3232] mb-4 font-semibold">
        투표 제목을 입력하세요.
      </div>
      <div className="flex justify-center items-center gap-10 bg-[#5cab7c] border border-black rounded-md p-4 shadow-md text-white font-bold text-xl">
        <div>YES</div>
        <img src={line14} alt="divider" className="h-[54px] w-[3px]" />
        <div>NO</div>
      </div>
    </div>
  );
};

export default VoteBox;
