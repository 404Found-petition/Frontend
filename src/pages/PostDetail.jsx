import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostVoteBox from "../components/PostVoteBox";
import CommentList from "../components/ViewPostComment_List";
import CommentInput from "../components/CommentInput";
import { LoginAlertModal } from "../components/LoginAlertModal";
import { PostContext } from "../context/PostContext";

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const postFromState = location.state;

  const post = posts.find((p) => p.id === postFromState?.id); // ← Context에서 찾음
  const bottomRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem("token");

  const [voted, setVoted] = useState(post?.voted || false);
  const [voteResult, setVoteResult] = useState(post?.vote_result || { yes: 0, no: 0 });
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [selectedOption, setSelectedOption] = useState(post?.voted_option || null);

  useEffect(() => {
    if (shouldScrollToBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
      setShouldScrollToBottom(false);
    }
  }, [comments, shouldScrollToBottom]);

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

    setVoted(true);
    setSelectedOption(option);
    setVoteResult(newVoteResult);

    // 🟢 Context 상태에 반영
    const updatedPost = {
      ...post,
      voted: true,
      voted_option: option,
      vote_result: newVoteResult,
    };

    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? updatedPost : p))
    );
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

    const newComments = [...comments, newComment];
    setComments(newComments);
    setCommentText("");

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    setShouldScrollToBottom(true);

    // 🟢 Context 상태에 반영
    const updatedPost = {
      ...post,
      comments: newComments,
    };

    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? updatedPost : p))
    );
  };

  const handleExit = () => {
    navigate("/posts");
  };

  return (
    <div className="flex items-center justify-center w-full h-[90vh] pt-4 bg-white">
      <div className="flex w-[90%] max-w-[1200px] h-[600px] bg-[#f6fff4] rounded-lg shadow-md border border-gray-300 p-8">
        {/* 왼쪽: 제목 + 본문 + 투표 */}
        <div className="flex flex-col w-2/3 pr-6">
          <div className="flex-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <p className="text-lg text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>

          <div className="mt-4 shrink-0">
            <PostVoteBox
              voted={voted}
              voteResult={voteResult}
              voteTitle={post.vote_title}
              onVote={handleVote}
              heightClass="min-h-[100px]"
              selectedOption={selectedOption}
            />
          </div>
        </div>

        {/* 오른쪽: 댓글 전체 포함 */}
        <div className="flex flex-col w-1/3 pl-6 border-l border-gray-300">
          <div className="flex-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-800">댓글({comments.length})</p>
              <button onClick={handleExit} className="text-2xl font-bold">×</button>
            </div>
            <CommentList comments={comments} bottomRef={bottomRef} />
          </div>

          <div className="mt-4 shrink-0">
            <CommentInput
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onSubmit={handleCommentSubmit}
            />
          </div>
        </div>
      </div>

      {showLoginModal && <LoginAlertModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default PostDetail;
