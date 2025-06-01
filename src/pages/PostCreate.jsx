import React, { useState } from "react";
import PostForm from "../components/PostForm";

const PostCreate = () => {
  const [showVote, setShowVote] = useState(false);

  return (
    <div className="flex justify-center w-full bg-white">
      <div className="w-[1440px] min-h-screen relative mt-0 overflow-hidden">
        {/* 상단 정렬 + 상태 전달 */}
        <PostForm showVote={showVote} setShowVote={setShowVote} />
      </div>
    </div>
  );
};

export default PostCreate;
