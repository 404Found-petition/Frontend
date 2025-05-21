// 게시판 글 목록을 서버에서 불러와 카드 형식으로 보여주고 페이지네이션과 글쓰기 버튼을 제공하는 전체 게시판

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

// ✅ 더미 게시글 23개 생성
const dummyPosts = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `더미 게시글 제목 ${i + 1}`,
  content: `이것은 ${i + 1}번째 더미 게시글입니다.`,
  author: `user_${i + 1}`,
  created_at: "2025-05-19",
  vote_count: Math.floor(Math.random() * 100),
  comments: [
    {
      nickname: `댓글러${i + 1}`,
      content: `이것은 댓글 내용입니다.`,
      date: "2025-05-19",
    },
    {
      nickname: `유저${i + 1}`,
      content: `또 다른 댓글입니다.`,
      date: "2025-05-19",
    },
  ],
  vote_title: i % 2 === 0 ? "이 안건에 동의하십니까?" : null,
  voted: false,
  vote_result: { yes: 60, no: 40, voted_option: "yes" },
}));

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDummyPosts(page);
  }, [page]);

  const fetchDummyPosts = (pageNum) => {
    const start = (pageNum - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const pagePosts = dummyPosts.slice(start, end);
    setPosts(pagePosts);
    setTotalPages(Math.ceil(dummyPosts.length / POSTS_PER_PAGE));
  };

  const handleVote = (postId, option) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              voted: true,
              vote_result: {
                yes: option === "yes" ? 1 : 0,
                no: option === "no" ? 1 : 0,
                voted_option: option,
              },
            }
          : post
      )
    );
  };

  const handleCommentSubmit = (postId, commentContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
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
        {/* 상단 헤더 영역 */}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 border rounded ${
                  page === n
                    ? "bg-green-700 text-white font-bold"
                    : "bg-white text-black"
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




//5.19 23:42 WRITE 버튼 누르면 넘어가도록 (확인해보기기)