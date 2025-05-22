import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import WordCloud from "wordcloud";
import { API_BASE_URL } from "../config";

export default function CanvasWordcloud() {
  const baseCanvasRef = useRef(null); // canvas 참조
  const [baseImage, setBaseImage] = useState(null); // 팝업용 이미지 저장
  const [hovered, setHovered] = useState(false);    // 팝업 열기 여부
  const [words, setWords] = useState([]);           // API 단어 목록

  // ✅ 랜덤 녹색 계열 색상
  const getRandomColor = () => {
    const colors = ["#3a6b50", "#5cab7c", "#2d5c4f", "#6ca18f", "#43876f"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // ✅ API에서 단어 받아오기
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/wordcloud/`)
      .then((res) => {
        const keywordList = res.data.keywords || [];
        const formatted = keywordList.map(item => [item.word, item.score]);
        setWords(formatted);
      })
      .catch((err) => {
        console.error("❌ 워드클라우드 데이터 로드 실패:", err);
      });
  }, []);

  // ✅ 워드클라우드 생성 + 이미지 저장
  useEffect(() => {
    if (baseCanvasRef.current && words.length > 0) {
      WordCloud(baseCanvasRef.current, {
        list: words,
        gridSize: 8,
        weightFactor: (size) => size * 13, // ✅ 단어 점수 따라 크기 다양화
        fontFamily: "Impact",
        color: getRandomColor,
        backgroundColor: "#ffffff",
        rotateRatio: 0.5,              // ✅ 회전 허용
        rotationSteps: 2,           // ✅ 0도 또는 90도만
        drawOutOfBound: false,       // ✅ 가장자리까지 퍼지게
        shrinkToFit: false          // ✅ 원형 방지
      });
      // 캔버스를 이미지로 변환해 팝업용으로 저장
      setTimeout(() => {
        const img = baseCanvasRef.current.toDataURL("image/png");
        setBaseImage(img);
      }, 300);
    }
  }, [words]);

  return (
    <>
      {/* ✅ 홈 워드클라우드 */}
      <div
        className="relative w-[400px] h-[400px] flex justify-center items-center 
                   border border-gray-300 rounded-[6px] bg-[#fffcfc] shadow-md overflow-hidden cursor-pointer"
        onClick={() => setHovered(true)}
      >
        <canvas ref={baseCanvasRef} width={400} height={400} />
      </div>

      {/* ✅ 팝업: 확대 워드클라우드 이미지 */}
      {hovered && baseImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 bg-white border border-gray-400 rounded shadow-2xl">
            <button
              className="absolute text-lg font-bold text-gray-600 top-2 right-2 hover:text-black"
              onClick={() => setHovered(false)}
            >
              ✕
            </button>
            <img
              src={baseImage}
              alt="워드클라우드"
              className="w-[700px] h-[550px] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
