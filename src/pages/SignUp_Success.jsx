import React from "react";
import { useNavigate } from "react-router-dom";
import x10 from "../assets/LAWGIC.png";
import image2 from "../assets/party.webp"; // 🎉 프로필 이미지

export const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // access 토큰 제거
    localStorage.removeItem("refreshToken"); // 필요 시 refresh도 제거
    navigate("/");
  };

  const goToUserPage = () => {
    navigate("/user");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[717px] h-[675px] top-[116px] left-[361px] bg-[#f6fff4] rounded-[15.57px] border-[2.8px] border-solid border-[#5cab7c] shadow-[0px_1.25px_1.25px_#00000040]">
          {/* X 버튼 */}
          <div
            className="absolute top-[29px] left-[662px] text-[21px] font-bold text-gray-600 cursor-pointer"
            onClick={handleGoHome}
          >
            ×
          </div>

          <div className="absolute w-[279px] h-[244px] top-44 left-[219px]">
            <div className="absolute w-[279px] top-0 left-0 font-bold text-black text-[45.6px] text-center">
              SUCCESS
            </div>

            <img
              className="absolute w-[164px] h-[164px] top-20 left-[58px] object-cover"
              alt="Profile"
              src={image2}
            />
          </div>

          <div className="absolute w-[448px] top-[453px] left-32 font-bold text-black text-[29.3px] text-center">
            Welcome to Lawgic!
          </div>

          {/* HOME 버튼 */}
          <div
            className="absolute w-[114px] h-[30px] top-[541px] left-[296px] cursor-pointer"
            onClick={handleGoHome}
          >
            <div className="relative w-28 h-[30px] bg-[#5cab7c] rounded-[3.04px] border border-black flex items-center justify-center">
              <div className="text-white text-[12.2px] font-medium">HOME</div>
            </div>
          </div>
        </div>

        {/* 프로필 + Logout */}
        <div className="absolute w-[163px] h-[39px] top-8 left-[1243px] flex items-center space-x-4">
          {/* 프로필 (클릭 시 유저 페이지 이동) */}
          <div
            className="w-[39px] h-[39px] bg-[#93e1b3] rounded-full border border-black cursor-pointer"
            onClick={goToUserPage}
          />
          {/* Logout 텍스트 (클릭 시 로그아웃) */}
          <div
            className="text-black text-[21.1px] text-center cursor-pointer"
            onClick={handleLogout}
          >
            LOGOUT
          </div>
        </div>

        {/* 로고 (홈 이동) */}
        <img
          className="absolute w-[199px] h-[65px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Logo"
          src={x10}
          onClick={handleGoHome}
        />
      </div>
    </div>
  );
};

export default SignUpSuccess;

//5.18 1:22 프로필 누르면 UserPage, 로그아웃 누르면 로그아웃 되도록