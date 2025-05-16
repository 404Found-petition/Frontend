// 게시글 10개 모아놓은 페이지에 나올 카드들 만들어주는거
// PostCard는 PostList가 받은 데이터를 넘겨 받아서 게시글 카드형으로 UI 구상해서 PostList에 넘겨줌

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentInput from "./CommentInput";
import PostVoteBox from "./PostVoteBox";

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
      <PostVoteBox
        voted={post.voted}
        voteResult={post.vote_result}
        voteTitle={post.vote_title}
        onVote={(option) => onVote(post.id, option)}
      />

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
// 5.15 2:23 PostVoteBox import 해옴