import React, { useState } from "react";
import PostForm from "../components/PostForm";

const PostCreate = () => {
  const [showVote, setShowVote] = useState(false);

  return (
    <div className="flex flex-col items-center w-full bg-white py-10">
      {/* POST 제목 라벨 */}
      <div className="text-[#6C6C6C] text-sm font-semibold flex items-center mb-2">
        <span className="mr-1">▶</span>
        <span>POST</span>
      </div>

      {/* 글쓰기 폼 영역 */}
      <div className="w-[1007px]">
        <PostForm showVote={showVote} setShowVote={setShowVote} />
      </div>
    </div>
  );
};

export default PostCreate;
