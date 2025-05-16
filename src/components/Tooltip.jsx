import React from "react";

export const Tooltip = ({
  name,
  party,
  tags,
  bills,
  imageSrc,
  position
}) => {
  if (!position) return null;

  // ✅ undefined 대비 안전 처리
  const safeTags = Array.isArray(tags) ? tags : [];
  const safeBills = Array.isArray(bills) ? bills : [];

  return (
    <div
      className="absolute z-50 bg-white border border-gray-300 rounded-[16px] p-4 shadow-xl w-[400px] h-[250px] flex items-start"
      style={{ top: position.top, left: position.left }}
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex-1">
        <p className="text-xl font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{party}</p>

        <div className="mt-2 text-sm text-[#5cab7c]">
          {safeTags.map((tag, idx) => (
            <span key={idx} className="mr-1">#{tag}</span>
          ))}
        </div>

        <ul className="mt-3 list-disc list-inside text-[14px] text-gray-700 space-y-1">
          {safeBills.slice(0, 3).map((bill, idx) => (
            <li key={idx}>{bill}</li>
          ))}
        </ul>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div className="w-[70px] h-[70px] bg-gray-200 ml-4 rounded-md overflow-hidden">
        <img
          src={imageSrc || "/images/placeholder.png"}
          alt="의원 이미지"
          className="w-full h-full object-cover border"
        />
      </div>
    </div>
  );
};
