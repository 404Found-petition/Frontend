// 메인 화면에 5개 항목으로 된 그래프 나타나도록, 마우스 오버 효과시 ExpandedBarGraph.jsx 호출

import React, { useState, useEffect } from "react";
import { ExpandedBarGraph } from "./ExpandedBarGraph";

const MAX_BAR_HEIGHT = 400;

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
  "기타": "#AAAAAA"
};

export const Graph = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/petition-status")
      .then(res => res.json())
      .then(responseData => {
        const processed = responseData.map(item => ({
          category: item.category,
          value: item.count,
          color: CATEGORY_COLORS[item.category] || "#ccc"
        }));
        setData(processed);
      })
      .catch(err => console.error("그래프 데이터 불러오기 실패:", err));
  }, []);

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const baseLeft = 111;
  const gap = 70;

  return (
    <>
      {/* 작은 그래프 */}
      <div
        className="w-[871px] h-[250px] relative bg-[#fffcfc] border border-black rounded-[6px] z-10"
        onMouseEnter={() => setHovered(true)}
      >
        {/* 기준선 */}
        <div className="absolute w-[659px] h-[3px] bg-black top-[210px] left-[105px]" />

        {sortedData.slice(0, 5).map((item, idx) => {
          const height = (item.value / 100) * MAX_BAR_HEIGHT * 0.5;
          const top = 210 - height;
          return (
            <div
              key={item.category}
              className="absolute w-[38px] border border-black rounded-[2px] transition-all duration-300"
              style={{
                height: `${height}px`,
                top: `${top}px`,
                left: `${baseLeft + idx * gap}px`,
                backgroundColor: item.color
              }}
            />
          );
        })}

        {/* 라벨 */}
        {sortedData.slice(0, 5).map((item, idx) => (
          <div
            key={`label-${item.category}`}
            className="absolute text-[12px] font-normal text-black text-center whitespace-nowrap"
            style={{
              top: "220px",
              left: `${baseLeft + idx * gap}px`,
              width: "60px"
            }}
          >
            {item.category}
          </div>
        ))}
      </div>

      {/* 확대 그래프 컴포넌트 */}
      {hovered && (
        <ExpandedBarGraph data={sortedData} onClose={() => setHovered(false)} />
      )}
    </>
  );
};

