// Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { SearchBar } from "./SearchBar";
import SeatChartStatus from "./SeatChartStatus";
import Seat from "./Seat";
import HomePostCard from "../components/HomePostCard";
import { PetitionCard } from "../components/PetitionCard";
import Graph from "./Graph";
import Wordcloud from "./Wordcloud";

const samplePosts = [
  { username: "User_ID", date: "2025.03.31", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
  { username: "User_ID", date: "2025.03.30", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
  { username: "User_ID", date: "2025.03.29", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
  { username: "User_ID", date: "2025.03.28", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
  { username: "User_ID", date: "2025.03.27", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
  { username: "User_ID", date: "2025.03.26", preview: "청원 명이나 게시글 제목 어쩌고저쩌고" },
];

const samplePetitions = [
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
  { title: "보건복지부", summary: "의료 관련 법률 개정을 제안합니다.", probability: 75 },
];

export const Screen = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 4500);
    const timer2 = setTimeout(() => setShowIntro(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSearchResult = (data) => {
    setPrediction(data);
  };

  return (
    <div className="screen">
      <div className="view">
        <div className="group">
          {showIntro && (
            <div className={`transition-opacity duration-500 ease-in-out ${fadeOut ? "opacity-0" : "opacity-100"}`}>
              <div className="text-wrapper">청원이란?</div>
              <p className="element">
                청원은 국민이 국가기관에 대해 일정한 사안에 관한 자신의 의견이나 희망을 진술하는 것을 말합니다. <br />
                우리 헌법 제26조는 "모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를 가진다.",
                "국가는 청원에 대하여 심사할 의무를 진다"고 규정함으로써 국민의 청원권을 보장하고 있습니다.
              </p>
              <p className="div">
                <span className="span">청원사항<br /></span>
                <span className="text-wrapper-2">
                  피해의 구제, 공무원의 위법･부당한 행위에 대한 시정이나 징계의 요구, 법률･명령･조례･규칙 등의 <br />
                  제정･개정 또는 폐지, 공공의 제도 또는 시설의 운영, 그 밖에 청원기관의 권한에 속하는 사항입니다. (｢청원법｣ 제5조)
                </span>
              </p>
            </div>
          )}

          <div className="mt-6">
            <SearchBar onSearchResult={handleSearchResult} />
          </div>

          {prediction && (
            <SeatChartStatus percentage={Math.round(prediction.probability * 100)} />
          )}

          <Seat />

          {/* ✅ 상단: 그래프 + 워드클라우드 + 청원동의현황 (세로로 긴 형태 포함) */}
          <div className="mt-12 flex flex-row justify-center gap-8 items-start">
            {/* 왼쪽 열: 그래프 + 워드클라우드 + 게시글 */}
            <div className="flex flex-col gap-10">
              <Graph />
              <Wordcloud />

              {/* 게시글 카드 리스트 */}
              <div className="w-[820px] rounded-[33px] border border-[#a1a1a1] px-10 py-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[35px] font-bold text-[#6b6b6b] tracking-widest">POST</h2>
                  <button onClick={() => navigate("/postlist")} className="text-[30px] font-semibold cursor-pointer">...</button>
                </div>
                <div className="flex flex-col space-y-6">
                  {samplePosts.map((post, idx) => (
                    <HomePostCard
                      key={idx}
                      username={post.username}
                      date={post.date}
                      preview={post.preview}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 오른쪽 열: 청원 동의 현황 카드 리스트 */}
            <div className="w-[350px] rounded-[33px] border border-[#a1a1a1] px-6 py-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[22px] font-bold text-[#6b6b6b] tracking-widest">청원 동의 현황</h2>
                <button onClick={() => navigate("/petitionlist")} className="text-[25px] font-semibold cursor-pointer">...</button>
              </div>
              <div className="flex flex-col space-y-4">
                {samplePetitions.map((petition, i) => (
                  <PetitionCard
                    key={i}
                    title={petition.title}
                    summary={petition.summary}
                    probability={petition.probability}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Screen;


//첫 화면에 이제 분리해 놓은 애들을 불러다가 만들어야함
// 5.12 21:36 퍼센트 나타내고 반원 채워지는거 불러오도록 추가
// 21:41 export default Screen; 추가 누락 오류 해결
// 5.15 12:25 그래프 워드클라우드 청원동의현황 게시판 자리 배치 맞춰서 추가