import React, { useState, useEffect } from "react";
import { PetitionListCard } from "../components/PetitionListCard";

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PETITIONS_PER_PAGE = 24;

  // ✅ 더미 데이터 30개
  const dummyPosts = Array.from({ length: 30 }, (_, i) => ({
    department: ["보건복지부", "교육부", "환경부", "국토교통부", "산업통상자원부", "문화체육관광부"][i % 6],
    title: `청원 제목 ${i + 1}`,
    content: `이것은 ${i + 1}번째 청원의 요약입니다.`,
    percentage: 50 + (i % 50),
  }));

  useEffect(() => {
    const start = (page - 1) * PETITIONS_PER_PAGE;
    const end = start + PETITIONS_PER_PAGE;
    const pagePosts = dummyPosts.slice(start, end);

    setPosts(pagePosts);
    setTotalPages(Math.ceil(dummyPosts.length / PETITIONS_PER_PAGE));
  }, [page]);

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">

      {/* 카드 외곽 테두리 박스 */}
      <div className="w-[1336px] mt-10 rounded-[34px] border-2 border-black p-10">
        <h2 className="text-[22px] font-semibold text-left text-[#6C6C6C] mb-2">
          Status of Petition Agreement
        </h2>
        <hr className="border-t border-gray-400 mb-6" />

        {/* 카드 영역 */}
        <div className="grid grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <PetitionListCard
              key={index}
              title={post.title}
              summary={post.content}
              probability={post.percentage}
              department={post.department}
            />
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 mb-12 text-gray-600 text-lg items-center">
          {/* ≪ */}
          <button onClick={() => setPage(1)} disabled={page === 1} className="hover:text-black px-1">
            ≪
          </button>
          <span className="px-1">│</span>

          {/* ‹ (이전) */}
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="hover:text-black px-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16">
              <path d="M8 2L2 8L8 14" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
          <span className="px-1">│</span>

          {/* 숫자 페이지 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n, idx) => (
            <React.Fragment key={n}>
              <button
                onClick={() => setPage(n)}
                className={`px-2 ${
                  page === n ? "font-bold text-black underline" : "hover:text-black"
                }`}
              >
                {n}
              </button>
              {idx !== totalPages - 1 && <span className="px-1">│</span>}
            </React.Fragment>
          ))}

          <span className="px-1">│</span>

          {/* › (다음) */}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="hover:text-black px-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16">
              <path d="M2 2L8 8L2 14" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
          <span className="px-1">│</span>

          {/* ≫ */}
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="hover:text-black px-1">
            ≫
          </button>
        </div>
      )}
    </div>
  );
};

export default PetitionList;




//5.19 19:07 피그마 디자인대로 수정 중 아직 확인 X
//5.19 19:29 색, 크기 조정 중
//5.19 22:50 페이지 넘길 수 있게
//5.19 22:55 좀 더 피그마 디자인 그대로 페이지네이션 수정