// 게시글 상세 페이지: 댓글 & 투표 API 연동 + PostList 최신 상태 반영 (axios)

// PostDetail.jsx
// 게시글 상세 페이지: 댓글 & 투표 API 연동 + PostList 최신 상태 반영 (axios)

import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PostVoteBox from "../components/PostVoteBox";
import CommentInput from "../components/CommentInput";
import { LoginAlertModal } from "../components/LoginAlertModal";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { PostContext } from "../context/PostContext";

// 🔸 댓글 목록 렌더링 컴포넌트
const CommentList = ({ comments, bottomRef }) => (
  <div>
    {comments.map((comment) => (
      <div key={comment.id} className="mb-3 p-2 border-b border-gray-300">
        <p className="text-sm text-gray-800 font-semibold mb-1">{comment.userid}</p>
        <p className="text-sm text-gray-600">{comment.content}</p>
      </div>
    ))}
    <div ref={bottomRef}></div>
  </div>
);

const PostDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const postFromState = location.state;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [voted, setVoted] = useState(false);
  const [voteResult, setVoteResult] = useState({ yes: 0, no: 0 });
  const [selectedOption, setSelectedOption] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const bottomRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem("access");

  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${postFromState?.id || id}/`);
        if (res.data.success) {
          setPost(res.data.post);
          setComments(res.data.comments);
          const vote = res.data.vote_result || { yes: 0, no: 0 };
          setVoteResult(vote);
          setVoted(!!res.data.vote_result);
          setSelectedOption(vote.yes > vote.no ? "yes" : "no");
        }
      } catch (err) {
        console.error("❌ 게시글 상세 불러오기 실패:", err);
      }
    };

    fetchPostDetail();
  }, [postFromState, id]);

  useEffect(() => {
    if (shouldScrollToBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScrollToBottom(false);
    }
  }, [comments, shouldScrollToBottom]);

  const handleVote = async (option) => {
    if (!isLoggedIn) return setShowLoginModal(true);
    if (voted) return;

    try {
      await axios.post(
        `${API_BASE_URL}/api/vote/`,
        { post_id: post.id, choice: option },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );

      const newVoteResult = { ...voteResult, [option]: voteResult[option] + 1 };

      setVoted(true);
      setSelectedOption(option);
      setVoteResult(newVoteResult);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, voted: true, voted_option: option, vote_result: newVoteResult } : p
        )
      );
    } catch (err) {
      console.error("❌ 투표 실패:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) return setShowLoginModal(true);
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/comments/${post.id}/`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const newComment = res.data.comment;
      const newComments = [...comments, newComment];
      setComments(newComments);
      setCommentText("");
      setShouldScrollToBottom(true);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, comments: [...(p.comments || []), newComment] } : p
        )
      );
    } catch (err) {
      console.error("❌ 댓글 작성 실패:", err);
    }
  };

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

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-[1007px] h-[600px] mt-[80px]">
        {/* 상단 ▶ POST 표시 */}
        <div className="text-[#6C6C6C] text-sm font-semibold flex items-center mb-2 ml-1">
          <span className="mr-1">▶</span>
          <span>POST</span>
        </div>

        <div className="flex w-full h-full bg-[#f6fff4] rounded-[10px] shadow-md border border-gray-300 p-6">
          {/* 왼쪽: 본문 및 투표 */}
          <div className="flex flex-col w-2/3 pr-6">
            <div className="flex-1 pr-2 overflow-y-auto">
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

          {/* 오른쪽: 댓글 */}
          <div className="flex flex-col w-1/3 pl-6 border-l border-gray-300">
            <div className="flex-1 pr-2 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800">댓글({comments.length})</p>
                <button onClick={() => navigate("/posts")} className="text-2xl font-bold">×</button>
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
      </div>

      {/* 로그인 팝업 */}
      {showLoginModal && <LoginAlertModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default PostDetail;


//5.22 3:34 높이 위치 조정