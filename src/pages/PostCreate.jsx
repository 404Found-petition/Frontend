import React, { useState } from "react";
import PostForm from "../components/PostForm";

const PostCreate = () => {
  const [showVote, setShowVote] = useState(false);

  // ✅ 버튼 클릭 시 상태를 반대로 토글하는 함수
  const toggleVoteForm = () => {
    setShowVote((prev) => !prev);
  };

  return (
    <div className="flex justify-center w-full bg-white">
      <div className="w-[1440px] h-[1024px] relative">

        {/* ✅ 투표 버튼 예시 */}
        <div className="absolute top-[100px] left-[200px]">
          <button
            onClick={toggleVoteForm}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            {showVote ? "투표 제거" : "투표 넣기"}
          </button>
        </div>

        <PostForm showVote={showVote} setShowVote={setShowVote} />
      </div>
    </div>
  );
};

export default PostCreate;

