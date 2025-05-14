// 게시글 10개 모아놓은 페이지에 나올 카드들 만들어주는거
// PostCard는 PostList가 받은 데이터를 넘겨 받아서 게시글 카드형으로 UI 구상해서 PostList에 넘겨줌

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentInput from "./CommentInput";

const PostCard = ({ post, onCommentSubmit, onVote }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() === "") return;
    onCommentSubmit(post.id, comment);
    setComment("");
  };

  return (
    <div className="w-full rounded-xl border-2 border-green-500 p-4 shadow-md mb-4 bg-white">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-lg">{post.title}</div>
          <div className="text-sm text-gray-500">
            {post.author} · {post.created_at}
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-700">{post.content}</div>

      {/* 투표 기능 */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {!post.voted ? (
            <motion.div
              key="voteButtons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4"
            >
              <button
                className="bg-green-500 text-white px-4 py-1 rounded"
                onClick={() => onVote(post.id, "yes")}
              >
                YES
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => onVote(post.id, "no")}
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
                {post.vote_title || "이 안건에 대해 어떻게 생각하나요?"}
              </div>
              <div className="flex divide-x-2 divide-white rounded-lg overflow-hidden shadow-md">
                {/* YES 영역 */}
                <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-2">
                  <span className="text-sm font-semibold">YES</span>
                  <motion.div
                    className="h-2 bg-white mt-2 w-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${post.vote_result.yes}%` }}
                    transition={{ duration: 1 }}
                  />
                  <span className="text-xl font-bold mt-1">{post.vote_result.yes}%</span>
                </div>

                {/* NO 영역 */}
                <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-2">
                  <span className="text-sm font-semibold">NO</span>
                  <motion.div
                    className="h-2 bg-white mt-2 w-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${post.vote_result.no}%` }}
                    transition={{ duration: 1 }}
                  />
                  <span className="text-xl font-bold mt-1">{post.vote_result.no}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-4 space-y-2">
        {post.comments?.map((c, idx) => (
          <div key={idx} className="flex space-x-2 items-start">
            <div className="w-[22px] h-[22px] bg-[#93e1b3] rounded-full border border-black" />
            <div>
              <div className="flex justify-between w-[250px]">
                <span className="font-semibold text-sm">{c.nickname}</span>
                <span className="text-[12px] text-gray-500">{c.date}</span>
              </div>
              <p className="text-sm text-gray-700">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="pt-4 border-t mt-4">
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PostCard;

//5.12 22:36 동동적으로 만들어 놓음
// 5.14 11:28 투표 부분 디자인 잘못된거 수정 , 투표 결과 나오는 애니메이션 기능 추가