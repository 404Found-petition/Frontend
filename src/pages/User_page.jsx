import React, { useState } from "react";
import x8 from "./8.png";
import { DivWrapper } from "./DivWrapper";
import { Group } from "./Group";
import { GroupWrapper } from "./GroupWrapper";
import { OverlapGroupWrapper } from "./OverlapGroupWrapper";
import { OverlapWrapper } from "./OverlapWrapper";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Box } from "../components/View"; // ✅ 팝업 컴포넌트

export const User = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // ✅ 팝업 상태

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ✅ 토큰 삭제
    navigate("/"); // ✅ 메인 이동
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <Header />
      <div className="bg-white overflow-hidden w-[1440px] h-[1024px] relative">
        <div className="absolute w-[179px] top-[126px] left-[303px] text-black text-[40.3px] text-center">USER_ID</div>
        <div className="absolute w-[121px] top-[206px] left-[570px] text-black text-4xl text-center">김땡땡</div>

        <div className="absolute w-[535px] h-[49px] top-[261px] left-[306px]">
          <div className="absolute w-[271px] top-0 left-[264px] text-black text-4xl">010-1234-5678</div>
          <div className="absolute w-[284px] top-1 left-0 text-[#444444] text-[32px] whitespace-nowrap">Phone number</div>
        </div>

        <div className="absolute w-[95px] top-[206px] left-[306px] text-[#444444] text-[32px] whitespace-nowrap">NAME</div>

        <div className="absolute w-[264px] top-96 left-[92px] text-[#444444] text-[32px] whitespace-nowrap">내가 작성한 게시글</div>
        <p className="w-[413px] top-96 left-[780px] text-[#444444] text-[32px] absolute whitespace-nowrap">청원 이행 확률 예측 사용기록</p>

        <div className="absolute w-[157px] h-[157px] top-[140px] left-[92px] bg-[#93e1b3] rounded-full border-[3.14px] border-black" />

        {/* 회원정보 수정하기 */}
        <div className="absolute w-[139px] h-[37px] top-[134px] left-[558px] cursor-pointer" onClick={() => navigate("/edit-user")}>
          <div className="w-full h-full bg-[#5cab7c] rounded-[9.31px] border border-black flex justify-center items-center">
            <div className="text-white text-[14.9px] font-semibold">회원정보 수정하기</div>
          </div>
        </div>

        {/* 탈퇴하기 */}
        <div className="absolute w-[139px] h-[37px] top-[134px] left-[721px] cursor-pointer" onClick={() => navigate("/withdraw")}>
          <div className="w-full h-full bg-[#f20707] rounded-[9.31px] border border-black flex justify-center items-center">
            <div className="text-white text-[14.9px] font-semibold">탈퇴하기</div>
          </div>
        </div>

        {/* 게시글/청원 기록 카드 */}
        <div className="absolute w-[1400px] h-[373px] top-[454px] left-[92px]">
          <Group />
          <OverlapWrapper />
          <OverlapGroupWrapper />
          <GroupWrapper />
          <DivWrapper />
          <div className="absolute w-[78px] h-[76px] top-[18px] left-[1171px]">
            <div className="w-full h-full bg-[url(/ellipse-22.svg)] bg-cover">
              <div className="text-black text-[16.8px] text-center mt-[29px] ml-[14px]">92%</div>
            </div>
          </div>

          <div className="absolute h-[199px] top-[143px] left-[1171px] w-[78px]">
            <div className="absolute w-[76px] h-[76px] top-0 left-0 bg-[url(/image.svg)] bg-cover">
              <div className="text-black text-[16.8px] text-center mt-[29px] ml-[14px]">92%</div>
            </div>
            <div className="absolute top-[123px] left-0 w-[76px] h-[76px] bg-[url(/ellipse-22-2.svg)] bg-cover">
              <div className="text-black text-[16.8px] text-center mt-[29px] ml-[14px]">92%</div>
            </div>
          </div>
        </div>

        {/* Logout 텍스트 → 팝업 열기 */}
        <div
          className="absolute w-[76px] top-[37px] left-[1313px] text-black text-[21.1px] text-center cursor-pointer"
          onClick={() => setShowLogoutPopup(true)}
        >
          Logout
        </div>

        {/* 로고 클릭 → 홈 이동 */}
        <img
          className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Element"
          src={x8}
          onClick={() => navigate("/")}
        />

        {/* ✅ 팝업 박스 컴포넌트 삽입 */}
        {showLogoutPopup && (
          <Box
            onCancel={() => setShowLogoutPopup(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};
