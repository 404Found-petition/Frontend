import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostVoteBox from "../components/PostVoteBox";
import CommentList from "../components/ViewPostComment_List";
import CommentInput from "../components/CommentInput";
import { LoginAlertModal } from "../components/LoginAlertModal";

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;
  const bottomRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // 🛠 안전하게 초기화 (post가 null일 수 있으므로 optional chaining)
  const [voted, setVoted] = useState(post?.voted || false); // ✅ 초기값 설정
  const [voteResult, setVoteResult] = useState(post?.vote_result || { yes: 0, no: 0 }); // ✅ 실제 값
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [selectedOption, setSelectedOption] = useState(post?.voted_option || null);

  // 👇 댓글 추가 시 하단으로 확 스크롤
  useEffect(() => {
    if (shouldScrollToBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" }); // 확 내려감
      setShouldScrollToBottom(false);
    }
  }, [comments, shouldScrollToBottom]);

  // ✅ post 없으면 예외 처리
  if (!post) {
    return (
      <div className="mt-20 text-center text-gray-500">
        게시글 정보가 없습니다.
        <button onClick={() => navigate(-1)} className="ml-2 text-blue-600 underline">
          돌아가기
        </button>
      </div>
    );
  }

  const handleVote = (option) => {
    if (!isLoggedIn) return setShowLoginModal(true);
    if (voted) return;

    const newVoteResult = {
      ...voteResult,
      [option]: voteResult[option] + 1,
    };

    setVoteResult(newVoteResult);
    setSelectedOption(option);
    setVoted(true);

    // ❌ navigate 제거 — 대신 X 버튼 눌러서 나가면 됨
  };


  const handleCommentSubmit = () => {
    if (!isLoggedIn) return setShowLoginModal(true);
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      nickname: "익명",
      content: commentText,
      date: new Date().toISOString().split("T")[0],
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    // ✅ 새 댓글 추가 후 스크롤
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    setShouldScrollToBottom(true); // 댓글 입력 직후 true로 바꿈
  };

  const handleExit = () => {
    const updatedPost = {
      ...post,
      voted,
      voted_option: selectedOption,
      vote_result: voteResult,
      comments,
    };
    navigate("/posts", { state: { updatedPost } });
  };

  return (
    <div className="flex items-center justify-center w-full h-[90vh] pt-4 bg-white">
      <div className="flex w-[90%] max-w-[1200px] h-[600px] bg-[#f6fff4] rounded-lg shadow-md border border-gray-300 p-8">
        {/* 왼쪽: 제목 + 본문 + 투표 */}
        <div className="flex flex-col w-2/3 pr-6">
          {/* 위: 스크롤 되는 제목 + 본문 */}
          <div className="flex-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <p className="text-lg text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>

          {/* 아래: 항상 고정된 투표 박스 */}
          <div className="mt-4 shrink-0">
            <PostVoteBox
              voted={voted}
              voteResult={voteResult}
              voteTitle={post.vote_title}
              onVote={handleVote}
              heightClass="min-h-[100px]"
              selectedOption={selectedOption} // ✅ 새로 추가
            />

          </div>
        </div>

        {/* 오른쪽: 댓글 전체 포함 */}
        <div className="flex flex-col w-1/3 pl-6 border-l border-gray-300">
          {/* 위: 스크롤 되는 댓글 리스트 */}
          <div className="flex-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-800">댓글({comments.length})</p>
              <button onClick={handleExit} className="text-2xl font-bold">×</button>
            </div>
            <CommentList comments={comments} bottomRef={bottomRef} />
          </div>

          {/* 아래: 고정된 댓글 입력창 */}
          <div className="mt-4 shrink-0">
            <CommentInput
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onSubmit={handleCommentSubmit}
            />
          </div>
        </div>

      </div>

      {/* 로그인 모달 */}
      {showLoginModal && <LoginAlertModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default PostDetail;

