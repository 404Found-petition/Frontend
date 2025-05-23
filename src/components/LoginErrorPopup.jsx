// LoginErrorPopup.jsx
import React from "react";

const LoginErrorPopup = ({ onClose }) => {
  return (
    <div className="w-[315px] h-40 bg-[#f6fff4] border-[1.7px] border-black rounded-[5.67px] relative shadow z-20">
      {/* X 닫기 버튼 (텍스트 방식으로 변경됨) */}
      <div
        className="absolute top-3 left-[279px] text-[20px] font-bold text-gray-600 cursor-pointer"
        onClick={onClose}
      >
        ×
      </div>

      {/* WRONG 텍스트 */}
      <div className="absolute top-[26px] left-[102px] text-[#f20707] text-[21.9px] font-semibold text-center whitespace-nowrap">
        WRONG
      </div>

      {/* 안내 메시지 */}
      <div className="absolute top-[67px] left-5 w-[274px] text-[21.9px] font-semibold text-black text-center leading-[normal]">
        아이디나 비밀번호를
        <br />
        다시 확인하세요
      </div>
    </div>
  );
};

export default LoginErrorPopup;


// 5.15 5:42 이미지 없애고 x자 수정
//5.15 21:22 피그마 디자인대로 anima 코드 기반으로 디자인 고정
//5.15 21:29 진짜 x자로 수정함