import React from "react";
import closeX1 from "../assets/image.svg";
import closeX2 from "../assets/line-6-2.svg";

const LoginErrorPopup = ({ onClose }) => {
  return (
    <div className="absolute top-[180px] left-[100px] w-[315px] h-[160px] bg-[#f6fff4] border border-black rounded shadow-md z-10">
      <div className="text-red-600 text-xl font-semibold text-center mt-4">WRONG</div>
      <div className="text-center mt-2 text-lg font-semibold">
        아이디나 비밀번호를
        <br />
        다시 확인하세요
      </div>
      <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
        <img src={closeX1} alt="닫기" className="absolute" />
        <img src={closeX2} alt="닫기" className="absolute" />
      </div>
    </div>
  );
};

export default LoginErrorPopup;
