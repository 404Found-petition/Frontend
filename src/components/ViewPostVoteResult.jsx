import React from "react";

const VoteResult = ({ title, yesPercent, noPercent }) => {
  return (
    <div className="bg-[#3f7d583b] rounded-xl p-6">
      <div className="text-gray-700 text-xl font-semibold mb-4">{title}</div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 text-lg">찬성</span>
        <span className="text-sm">{yesPercent}%</span>
      </div>
      <div className="bg-[#5cab7c] h-8 rounded-md mb-4" style={{ width: `${yesPercent}%` }} />

      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 text-lg">반대</span>
        <span className="text-sm">{noPercent}%</span>
      </div>
      <div className="bg-[#3f7d58] h-8 rounded-md" style={{ width: `${noPercent}%` }} />
    </div>
  );
};

export default VoteResult;