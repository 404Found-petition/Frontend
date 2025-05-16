import React from "react";

const PasswordMismatchPopup = ({ onClose }) => {
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
        입력한 비밀번호와 비밀번호<br />
        확인이 일치하지 않습니다.
      </div>
    </div>
  );
};

export default PasswordMismatchPopup;


//5.16 12:25 