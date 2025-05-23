import React from "react";
import PostList from "./PostList"; // ✅ 게시글 목록 컴포넌트 재사용
import { useLocation } from "react-router-dom";

const PostListHistory = () => {
  const location = useLocation();
  const isMine = new URLSearchParams(location.search).get("mine") === "true";

  // ✅ mine=true면 내가 쓴 게시글만, 아니면 전체
  const endpoint = isMine ? "posts/mine/" : "posts/";
  
  return (
    <div className="px-10 py-5">
      <h2 className="mb-6 text-2xl font-bold">
        {isMine ? "내가 작성한 게시글 전체보기" : "전체 게시글 목록"}
      </h2>
      <PostList apiEndpoint={endpoint} />
    </div>
  );
};

export default PostListHistory;
