import React from "react";
import PostList from "./PostList"; // ✅ 게시글 목록 컴포넌트 재사용
import { useLocation } from "react-router-dom";

const PostListHistory = () => {
  const location = useLocation();
  const isMine = new URLSearchParams(location.search).get("mine") === "true";

  // ✅ mine=true면 내가 쓴 게시글만, 아니면 전체
  const endpoint = isMine ? "posts/mine/" : "posts/";

  return (
    <div className="px-10 pt-5"> {/* ✅ py-5 → pt-5로 수정해서 위 여백만 적용 */}
      <PostList apiEndpoint={endpoint} />
    </div>
  );
};

export default PostListHistory;

//5.24 1:02 내가 작성한 게시글 전체보기 문구 삭제제