// PostVoteBox.jsx
// 게시글 투표 기능을 재사용 가능한 컴포넌트로 분리

import React from "react";
import { motion } from "framer-motion";

const PostVoteBox = ({
  voted = false,
  voteResult = { yes: 0, no: 0 },
  voteTitle = "",
  onVote = () => { },
  heightClass = "h-[64px]",
  selectedOption = null,
}) => {
  const isLoggedIn = !!localStorage.getItem("access");
  const total = voteResult.yes + voteResult.no;
  const yesPercent = total ? Math.round((voteResult.yes / total) * 100) : 50;
  const noPercent = 100 - yesPercent;


  return (
    <div className="mt-4">
      {!voted ? (
        <div
          className={`flex w-full ${heightClass} overflow-hidden font-bold text-white border border-green-700 rounded`}
        >
          <button
            className="flex items-center justify-center w-1/2 text-lg bg-green-700 hover:bg-green-800"
            onClick={() => isLoggedIn && onVote("yes")}
          >
            YES
          </button>
          <div className="w-[1px] bg-white" />
          <button
            className="flex items-center justify-center w-1/2 text-lg bg-green-700 hover:bg-green-800"
            onClick={() => isLoggedIn && onVote("no")}
          >
            NO
          </button>
        </div>
      ) : (
        <div className="relative w-full h-[64px] border border-green-700 rounded overflow-hidden">
          {/* 가운데 막대 */}
          <motion.div
            animate={{ left: `${yesPercent}%` }}
            transition={{ duration: 1.2 }}s
            className="absolute top-0 bottom-0 w-[2px] bg-black z-10"
          />

          {/* YES 영역 */}
          <motion.div
            animate={{ width: `${yesPercent}%` }}
            transition={{ duration: 1.2 }}
            className={`absolute top-0 left-0 h-full flex flex-col items-center justify-center ${selectedOption === "yes"
                ? "bg-white text-green-700"
                : "bg-green-600 text-white"
              }`}
          >
            <span>YES</span>
            <span className="text-lg font-bold">{Math.round(yesPercent)}%</span>
          </motion.div>

          {/* NO 영역 */}
          <motion.div
            animate={{ width: `${noPercent}%` }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for 자연스러운 ease
            }}
            className={`absolute top-0 right-0 h-full flex flex-col items-center justify-center ${selectedOption === "no"
                ? "bg-white text-green-700"
                : "bg-green-600 text-white"
              }`}
            style={{
              display: noPercent < 5 ? "none" : "flex",
            }}
          >
            <span>NO</span>
            <span className="text-lg font-bold">{Math.round(noPercent)}%</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PostVoteBox;



// 5.15 1:59 PostList에 있던 투표 기능 따로 빼고 이거 다 import 해서 PostList, PostDetail에서 쓸거임