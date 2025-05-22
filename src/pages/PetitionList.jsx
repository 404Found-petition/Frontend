import React, { useState, useEffect } from "react";
import { PetitionListCard } from "../components/PetitionListCard";

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PETITIONS_PER_PAGE = 24;

  useEffect(() => {
    fetch("http://localhost:8000/api/predictions/")
      .then((res) => res.json())
      .then((data) => {
        const converted = data.map((item) => ({
          department: item.petition_title.slice(0, 6), // 부서명 없으니 제목 일부로 대체
          title: item.petition_title,
          content: item.petition_content,
          percentage: parseFloat(item.prediction_percentage.toFixed(1)),
        }));

        const start = (page - 1) * PETITIONS_PER_PAGE;
        const end = start + PETITIONS_PER_PAGE;
        setPosts(converted.slice(start, end));
        setTotalPages(Math.ceil(converted.length / PETITIONS_PER_PAGE));
      })
      .catch((err) => {
        console.error("❌ 예측 데이터 불러오기 실패:", err);
      });
  }, [page]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* 카드 박스 */}
      <div className="w-[1336px] mt-10 rounded-[34px] border-2 border-black p-10">
        <h2 className="text-[22px] font-semibold text-left text-[#6C6C6C] mb-2">
          Status of Petition Agreement
        </h2>
        <hr className="mb-6 border-t border-gray-400" />

        {/* 카드 리스트 */}
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

      {/* ✅ 새 페이지네이션 (10개 단위 그룹) */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 mb-12">
          {(() => {
            const PAGE_GROUP_SIZE = 10;
            const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
            const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
            const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

            return (
              <>
                {/* 이전 그룹 이동 */}
                {startPage > 1 && (
                  <button
                    onClick={() => setPage(startPage - 1)}
                    className="px-3 py-1 border-[1.5px] border-black rounded bg-white text-gray-700 font-semibold hover:bg-gray-100"
                  >
                    &lt;
                  </button>
                )}

                {/* 현재 그룹 페이지 버튼 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-4 py-2 border-[1.5px] rounded font-semibold ${page === n
                        ? "bg-green-700 text-white"
                        : "bg-white text-black hover:bg-gray-100"
                      }`}
                  >
                    {n}
                  </button>
                ))}

                {/* 다음 그룹 이동 */}
                {endPage < totalPages && (
                  <button
                    onClick={() => setPage(endPage + 1)}
                    className="px-3 py-1 border-[1.5px] border-black rounded bg-white text-gray-700 font-semibold hover:bg-gray-100"
                  >
                    &gt;
                  </button>
                )}
              </>
            );
          })()}
        </div>
      )}

    </div>
  );
};

export default PetitionList;
