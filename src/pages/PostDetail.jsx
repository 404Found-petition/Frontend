// 게시글 하나에 대한 상세 보기

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import VoteForm from "../components/VoteForm";
import VoteResult from "../components/VoteResult";
import CommentList from "../components/CommentList";
import CommentInput from "../components/ViewPostComment_Insult"; // 댓글 입력 컴포넌트

const PostDetail = () => {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false); // 투표 여부
  const [commentText, setCommentText] = useState(""); // 댓글 입력 상태
  const [comments, setComments] = useState([
    { id: 1, name: "이름", content: "댓글 내용 댓글 내용", date: "2025.03.31" },
    { id: 2, name: "닉네임", content: "댓글 내용 댓글 내용", date: "2025.03.31" },
  ]);

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      name: "익명", // 실제 로그인 사용자 이름으로 대체 가능
      content: commentText,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  // 임시 게시글 데이터
  const post = {
    title: "제목제목제목제목",
    content: "작성된 내용",
    voteTitle: "투표 제목",
    voteResult: { yes: 60, no: 40 },
  };

  return (
    <div className="bg-white w-full flex justify-center">
      <div className="w-[1440px] h-[1024px] relative">
        {/* 헤더 */}
        <Header />

        {/* 'X' 버튼 - 게시판으로 돌아가기 */}
        <button
          className="absolute top-6 right-10 text-3xl font-bold text-gray-500"
          onClick={() => navigate("/posts")}
        >
          ×
        </button>

        {/* 게시글 제목 */}
        <h1 className="absolute top-24 left-[276px] text-[38px] font-semibold text-center w-full">
          {post.title}
        </h1>

        {/* 본문 + 투표 영역 */}
        <div className="absolute top-[180px] left-[220px] w-[600px] border border-gray-200 p-5 rounded-lg">
          <p className="text-[20px] mb-10">{post.content}</p>
          {voted ? (
            <VoteResult voteResult={post.voteResult} voteTitle={post.voteTitle} />
          ) : (
            <VoteForm voteTitle={post.voteTitle} onVote={() => setVoted(true)} />
          )}
        </div>

        {/* 댓글 영역 */}
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
