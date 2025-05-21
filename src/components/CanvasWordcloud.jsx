// src/components/CanvasWordcloud.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import WordCloud from "wordcloud";

export default function CanvasWordcloud() {
  const baseCanvasRef = useRef(null);          // 홈 화면용 canvas
  const [baseImage, setBaseImage] = useState(null); // 이미지로 저장된 워드클라우드
  const [hovered, setHovered] = useState(false);

  // ✅ 단어 리스트 (useMemo 사용)
  const words = useMemo(() => [
    ["복지", 50],
    ["경제", 30],
    ["교육", 25],
    ["환경", 20],
    ["교통", 15],
  ], []);

  // ✅ 랜덤 색상 함수 (녹색 계열)
  const getRandomColor = () => {
    const colors = ["#3a6b50", "#5cab7c", "#2d5c4f", "#6ca18f", "#43876f"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // ✅ 홈 워드클라우드 렌더링 + 이미지 저장
  useEffect(() => {
    if (baseCanvasRef.current) {
      WordCloud(baseCanvasRef.current, {
        list: words,
        gridSize: 8,
        weightFactor: 5,
        fontFamily: "Impact",
        color: getRandomColor,
        backgroundColor: "#ffffff",
        rotateRatio: 0,
        drawOutOfBound: false,
        shrinkToFit: true,
      });

      // WordCloud 렌더링 완료 후 이미지 저장
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

      {/* ✅ 팝업: 저장된 이미지로 표시 */}
      {hovered && baseImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded shadow-2xl border border-gray-400">
            <button
              className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-black"
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
