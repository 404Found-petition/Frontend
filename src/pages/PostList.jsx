//게시판 글 목록을 서버에서 불러와 카드 형식으로 보여주고 페이지네이션과 글쓰기 버튼을 제공하는 전체 게시판

// PostList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import PostCard from "../components/PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/posts/?page=${pageNum}`);
      setPosts(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 제출 핸들러
  const handleCommentSubmit = async (postId, comment) => {
    try {
      await axios.post(`/api/posts/${postId}/comments/`, { content: comment });
      fetchPosts(page); // 댓글 작성 후 새로고침
    } catch (err) {
      console.error(err);
    }
  };

  // 투표 핸들러
  const handleVote = async (postId, voteType) => {
    try {
      await axios.post(`/api/posts/${postId}/vote/`, { vote: voteType });
      fetchPosts(page); // 투표 후 새로고침
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header centeredLogo />

      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[32px] font-bold text-[#6b6b6b]">Post</h2>
          <button
            className="w-[156px] h-[47px] bg-[#5cab7c] rounded-[10px] border-2 border-black text-white text-[23px] shadow"
            onClick={() => (window.location.href = "/posts/create")}
          >
            Write
          </button>
        </div>

        {/* 게시글 카드 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onCommentSubmit={handleCommentSubmit}
              onVote={handleVote}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 border rounded ${
                  page === n ? "bg-green-500 text-white font-bold" : "bg-white text-black"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;

// 5.14 22:10 PostCard 기반으로 게시글 구성하도록 수정