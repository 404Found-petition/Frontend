import React, { useState } from "react";
import PostForm from "../components/PostForm";

const PostCreate = () => {
  const [showVote, setShowVote] = useState(false);

  return (
    <div className="flex justify-center w-full bg-white">
      {/* 수정됨: relative, min-h-screen 제거 → 그림자 오버플로우 방지 */}
      <div className="w-[1440px] flex justify-center">
        {/* 상단 정렬 + 상태 전달 */}
        <PostForm showVote={showVote} setShowVote={setShowVote} />
      </div>
    </div>
  );
};

export default PostCreate;



//5.21 10:15 투표 버튼으로만 투표 생성/삭제 할 수 있게
