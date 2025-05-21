import React from "react";

const IdCheckRequiredPopup = ({ onClose }) => {
  return (
    <div className="w-[315px] h-[160px] bg-[#f6fff4] border-[1.7px] border-black rounded-[5.67px] shadow-md relative z-50">
      {/* X 닫기 버튼 */}
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
        아이디 중복여부를<br />
        확인하지 않았습니다.
      </div>
    </div>
  );
};

export default IdCheckRequiredPopup;

// 5.17 14:45 아이디 중복 확인 안 하고 그냥 SUBMIT 눌렀을 시 안내창 생성