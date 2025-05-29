import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostVoteBox from "./PostVoteBox";
import { LoginAlertModal } from "./LoginAlertModal";

const PostCard = ({ post, onCommentSubmit, onVote }) => {
  const [comment, setComment] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = !!localStorage.getItem("access");
  const navigate = useNavigate();

  const handleVote = (option) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onVote(post.id, option);
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (comment.trim() === "") return;
    onCommentSubmit(post.id, comment);
    setComment("");
  };

  const commentCount = post.vote_title ? 1 : 2;
  const visibleComments = Array.isArray(post.comments)
    ? [...post.comments].slice(-commentCount)
    : [];

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`, { state: post });
  };

  return (
    <div
      className="w-full p-4 mb-6 bg-white border border-black shadow-sm rounded-xl min-h-[260px] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 상단: 프로필 동그라미 + 작성자 ID + 작성일 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 pl-1">
          <div className="w-[28px] h-[28px] rounded-full bg-green-700 shrink-0" />
          <span className="text-sm text-gray-600 font-medium truncate max-w-[100px]">
            {post.userid}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>{post.created_at?.slice(0, 10) || "작성일 없음"}</span>
          {post.has_vote && <span className="text-green-700 text-[13px]">✅</span>}
        </div>
      </div>


      {/* 제목 + 본문 미리보기 */}
      <div className="mt-1 px-[2px] overflow-hidden">
        <h3
          className="text-lg font-bold text-gray-800 truncate w-full block"
          title={post.title}
        >
          {post.title}
        </h3>
        <p
          className="mt-1 text-sm text-gray-700 truncate w-full block"
          title={post.content}
        >
          {post.content}
        </p>
      </div>

      {/* 회색 구분선 */}
      <hr className="my-3 border-t border-gray-300" />

      {/* 투표 박스 */}
      {post.vote_title && (
        <div className="my-4" onClick={(e) => e.stopPropagation()}>
          <PostVoteBox
            voted={post.voted}
            voteResult={post.vote_result}
            voteTitle={post.vote_title}
            onVote={(option) => onVote(post.id, option)}
            selectedOption={post.voted_option}
          />
        </div>
      )}

      {/* 댓글 렌더링 */}
      <div
        className="flex flex-col pl-4 gap-y-6 min-h-[100px]"  // ✅ 최소 높이 2개 댓글 예상 높이로 확보
        onClick={(e) => e.stopPropagation()}
      >
        {visibleComments.map((c, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <div className="w-6 h-6 mt-1 min-w-[24px] bg-white border-4 border-green-600 rounded-full shrink-0" />
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{c.userid || "익명"}</span>
                <span className="text-xs text-gray-500">{c.date || ""}</span>
              </div>
              <p
                className="text-sm text-gray-700 truncate overflow-hidden whitespace-nowrap max-w-[90%]"
                title={c.content}
              >
                {c.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="mt-4 -mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="w-full h-[1px] bg-black" />
        <div className="flex items-center px-4 py-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글 작성..."
            className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-gray-500"
          />
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-6 h-6 ml-2 bg-green-700 rounded-full hover:bg-green-600"
          >
            <span className="text-sm font-bold leading-none text-white">^</span>
          </button>
        </div>
      </div>

      {/* 로그인 유도 팝업 */}
      {showLoginModal && (
        <LoginAlertModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default PostCard;
