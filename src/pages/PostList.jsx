// 게시판 글 목록을 서버에서 불러와 카드 형식으로 보여주고 페이지네이션과 글쓰기 버튼을 제공하는 전체 게시판

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { PostContext } from "../context/PostContext";

const PostList = () => {
  const { posts, setPosts } = useContext(PostContext);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 10;
  const navigate = useNavigate();

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPagePosts = posts.slice(start, end);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleVote = (postId, option) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const prevVote = post.vote_result || { yes: 0, no: 0 };

        const updatedVote = {
          ...prevVote,
          [option]: prevVote[option] + 1,
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

  const handleCommentSubmit = (postId, commentContent) => {
    setPosts((prev) =>
      prev.map((post) =>
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
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-black">
          <h2 className="text-[32px] font-bold text-[#6b6b6b]">Post</h2>
          <button
            className="w-[156px] h-[47px] bg-[#5cab7c] rounded-[10px] border border-black text-white text-[23px] shadow"
            onClick={() => navigate("/posts/create")}
          >
            Write
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {currentPagePosts.map((post) => (
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;




//5.19 23:42 WRITE 버튼 누르면 넘어가도록 (확인해보기기)