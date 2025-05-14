// 데이터 받아서 워드 클라우드 구현, 마우스 오버 효과 발생 시 WordCloudOverlay.jsx 실행

import React, { useState, useEffect } from "react";
import WordCloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import WordCloudOverlay from "./WordCloudOverlay";

export default function Wordcloud() {
  const [words, setWords] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("/api/wordcloud")  // 백엔드에서 제공할 워드클라우드 API 주소
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error("워드클라우드 데이터 로딩 실패:", err));
  }, []);

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 70],
  };

  return (
    <div
      className="transition-transform duration-300 ease-in-out border-[2px] border-black border-solid"
      style={{
        width: "600px",
        height: "400px",
        transform: isHovered ? "scale(1.5)" : "scale(1)",
        zIndex: isHovered ? 50 : 1,
        position: "relative",
        margin: "0 auto",
        backgroundColor: "white"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <WordCloud words={words} options={options} />

      {/* 오버레이 워드클라우드 (중앙 확대) */}
      {isHovered && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
          <WordCloudOverlay words={words} />
        </div>
      )}
    </div>
  );
}
