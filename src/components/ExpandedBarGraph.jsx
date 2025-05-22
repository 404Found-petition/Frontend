import React from "react";

const MAX_BAR_HEIGHT = 55;

const ExpandedBarGraph = ({ data, onClose }) => {
  const baseLeft = 55;
  const gap = 60;

  if (!data || data.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded shadow-2xl border border-gray-400 w-[700px] h-[550px] flex items-center justify-center">
          <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
          <button
            onClick={onClose}
            className="absolute text-lg font-bold text-gray-700 top-2 right-2 hover:text-black"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-2xl border border-gray-400 w-[700px] h-[550px]">
        <button
          onClick={onClose}
          className="absolute text-lg font-bold text-gray-700 top-2 right-2 hover:text-black"
        >
          ×
        </button>

        <div className="absolute w-[600px] h-[3px] bg-black top-[400px] left-[50px]" />

        {data.slice(0, 10).map((item, idx) => {
          const height = (item.value / 100) * MAX_BAR_HEIGHT * 0.8;
          const top = 400 - height;
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
              top: "410px",
              left: `${baseLeft + idx * gap + 19}px`,  // 38px 막대 너비의 절반
              transform: "translateX(-50%)",          // 가운데 정렬
            }}
          >
            {item.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ExpandedBarGraph };
