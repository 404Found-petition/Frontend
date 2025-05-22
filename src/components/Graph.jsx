import React, { useState, useEffect } from "react";
import { ExpandedBarGraph } from "./ExpandedBarGraph";
import { API_BASE_URL } from "../config";

// ✅ 시각적으로 격차가 확실히 느껴지도록 바 높이 설정
const MAX_BAR_HEIGHT = 30; 

const CATEGORY_COLORS = {
  "정치·행정": "#70B7FF",
  "사회": "#B1FF9A",
  "경제·산업": "#F2B856",
  "교육": "#FFF12B",
  "환경": "#42D583",
  "교통·건설": "#F9A3D4",
  "보건·의료": "#FF5A4E",
  "문화·예술": "#CBA0FF",
  "과학·기술": "#33E4FF",
  "국방·외교": "#538F2D",
  "기타": "#AAAAAA",
};

const Graph = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/statistics/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 받아온 API 데이터:", data); // ✅ 추가
        const processed = data.map(item => ({
          category: item.분야,
          value: item.청원수,
          color: item.색상,
        }));
        setData(processed);
      });
  }, []);

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // ✅ scale 제거했으므로 모든 값은 실제 px로 조정
  const barWidth = 40;          // scale 0.444로 줄였던 실제 크기
  const baseLeft = 49;          // base 위치 조정
  const gap = 60;               // 막대 간 간격

  return (
    <>
      {/* 외부 박스: 고정 크기 */}
      <div
        className="w-[400px] h-[400px] relative bg-[#fffcfc] border border-gray-300 rounded-[6px] z-10 cursor-pointer shadow-md overflow-hidden"
        onClick={() => setHovered(true)}
      >
        {/* 내부 그래프 */}
        <div
          className="absolute"
          style={{
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)", // ✅ scale 제거
            width: "387px",
            height: "250px",
          }}
        >
          {/* 기준선 */}
          <div className="absolute w-[292px] h-[2.5px] bg-black top-[210px] left-[47px]" />

          {/* 막대 그래프 */}
          {sortedData.slice(0, 5).map((item, idx) => {
            const height = Math.pow(item.value / 100, 1.0) * MAX_BAR_HEIGHT;
            const top = 210 - height;
            return (
              <div
                key={item.category}
                className="absolute border border-black rounded-[2px] transition-all duration-300"
                style={{
                  width: `${barWidth}px`,
                  height: `${height}px`,
                  top: `${top}px`,
                  left: `${baseLeft + idx * gap}px`,
                  backgroundColor: item.color,
                }}
              />
            );
          })}

          {/* 라벨 */}
          {sortedData.slice(0, 5).map((item, idx) => (
            <div
              key={`label-${item.category}`}
              className="absolute text-[11px] font-semibold text-black text-center whitespace-nowrap"
              style={{
                top: "220px",
                left: `${baseLeft + idx * gap + barWidth / 2}px`,
                transform: "translateX(-50%)",
              }}
            >
              {item.category}
            </div>
          ))}
        </div>
      </div>

      {/* 확대 그래프 */}
      {hovered && (
        <ExpandedBarGraph data={sortedData} onClose={() => setHovered(false)} />
      )}
    </>
  );
};

export default Graph;
