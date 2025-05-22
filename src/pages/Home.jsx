// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

import { SearchBar } from "../components/SearchBar";
import SeatChartStatus from "../components/SeatChartStatus";
import Graph from "../components/Graph";
import Wordcloud from "../components/Wordcloud";
import HomePostCard from "../components/HomePostCard";
import { PetitionCard } from "../components/PetitionCard";

// ✅ 샘플 게시글: id 추가
const samplePosts = [
  { id: 1, username: "User_ID", date: "2025.03.31", preview: "주택 정책 개정 필요성에 대해 논의합니다." },
  { id: 2, username: "User_ID", date: "2025.03.30", preview: "전기차 충전소 확대 청원이 필요합니다." },
  { id: 3, username: "User_ID", date: "2025.03.29", preview: "교통안전 강화를 위한 법 개정 청원입니다." },
  { id: 4, username: "User_ID", date: "2025.03.28", preview: "환경 보호를 위한 일회용품 규제 청원입니다." },
  { id: 5, username: "User_ID", date: "2025.03.27", preview: "교육 현장의 변화에 대한 개선 청원입니다." },
  { id: 6, username: "User_ID", date: "2025.03.26", preview: "의료보험 보장성 확대에 대한 국민 청원입니다." },
];


const Home = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [fastClose, setFastClose] = useState(false);

  const [petitionData, setPetitionData] = useState([]); // 청원예측현황 부분
  useEffect(() => {
    fetch("http://localhost:8000/api/predictions/")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data]
          .sort((a, b) => a.id - b.id) // 최신순
          .slice(0, 6) // 최신 6개만
          .map((item) => ({
            title: item.petition_title,
            summary: item.petition_content, // 사용 안하지만 혹시 모르니 유지
            probability: parseFloat(item.prediction_percentage.toFixed(1)),
          }));
        setPetitionData(sorted);
      })
      .catch((err) => console.error("❌ 예측 데이터 로딩 실패:", err));
  }, []);

  // ✅ intro 팝업 제어
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
      setShowIntro(true);
      const timer1 = setTimeout(() => setFadeOut(true), 4500);
      const timer2 = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("hasSeenIntro", "true");
      }, 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setShowIntro(true);
      setFastClose(true);
      setFadeOut(true);
      const timer = setTimeout(() => setShowIntro(false), 10);
      return () => clearTimeout(timer);
    }
  }, []);

  // ✅ 확률 게이지용 안전 처리
  let percent = 0;
  if (prediction && typeof prediction.predicted_percentage === "number") {
    percent = Math.round(prediction.predicted_percentage);
  }

  return (
    <div className="screen">
      <div className="view">
        <div className="group">
          {/* ✅ 청원이란? 소개 팝업 */}
          {showIntro && (
            <>
              <div className="fixed inset-0 z-40 bg-black pointer-events-auto bg-opacity-30" />
              <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-[90vw] max-w-[1000px] z-50 bg-white border-2 border-gray-50 
                rounded-2xl p-10 shadow-xl 
                transition-opacity ${fastClose ? "duration-[1ms]" : "duration-500"} ease-in-out
                ${fadeOut ? "opacity-0" : "opacity-100"}`}
              >
                <h2 className="text-center text-[32px] font-bold text-[#3F7D58] mb-6">
                  청원이란?
                </h2>

                <p className="text-center text-[17px] text-black leading-relaxed mb-8">
                  청원은 국민이 국가기관에 대해 일정한 사안에 관한 자신의 의견이나 희망을 진술하는 것을 말합니다. <br />
                  우리 헌법 제26조는 "모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를 가진다.",<br />
                  "국가는 청원에 대하여 심사할 의무를 진다"고 규정함으로써 국민의 청원권을 보장하고 있습니다.
                </p>

                <p className="leading-relaxed text-center">
                  <span className="block text-[19px] font-bold text-[#3F7D58] mb-2">청원사항</span>
                  <span className="text-[16px] text-gray-700">
                    피해의 구제, 공무원의 위법･부당한 행위에 대한 시정이나 징계의 요구, <br />
                    법률･명령･조례･규칙 등의 제정･개정 또는 폐지, 공공의 제도 또는 시설의 운영, <br />
                    그 밖에 청원기관의 권한에 속하는 사항입니다. (｢청원법｣ 제5조)
                  </span>
                </p>
              </div>
            </>
          )}

          {/* 🔍 청원 검색바 */}
          <div className="mt-[10px] mb-[60px] flex justify-center">
            <SearchBar onSearchResult={(result) => setPrediction(result)} />
          </div>

          {/* 좌석 배치도 + 퍼센트 게이지 */}
          <div style={{ position: "relative" }}>
            <SeatChartStatus targetPercentage={percent} />
          </div>

          {/* 그래프 + 워드클라우드 + 카드 */}
          <div className="flex flex-row items-start justify-center gap-8 mt-12" style={{ marginTop: -20 }}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-row gap-[10px]">
                <Graph />
                <Wordcloud />
              </div>

              <div className="w-[820px] rounded-[33px] border border-[#a1a1a1] px-10 py-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[35px] font-bold text-[#6b6b6b] tracking-widest">POST</h2>
                  <button onClick={() => navigate("/posts")} className="text-[30px] font-semibold cursor-pointer">...</button>
                </div>
                <div className="flex flex-col space-y-6">
                  {samplePosts.map((post) => (
                    <HomePostCard key={post.id} {...post} />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[350px] rounded-[33px] border border-[#a1a1a1] px-6 py-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[40px] font-bold text-[#6C6C6C] text-center w-full mt-4">청원 동의 현황</h2>
                <button
                  onClick={() => navigate("/petitionlist")}
                  className="absolute right-6 top-2 text-[24px] font-semibold cursor-pointer"
                >
                  ...
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {petitionData.map((petition, i) => (
                  <PetitionCard
                    key={i}
                    title={""}// 숨기기용 빈 문자열 전달
                    summary={petition.title}
                    probability={petition.probability}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 여유 여백 */}
      <div className="h-[100px]" />
    </div>
  );
};

export default Home;


//05.21 22:10 하단부 여백 추가