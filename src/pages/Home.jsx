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
import { API_BASE_URL } from "../config";

const Home = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [fastClose, setFastClose] = useState(false);
  const [petitionData, setPetitionData] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [homePosts, setHomePosts] = useState([]);

  // ✅ 최근 게시글
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/posts/recent/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const recentPosts = data.data.map((post) => ({
            id: post.id,
            username: post.userid,
            date: post.created_at?.slice(0, 10),
            title: post.title,
          }));

          setHomePosts(recentPosts);
        } else {
          console.error("❌ 게시글 응답 오류:", data.message);
        }
      })
      .catch((err) => console.error("❌ 게시글 불러오기 실패:", err));
  }, []);

  // ✅ 청원 동의 현황 (csvPrediction 기반 API로 교체됨)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/public-predictions/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 csvPrediction API 응답:", data); // 디버깅용
        const raw = data.data || [];
        const sorted = raw
          .sort((a, b) => a.id - b.id)
          .slice(0, 7)
          .map((item) => ({
            title: item.title,
            summary: item.summary,
            probability: parseFloat(item.probability.toFixed(1)),
          }));
        setPetitionData(sorted);
      })
      .catch((err) => console.error("❌ 예측 데이터 로딩 실패:", err));
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* ✅ 검색창 */}
          <div className="mt-[10px] mb-[60px] px-4">
            <div className="w-full max-w-[800px] mx-auto">
              <SearchBar onSearchResult={(result) => setPrediction(result)} />
            </div>
          </div>

          {/* ✅ 좌석도 */}
          <div className="px-4 py-6">
            <div className="w-full max-w-[900px] mx-auto">
              <SeatChartStatus targetPercentage={percent} />
            </div>
          </div>

          {/* ✅ 그래프 + 게시글 + 청원 동의 현황 */}
          <div className="px-4 pb-20">
            <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* 왼쪽 */}
              <div className="flex flex-col gap-10">
                {/* ✅ POST 카드 기준 가운데 정렬을 위해 max-w + mx-auto 추가 */}
                <div className="flex flex-col md:flex-row justify-center items-start gap-[10px] w-full max-w-[820px] mx-auto">
                  <Graph />
                  <Wordcloud />
                </div>

                <div className="w-full rounded-[33px] border border-[#a1a1a1] px-10 py-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[35px] font-bold text-[#6b6b6b] tracking-widest">POST</h2>
                    <button onClick={() => navigate("/posts")} className="text-[30px] font-semibold cursor-pointer">...</button>
                  </div>

                  {/* ✅ 구분선 추가 위치는 여기입니다! */}
                  <hr className="border-t border-gray-400 w-[100%] mx-auto mb-6" />

                  <div className="flex flex-col space-y-6">
                    {homePosts.map((post) => (
                      <HomePostCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽 */}
              <div className="w-full rounded-[33px] border border-[#a1a1a1] px-6 py-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[40px] font-bold text-[#6C6C6C] text-center w-full mt-4">청원 동의 현황</h2>
                  <button
                    onClick={() => navigate("/petitionlist")}
                    className="absolute right-6 top-2 text-[24px] font-semibold cursor-pointer"
                  >
                    ...
                  </button>
                </div>

                {/* ✅ 구분선 추가 위치는 여기입니다! */}
                <hr className="border-t border-gray-400 w-[100%] mx-auto mb-6" />

                <div className="flex flex-col space-y-4">
                  {petitionData.map((petition, i) => (
                    <PetitionCard
                      key={i}
                      title={""}
                      summary={petition.title}
                      probability={petition.probability}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;

// 5.24 3:13 청원 동의 현황 홈화면 카드 api 수정 중 -> 3:17 수정됨
// 5.25 ✅ csvPrediction 기반 /api/public-predictions/로 전환 완료
