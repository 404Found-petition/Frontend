// ✅ src/pages/PostList.jsx 수정됨
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import PostCard from "../components/PostCard";
import { API_BASE_URL } from "../config";

const PostList = ({ apiEndpoint = "/posts/" }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const isMine = new URLSearchParams(location.search).get("mine") === "true";
  const titleText = isMine ? "My Post" : "Post";

  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(apiEndpoint, {
          params: { page },
        });

        if (res.data.success) {
          setPosts(res.data.data);
          setTotalPages(res.data.total_pages);
        } else {
          console.error("❌ 게시글 불러오기 실패:", res.data.message);
        }
      } catch (err) {
        console.error("❌ 게시글 목록 API 오류:", err);
      }
    };

    fetchPosts();
  }, [apiEndpoint, page]);

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
    <div className="min-h-screen bg-white pt-10 pb-32">
      <div className="w-full max-w-[1400px] p-6 mx-auto border border-black rounded-[20px] bg-white">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-black">
          <h2 className="text-[32px] font-bold text-[#6b6b6b]">{titleText}</h2>
          {!isMine && ( // ✅ 내 게시글 보기 페이지에서는 Write 버튼 숨김
            <button
              className="w-[156px] h-[47px] bg-[#5cab7c] rounded-[10px] border border-black text-white text-[23px] shadow"
              onClick={() => navigate("/posts/create")}
            >
              Write
            </button>
          )}
        </div>


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

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {startPage > 1 && (
              <button onClick={() => setPage(startPage - 1)} className="px-3 py-1 text-gray-700 bg-white border rounded">
                &lt;
              </button>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 border rounded ${page === n ? "bg-green-700 text-white font-bold" : "bg-white text-black"
                  }`}
              >
                {n}
              </button>
            ))}
            {endPage < totalPages && (
              <button onClick={() => setPage(endPage + 1)} className="px-3 py-1 text-gray-700 bg-white border rounded">
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


//5.24 1:02 내가 작성한 게시글 전체보기에서는 MY POST로 보이게 수정