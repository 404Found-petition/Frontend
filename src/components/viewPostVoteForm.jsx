import React from "react";

const VoteForm = ({ title, onVote }) => {
  return (
    <div className="bg-[#e3f8eb] rounded-xl p-6">
      <div className="text-gray-700 text-xl font-semibold mb-2">{title}</div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#5cab7c] text-white text-lg font-bold px-6 py-3 rounded-lg border border-black shadow"
          onClick={() => onVote("yes")}
        >
          YES
        </button>
        <button
          className="bg-[#5cab7c] text-white text-lg font-bold px-6 py-3 rounded-lg border border-black shadow"
          onClick={() => onVote("no")}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default VoteForm;
