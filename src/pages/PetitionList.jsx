import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PetitionListCard } from "../components/PetitionListCard";

const PetitionList = ({ apiEndpoint = "/api/posts/" }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}?page=${page}`)
      .then((res) => {
        const safeResults = Array.isArray(res.data?.results) ? res.data.results : [];
        const safePages = typeof res.data?.total_pages === "number" ? res.data.total_pages : 1;

        setPosts(safeResults);
        setTotalPages(safePages);
      })
      .catch((err) => {
        console.error("❌ 백엔드 응답 에러:", err);

        // ✅ fallback mock 데이터
        setPosts([
          {
            title: "보건복지부",
            content: "의료 서비스 개선을 위한 청원입니다.",
            percentage: 72,
          },
          {
            title: "교육부",
            content: "고등교육 입시제도 개편 제안입니다.",
            percentage: 63,
          },
          {
            title: "환경부",
            content: "탄소중립을 위한 법률 개정 요청입니다.",
            percentage: 58,
          },
          {
            title: "국토교통부",
            content: "대중교통 요금 인하 제안 청원입니다.",
            percentage: 47,
          },
        ]);
        setTotalPages(1);
      });
  }, [page, apiEndpoint]);

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <Header centeredLogo />

      <div className="w-[1336px] mt-10 rounded-[34px] border-2 border-black p-10">
        <h2 className="text-[28px] font-bold text-center text-gray-700 mb-6">
          Status of Petition Agreement
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {Array.isArray(posts) &&
            posts.map((post, index) => (
              <PetitionListCard
                key={index}
                title={post.title}
                summary={post.content}
                probability={post.percentage}
              />
            ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`text-lg px-3 py-1 ${
                  page === n ? "font-bold border-b-2 border-black" : "text-gray-600"
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

export default PetitionList;
