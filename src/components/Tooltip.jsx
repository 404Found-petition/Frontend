import React from "react";
import { API_BASE_URL } from "../config"; // 🔹 백엔드 주소 설정

export const Tooltip = ({
  name,
  party,
  tags,
  bills,
  imageSrc,
  position
}) => {
  if (!position) return null;

  // ✅ 안전 처리
  const safeTags = Array.isArray(tags) ? tags : [];
  const safeBills = Array.isArray(bills) ? bills : [];

  // ✅ 디버깅 로그
  console.log("🟢 Tooltip props:", { name, imageSrc, bills });

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

        {/* ✅ 법률안 목록 */}
        <ul
          className="mt-3 list-disc list-inside text-gray-700 space-y-1"
          style={{
            fontSize: "13px",           // 글자 1px 작게
            maxWidth: "280px",         // 오른쪽 사진 침범 방지
            overflowWrap: "break-word" // 너무 긴 단어 줄바꿈
          }}
        >
          {safeBills.slice(0, 3).map((bill, idx) => {
            const text = typeof bill === "string" ? bill : bill?.title;
            return <li key={idx}>{text}</li>;
          })}
        </ul>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div
        className="ml-4 rounded-md overflow-hidden"
        style={{
          width: "84px",    // ✅ 1.6배 확대 (원래 70px)
          height: "112px",  // ✅ 증명사진 비율 3:4
          flexShrink: 0,
          backgroundColor: "#e5e5e5"
        }}
      >
        <img
          src={
            imageSrc
              ? (imageSrc.startsWith("http") ? imageSrc : `${API_BASE_URL}${imageSrc}`)
              : "/images/placeholder.png"
          }
          alt="의원 이미지"
          className="w-full h-full object-cover border"
        />
      </div>
    </div>
  );
};
