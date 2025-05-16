import React from "react";

const MAX_BAR_HEIGHT = 400;

const ExpandedBarGraph = ({ data, onClose }) => {
  const baseLeft = 55;
  const gap = 70;

  if (!data || data.length === 0) {
    return (
      <div className="absolute w-[871px] h-[400px] top-0 left-0 bg-white border border-black rounded-[6px] z-50 shadow-lg flex items-center justify-center">
        <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="absolute w-[871px] h-[400px] top-0 left-0 bg-white border border-black rounded-[6px] z-50 shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-lg font-bold text-gray-700"
      >
        ×
      </button>

      <div className="absolute w-[760px] h-[3px] bg-black top-[340px] left-[55px]" />

      {data.slice(0, 10).map((item, idx) => {
        const height = (item.value / 100) * MAX_BAR_HEIGHT * 0.8;
        const top = 340 - height;
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

      {data.slice(0, 10).map((item, idx) => (
        <div
          key={`label-${item.category}`}
          className="absolute text-[12px] font-normal text-black text-center whitespace-nowrap"
          style={{
            top: "350px",
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

export { ExpandedBarGraph };
