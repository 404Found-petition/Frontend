import React, { useState, useEffect } from "react";
import { PetitionListCard } from "../components/PetitionListCard";
import { API_BASE_URL } from "../config";

const PetitionList = ({ apiEndpoint = "/api/predictions/" }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PETITIONS_PER_PAGE = 24;

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch(`${API_BASE_URL}${apiEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API 요청 실패");
        return res.json();
      })
      .then((data) => {
        const raw = data.data || data; // 백엔드 응답 구조에 따라 조정
        const converted = raw.map((item) => ({
          department: item.petition_title?.slice(0, 6) || "기타",
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
  }, [apiEndpoint, page]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <div className="w-[1336px] mt-10 rounded-[34px] border-2 border-black p-10">
        <h2 className="text-[22px] font-semibold text-left text-[#6C6C6C] mb-2">
          Status of Petition Agreement
        </h2>
        <hr className="mb-6 border-t border-gray-400" />

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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 mb-12">
          {(() => {
            const PAGE_GROUP_SIZE = 10;
            const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
            const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
            const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

            return (
              <>
                {startPage > 1 && (
                  <button
                    onClick={() => setPage(startPage - 1)}
                    className="px-3 py-1 border-[1.5px] border-black rounded bg-white text-gray-700 font-semibold hover:bg-gray-100"
                  >
                    &lt;
                  </button>
                )}

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

//5.24 1:16 My Petition Prediction History 로 바꿈 그리고 위로 좀 올림
//5.24 2:05 유저페이지 내 청원 이행 확률 예측 사용 기록에서는 summary 볼 필요 없어서 버튼 삭제
//5.24 3:29 지금 뭔가 이상함 데이터 넣는 과정에서 데이터가 잘못 들어가고 그런것 같은데 확인 중