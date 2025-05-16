import React, { useState, useEffect } from "react";
import { ExpandedBarGraph } from "./ExpandedBarGraph";

const MAX_BAR_HEIGHT = 400;

const CATEGORY_COLORS = {
  "정치·행정": "#70B7FF",
  "사회": "#B1FF9A",
  "경제·산업": "#F2B856",
  "교육": "#FFF12B",
  "환경": "#42D583",
  "기타": "#AAAAAA"
};

const Graph = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ 백 연결 전이라 mock 데이터 삽입
    const mockData = [
      { category: "정치·행정", count: 40 },
      { category: "사회", count: 32 },
      { category: "경제·산업", count: 25 },
      { category: "교육", count: 20 },
      { category: "환경", count: 15 },
    ];

    const processed = mockData.map(item => ({
      category: item.category,
      value: item.count,
      color: CATEGORY_COLORS[item.category] || "#ccc"
    }));

    setData(processed);
  }, []);

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const baseLeft = 111;
  const gap = 70;

  return (
    <>
      <div
        className="w-[871px] h-[250px] relative bg-[#fffcfc] border border-black rounded-[6px] z-10"
        onMouseEnter={() => setHovered(true)}
      >
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

      {hovered && (
        <ExpandedBarGraph data={sortedData} onClose={() => setHovered(false)} />
      )}
    </>
  );
};

export default Graph;
