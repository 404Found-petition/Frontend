// src/pages/PostList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // axios 인스턴스
import PostCard from "../components/PostCard";
import { API_BASE_URL } from "../config"; // 백엔드 기본 URL

// 게시글 목록 컴포넌트 (기본 endpoint는 /posts/)
const PostList = ({ apiEndpoint = "/posts/" }) => {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const navigate = useNavigate();

  // 페이지네이션 그룹 사이즈 (한 번에 10개 표시)
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 게시글 불러오기 useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(apiEndpoint, {
          params: { page },
        });

        if (res.data.success) {
          setPosts(res.data.data); // 게시글 목록
          setTotalPages(res.data.total_pages); // 총 페이지 수
        } else {
          console.error("❌ 게시글 불러오기 실패:", res.data.message);
        }
      } catch (err) {
        console.error("❌ 게시글 목록 API 오류:", err);
      }
    };

    fetchPosts();
  }, [apiEndpoint, page]);

  // 투표 핸들러 (로컬 상태 반영)
  const handleVote = (postId, option) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              voted: true,
              voted_option: option,
              vote_result: {
                ...(post.vote_result || { yes: 0, no: 0 }),
                [option]: (post.vote_result?.[option] || 0) + 1,
              },
            }
          : post
      )
    );
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = async (postId, commentContent) => {
    try {
      const res = await api.post(`/comments/${postId}/`, {
        content: commentContent,
      });

      if (res.data.success) {
        const newComment = res.data.comment;
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...(post.comments || []), newComment],
                }
              : post
          )
        );
      } else {
        console.error("❌ 댓글 저장 실패:", res.data.message);
      }
    } catch (err) {
      console.error("❌ 댓글 등록 API 오류:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 pb-32">
      <div className="w-full max-w-[1400px] p-6 mx-auto border border-black rounded-[20px] bg-white">
        {/* 상단: 제목 + 글쓰기 버튼 */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-black">
          <h2 className="text-[32px] font-bold text-[#6b6b6b]">Post</h2>
          <button
            className="w-[156px] h-[47px] bg-[#5cab7c] rounded-[10px] border border-black text-white text-[23px] shadow"
            onClick={() => navigate("/posts/create")}
          >
            Write
          </button>
        </div>

        {/* 게시글 카드 목록 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onVote={handleVote}
              onCommentSubmit={handleCommentSubmit}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {/* 이전 페이지 그룹 */}
            {startPage > 1 && (
              <button
                onClick={() => setPage(startPage - 1)}
                className="px-3 py-1 text-gray-700 bg-white border rounded"
              >
                &lt;
              </button>
            )}

            {/* 현재 그룹의 페이지들 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 border rounded ${
                  page === n ? "bg-green-700 text-white font-bold" : "bg-white text-black"
                }`}
              >
                {n}
              </button>
            ))}

            {/* 다음 페이지 그룹 */}
            {endPage < totalPages && (
              <button
                onClick={() => setPage(endPage + 1)}
                className="px-3 py-1 text-gray-700 bg-white border rounded"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
