// 게시판 글 목록을 서버에서 받아와 카드 형식으로 보여주고
// 페이지네이션은 10개 단위로 묶어 <, > 화살표로 넘기도록 구성

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosInstance';
import PostCard from "../components/PostCard";
import { API_BASE_URL } from "../config";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const navigate = useNavigate();

  // 🔸 페이지네이션 그룹 사이즈 (10개 단위로 그룹화)
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 🔹 게시글 목록을 백엔드 API로부터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`${API_BASE_URL}/api/posts/`, {
          params: { page },
        });

        if (res.data.success) {
          setPosts(res.data.data); // 게시글 배열
          setTotalPages(res.data.total_pages); // 전체 페이지 수
        } else {
          console.error("❌ 게시글 불러오기 실패:", res.data.message);
        }
      } catch (err) {
        console.error("❌ 게시글 목록 API 오류:", err);
      }
    };

    fetchPosts();
  }, [page]);

  // 🔹 투표 처리 (로컬 상태만 업데이트)
  const handleVote = (postId, option) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const updatedVote = {
          ...(post.vote_result || { yes: 0, no: 0 }),
          [option]: (post.vote_result?.[option] || 0) + 1,
        };

        return {
          ...post,
          voted: true,
          voted_option: option,
          vote_result: updatedVote,
        };
      })
    );
  };

  // 🔹 댓글 추가 (로컬 상태만 업데이트)
  const handleCommentSubmit = (postId, commentContent) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                {
                  nickname: "익명",
                  content: commentContent,
                  date: new Date().toISOString().slice(0, 10),
                },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[1400px] p-6 mx-auto border border-black rounded-[20px] bg-white">
        {/* 상단 제목 및 글쓰기 버튼 */}
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

        {/* 페이지네이션 (10개 단위) */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {/* 이전 그룹 이동 */}
            {startPage > 1 && (
              <button
                onClick={() => setPage(startPage - 1)}
                className="px-3 py-1 text-gray-700 bg-white border rounded"
              >
                &lt;
              </button>
            )}

            {/* 현재 그룹의 페이지 번호 버튼 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 border rounded ${page === n
                  ? "bg-green-700 text-white font-bold"
                  : "bg-white text-black"
                }`}
              >
                {n}
              </button>
            ))}

            {/* 다음 그룹 이동 */}
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
