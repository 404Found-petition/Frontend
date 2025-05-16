import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostVoteBox from "../components/PostVoteBox";
import CommentList from "../components/ViewPostComment_List";
import CommentInput from "../components/CommentInput";

const PostDetail = () => {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);
  const [commentText, setCommentText] = useState("");

  // ✅ mock 댓글
  const [comments, setComments] = useState([
    { id: 1, nickname: "이름", content: "첫 번째 댓글 내용입니다.", date: "2025.03.31" },
    { id: 2, nickname: "닉네임", content: "두 번째 댓글입니다.", date: "2025.03.31" },
  ]);

  // ✅ mock 게시글 데이터
  const post = {
    title: "제목: 시민의 권리를 위한 제안",
    content: "이 법안은 시민의 권리를 보호하고 삶의 질을 향상시키기 위한 청원입니다.",
    voteTitle: "이 청원에 동의하십니까?",
    voteResult: { yes: 60, no: 40 },
  };

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      nickname: "익명",
      content: commentText,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="bg-white w-full flex justify-center">
      <div className="w-[1440px] h-[1024px] relative">
        <Header />

        {/* X 버튼 */}
        <button
          className="absolute top-6 right-10 text-3xl font-bold text-gray-500"
          onClick={() => navigate("/posts")}
        >
          ×
        </button>

        {/* 게시글 제목 */}
        <h1 className="absolute top-24 left-[276px] text-[38px] font-semibold text-center w-full">
          {post?.title || "제목 없음"}
        </h1>

        {/* 본문 + 투표 */}
        <div className="absolute top-[180px] left-[220px] w-[600px] border border-gray-200 p-5 rounded-lg">
          <p className="text-[20px] mb-10">{post?.content || "내용 없음"}</p>
          {post?.voteResult && (
            <PostVoteBox
              voted={voted}
              voteResult={post.voteResult}
              voteTitle={post.voteTitle}
              onVote={() => setVoted(true)}
            />
          )}
        </div>

        {/* 댓글 */}
        <div className="absolute top-[180px] left-[880px] w-[400px]">
          <CommentList comments={comments} />
          <CommentInput
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onSubmit={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
