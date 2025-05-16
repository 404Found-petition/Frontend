import React from "react";

const IdDuplicatePopup = ({ onClose }) => {
  return (
    <div className="w-[315px] h-[160px] bg-[#f6fff4] border-[1.7px] border-black rounded-[5.67px] shadow-md relative z-50">
      {/* X 닫기 */}
      <div
        className="absolute top-3 left-[279px] text-[20px] font-bold text-gray-600 cursor-pointer"
        onClick={onClose}
      >
        ×
      </div>

      {/* WRONG */}
      <div className="absolute top-[18px] left-[102px] text-[#f20707] text-[21.9px] font-semibold text-center whitespace-nowrap">
        WRONG
      </div>

      {/* 메시지 */}
      <div className="absolute top-[59px] left-5 w-[274px] text-[21.9px] font-semibold text-black text-center leading-[normal]">
        이미 존재하는 아이디입니다.<br />
        다른 아이디를 입력하고<br />
        다시 확인해주세요.
      </div>
    </div>
  );
};

export default IdDuplicatePopup;

//5.13 1:41 생성