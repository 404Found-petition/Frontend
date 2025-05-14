// 마우스 오버 효과했을 때 전체 10개 막대그래프 다 보이도록

import React from "react";

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

const baseLeft = 111;
const gap = 70;

export const ExpandedBarGraph = ({ data, onClose }) => {
  return (
    <div
      className="fixed top-[100px] left-1/2 -translate-x-1/2 w-[871px] h-[655px] bg-[#fffcfc] border-[1.94px] border-black rounded-[6.48px] z-50 shadow-xl"
      onMouseLeave={onClose}
    >
      {/* 기준선 */}
      <div className="absolute w-[659px] h-[3.5px] bg-black top-[561px] left-[105px]" />

      {/* 막대 */}
      {data.map((item, idx) => {
        const height = (item.value / 100) * MAX_BAR_HEIGHT;
        const top = 561 - height;
        return (
          <div
            key={item.category}
            className="absolute w-[38px] border border-black rounded-[2px] transition-all duration-300"
            style={{
              height: `${height}px`,
              top: `${top}px`,
              left: `${baseLeft + idx * gap}px`,
              backgroundColor: CATEGORY_COLORS[item.category] || "#ccc"
            }}
          />
        );
      })}

      {/* 라벨 */}
      {data.map((item, idx) => (
        <div
          key={`label-${item.category}`}
          className="absolute text-[14.2px] font-normal text-black text-center whitespace-nowrap"
          style={{
            top: "579px",
            left: `${baseLeft + idx * gap}px`,
            width: "60px"
          }}
        >
          {item.category}
        </div>
      ))}
    </div>
  );
};
