import React from "react";
import { useNavigate } from "react-router-dom";
import x11 from "./11.png";
import line7 from "./line-7.svg";
import line8 from "./line-8.svg";

export const Screen = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[1024px] relative">
        <div className="absolute w-[717px] h-[675px] top-[116px] left-[361px] bg-[#f6fff4] rounded-[15.57px] border-[2.8px] border-solid border-[#3f7d58] shadow-[0px_1.25px_1.25px_#00000040]">

          {/* X 버튼 */}
          <div
            className="absolute w-[21px] h-[21px] top-[29px] left-[662px] cursor-pointer"
            onClick={goHome}
          >
            <img className="absolute" alt="Line" src={line7} />
            <img className="absolute" alt="Line" src={line8} />
          </div>

          <div className="absolute w-[279px] top-[229px] left-[212px] font-bold text-black text-[46px] text-center">
            Good-Bye!
          </div>

          <div className="absolute w-[530px] h-[115px] top-[336px] left-[103px] text-center font-bold text-black text-[29.3px]">
            <p className="mb-2">회원탈퇴가 정상적으로 처리되었습니다.</p>
            <p>서비스를 이용해주셔서 감사합니다.</p>
          </div>

          {/* HOME 버튼 */}
          <div
            className="absolute w-[114px] h-[30px] top-[541px] left-[296px] cursor-pointer"
            onClick={goHome}
          >
            <div className="w-28 h-[30px] bg-[#5cab7c] rounded border border-black flex items-center justify-center text-white text-[12.2px] font-medium">
              HOME
            </div>
          </div>
        </div>

        {/* 로고 클릭 시 홈으로 이동 */}
        <img
          className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Logo"
          src={x11}
          onClick={goHome}
        />
      </div>
    </div>
  );
};
