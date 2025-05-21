// 게시글 10개 모아놓은 페이지에 나올 카드들 만들어주는거
// PostCard는 PostList가 받은 데이터를 넘겨 받아서 게시글 카드형으로 UI 구상해서 PostList에 넘겨줌

import React, { useState } from "react";
import PostVoteBox from "./PostVoteBox";
import { LoginAlertModal } from "./LoginAlertModal";

const PostCard = ({ post, onCommentSubmit, onVote }) => {
  const [comment, setComment] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

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
  const visibleComments = [...post.comments].slice(-commentCount);

  return (
    <div className="w-full p-4 mb-6 bg-white border border-black shadow-sm rounded-xl min-h-[260px]">
      {/* 게시글 상단 정보 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col items-center min-w-[50px] mt-1">
          <div className="w-[28px] h-[28px] rounded-full bg-green-700 mb-1 shrink-0" />
          <span className="text-xs text-gray-600">{post.author}</span>
        </div>

        <div className="flex-1 px-[6px]">
          <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
          <p className="mt-1 text-sm text-gray-700">{post.content}</p>
        </div>

        <span className="mr-4 text-sm text-gray-500 whitespace-nowrap">{post.created_at}</span>
      </div>

      {/* 회색 구분선 */}
      <hr className="my-3 border-t border-gray-300" />

      {/* 투표 영역 */}
      {post.vote_title && (
        <div className="my-4">
          <PostVoteBox
            voted={post.voted}
            voteResult={post.vote_result}
            voteTitle={post.vote_title}
            onVote={handleVote}
          />
        </div>
      )}

      {/* 댓글 렌더링 */}
      <div className="pl-4">
        {visibleComments.map((c, idx) => (
          <div key={idx} className="flex items-start mb-2 space-x-4">
            <div className="w-6 h-6 mt-1 bg-white border-4 border-green-600 rounded-full" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{c.nickname}</span>
                <span className="text-xs text-gray-500">{c.date}</span>
              </div>
              <p className="text-base text-gray-700">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="mt-4 -mx-4">
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
      {showLoginModal && <LoginAlertModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default PostCard;



//5.12 22:36 동동적으로 만들어 놓음
// 5.14 11:28 투표 부분 디자인 잘못된거 수정 , 투표 결과 나오는 애니메이션 기능 추가
// 5.15 2:23 PostVoteBox import 해옴