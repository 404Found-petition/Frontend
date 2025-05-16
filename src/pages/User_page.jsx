import React, { useState } from "react";
import x8 from "../assets/LAWGIC.png";
import { DivWrapper } from "./DivWrapper";
import { Group } from "./Group";
import { GroupWrapper } from "./GroupWrapper";
import { OverlapGroupWrapper } from "./OverlapGroupWrapper";
import { OverlapWrapper } from "./OverlapWrapper";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Box } from "../components/View";

// ✅ 원형 퍼센트 그래프 컴포넌트 추가
const CircularPercent = ({ percentage }) => {
  const radius = 30;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <svg height="76" width="76">
      <circle
        stroke="#E5E5E5"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx="38"
        cy="38"
      />
      <circle
        stroke="#5cab7c"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx="38"
        cy="38"
      />
      <text
        x="38"
        y="42"
        textAnchor="middle"
        fontSize="14"
        fill="black"
        fontWeight="bold"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export const User = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
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

        <div className="w-[47px] top-[364px] left-[635px] text-black text-[40px] text-center absolute cursor-pointer" onClick={() => navigate("/posts/history")}>...</div>
        <div className="w-[47px] top-[364px] left-[1330px] text-black text-[40px] text-center absolute cursor-pointer" onClick={() => navigate("/petitions/history")}>...</div>

        <div className="absolute w-[157px] h-[157px] top-[140px] left-[92px] bg-[#93e1b3] rounded-full border-[3.14px] border-black" />

        <div className="absolute w-[139px] h-[37px] top-[134px] left-[558px] cursor-pointer" onClick={() => navigate("/edit-user")}>...
        </div>
        <div className="absolute w-[139px] h-[37px] top-[134px] left-[721px] cursor-pointer" onClick={() => navigate("/withdraw")}>...
        </div>

        {/* ✅ 게시글/청원 기록 카드 영역 */}
        <div className="absolute w-[1400px] h-[373px] top-[454px] left-[92px]">
          <Group />
          <OverlapWrapper />
          <OverlapGroupWrapper />
          <GroupWrapper />
          <DivWrapper />

          {/* ✅ 퍼센트 카드 1 */}
          <div className="absolute top-[18px] left-[1171px]">
            <CircularPercent percentage={92} />
          </div>

          {/* ✅ 퍼센트 카드 2 */}
          <div className="absolute top-[143px] left-[1171px]">
            <CircularPercent percentage={92} />
          </div>

          {/* ✅ 퍼센트 카드 3 */}
          <div className="absolute top-[266px] left-[1171px]">
            <CircularPercent percentage={92} />
          </div>
        </div>

        <div className="absolute w-[76px] top-[37px] left-[1313px] text-black text-[21.1px] text-center cursor-pointer" onClick={() => setShowLogoutPopup(true)}>Logout</div>

        <img className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover cursor-pointer" alt="Element" src={x8} onClick={() => navigate("/")} />

        {showLogoutPopup && (
          <Box onCancel={() => setShowLogoutPopup(false)} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};
