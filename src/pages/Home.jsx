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
  { title: "고용노동부", summary: "청년 일자리 확대 방안을 요청합니다.", probability: 65 },
  { title: "교육부", summary: "고등교육 재정지원 확대를 청원합니다.", probability: 82 },
];

const Home = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 4500);
    const timer2 = setTimeout(() => setShowIntro(false), 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const fetchLawmakers = async () => {
      try {
        const res = await fetch("/api/lawmakers/");
        const data = await res.json();
        const sorted = [...data].sort((a, b) => a.seat_number - b.seat_number);
        setSeats(sorted);
      } catch (error) {
        console.error("❌ 의원 정보 불러오기 실패:", error);
      }
    };

    fetchLawmakers();
  }, []);

  const handleSearchResult = (data) => {
    setPrediction(data);
  };

  const percent = prediction ? Math.round(prediction.probability * 100) : 0;

  return (
    <div className="screen">
      <div className="view">
        <div className="group">
          {showIntro && (
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out ${fadeOut ? "opacity-0" : "opacity-100"}`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none" />
              <div className="relative z-10 w-[1000px] bg-white p-12 rounded-3xl shadow-2xl text-center">
                <h2 className="text-4xl font-bold mb-6 text-[#3f7d58]">청원이란?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  청원은 국민이 국가기관에 대해 일정한 사안에 관한 자신의 의견이나 희망을 진술하는 것을 말합니다. <br />
                  우리 헌법 제26조는 "모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를 가진다.",<br />
                  "국가는 청원에 대하여 심사할 의무를 진다"고 규정함으로써 국민의 청원권을 보장하고 있습니다.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  <strong className="block text-[#3f7d58] text-xl mb-2">청원사항</strong>
                  피해의 구제, 공무원의 위법･부당한 행위에 대한 시정이나 징계의 요구, <br />
                  법률･명령･조례･규칙 등의 제정･개정 또는 폐지, 공공의 제도 또는 시설의 운영, <br />
                  그 밖에 청원기관의 권한에 속하는 사항입니다. (｢청원법｣ 제5조)
                </p>
              </div>
            </div>
          )}

          <div className="mt-[10px] mb-[60px] ml-[400px]">
            <SearchBar onSearchResult={handleSearchResult} />
          </div>

          <div style={{ position: "relative" }}>
            <SeatChartStatus
              percentage={percent}
              lawmakers={seats}
            />
          </div>

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

            <div className="w-[350px] rounded-[33px] border border-[#a1a1a1] px-6 py-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[38px] font-bold text-[#6C6C6C] text-center w-full mt-4">청원 동의 현황</h2>
                <button onClick={() => navigate("/petitionlist")} className="absolute right-6 top-2 text-[24px] font-semibold cursor-pointer">...</button>
              </div>
              <div className="w-full h-[1px] bg-[#A2A2A2] mb-4" />
              <div className="flex flex-col space-y-4 w-full">
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

export default Home;
