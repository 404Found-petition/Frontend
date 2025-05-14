import React from "react";
import { useNavigate } from "react-router-dom";
import x9 from "./9.png";
import line5 from "./line-5.svg";
import line6 from "./line-6.svg";

export const Screen = () => {
  const navigate = useNavigate();

  const handleDuplicateCheck = () => {
    // 백엔드랑 연결해서 중복확인 필요
    console.log("중복 확인 요청");
  };

  const handleSubmit = () => {
    // 회원가입 완료 후 성공 페이지로 이동
    navigate("/success");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[750px] h-[706px] top-[116px] left-[345px] bg-[#f6fff4] rounded-[16.3px] border-[2.93px] border-solid border-[#3f7d58] shadow-[0px_1.3px_1.3px_#00000040]">
          {/* 이름 */}
          <div className="absolute w-[321px] h-16 top-[166px] left-[213px]">
            <div className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded-[3.1px] border border-black" />
            <div className="absolute top-0 left-0 text-[12.4px]">이름</div>
          </div>

          {/* 아이디 + 중복확인 */}
          <div className="absolute w-[321px] h-16 top-[257px] left-[216px]">
            <div className="absolute w-[321px] h-16 top-0 left-0">
              <div className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black" />
              <div className="absolute top-0 left-0 text-[12.4px]">아이디</div>
            </div>
            <button
              onClick={handleDuplicateCheck}
              className="absolute w-[69px] h-[31px] top-[27px] left-[246px] bg-[#d9d9d9] rounded border border-black text-[9.9px]"
            >
              중복 확인
            </button>
          </div>

          {/* 비밀번호 */}
          <div className="absolute w-[321px] h-16 top-[343px] left-[213px]">
            <div className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black" />
            <div className="absolute top-0 left-0 text-[12.4px]">비밀번호</div>
          </div>

          {/* 비밀번호 재확인 */}
          <div className="absolute w-[321px] h-16 top-[432px] left-[213px]">
            <div className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black" />
            <div className="absolute top-0 left-0 text-[12.4px]">비밀번호 재확인</div>
          </div>

          {/* 핸드폰 번호 */}
          <div className="absolute w-[321px] h-16 top-[521px] left-[213px]">
            <div className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black" />
            <div className="absolute top-0 left-0 text-[12.4px]">핸드폰 번호</div>
          </div>

          {/* DONE 버튼 */}
          <button
            onClick={handleSubmit}
            className="absolute w-[115px] h-[31px] top-[624px] left-[315px] bg-[#5cab7c] text-white text-[12.4px] rounded border border-black"
          >
            DONE
          </button>

          {/* 상단 제목 */}
          <div className="absolute w-60 top-[67px] left-[252px] text-[46.6px] font-bold text-center">
            Sign Up
          </div>

          {/* 닫기 (X) 버튼 */}
          <div
            className="absolute w-[22px] h-[21px] top-[37px] left-[685px] cursor-pointer"
            onClick={handleClose}
          >
            <img className="absolute" alt="닫기" src={line5} />
            <img className="absolute" alt="닫기" src={line6} />
          </div>
        </div>

        {/* 로고 */}
        <img
          className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Logo"
          src={x9}
          onClick={handleClose}
        />
      </div>
    </div>
  );
};
