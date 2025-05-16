// PostVoteBox.jsx
// 게시글 투표 기능을 재사용 가능한 컴포넌트로 분리

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PostVoteBox = ({ voted, voteResult, voteTitle, onVote }) => {
  return (
    <div className="mt-4">
      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div
            key="voteButtons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-4"
          >
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={() => onVote("yes")}
            >
              YES
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => onVote("no")}
            >
              NO
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="voteResult"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-gray-100 rounded-md shadow-inner"
          >
            <div className="font-bold text-gray-700 mb-2">
              {voteTitle || "이 안건에 대해 어떻게 생각하나요?"}
            </div>
            <div className="flex divide-x-2 divide-white rounded-lg overflow-hidden shadow-md">
              {/* YES 영역 */}
              <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-2">
                <span className="text-sm font-semibold">YES</span>
                <motion.div
                  className="h-2 bg-white mt-2 w-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${voteResult.yes}%` }}
                  transition={{ duration: 1 }}
                />
                <span className="text-xl font-bold mt-1">{voteResult.yes}%</span>
              </div>

              {/* NO 영역 */}
              <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-2">
                <span className="text-sm font-semibold">NO</span>
                <motion.div
                  className="h-2 bg-white mt-2 w-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${voteResult.no}%` }}
                  transition={{ duration: 1 }}
                />
                <span className="text-xl font-bold mt-1">{voteResult.no}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostVoteBox;

// 5.15 1:59 PostList에 있던 투표 기능 따로 빼고 이거 다 import 해서 PostList, PostDetail에서 쓸거임