import React from "react";
import PostList from "./PostList";

const PostListHistory = () => {
  return (
    <div className="px-10 py-5">
      <h2 className="text-2xl font-bold mb-6">내가 작성한 게시글</h2>
      <PostList apiEndpoint="/api/posts/mine/" />
    </div>
  );
};

export default PostListHistory; // ✅ 이 줄 추가
