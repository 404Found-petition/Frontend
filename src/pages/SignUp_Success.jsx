import React from "react";
import { useNavigate } from "react-router-dom";
import image2 from "../assets/party.webp"; // 🎉 축하 이미지
import Header from "../components/Header"; // ✅ 공통 헤더 적용

export const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      {/* ✅ 공통 헤더 */}
      <Header isCompactPage={true} />

      {/* ✅ SUCCESS 창 */}
      <div className="w-[717px] h-[675px] mt-[60px] bg-[#f6fff4] rounded-[15.57px] border-[2.8px] border-solid border-[#5cab7c] shadow-[0px_1.25px_1.25px_#00000040] relative">
        
        {/* X 버튼 */}
        <div
          className="absolute top-[29px] left-[662px] text-[21px] font-bold text-gray-600 cursor-pointer"
          onClick={handleGoHome}
        >
          ×
        </div>

        {/* SUCCESS + 폭죽 이미지 (기존 위치 유지) */}
        <div className="absolute w-[279px] h-[244px] top-44 left-[219px]">
          <div className="absolute w-[279px] top-0 left-0 font-bold text-black text-[45.6px] text-center">
            SUCCESS
          </div>
          <img
            className="absolute w-[164px] h-[164px] top-20 left-[58px] object-cover"
            alt="축하 이미지"
            src={image2}
          />
        </div>

        {/* 환영 메시지 */}
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
    </div>
  );
};

export default SignUpSuccess;


//5.18 1:22 프로필 누르면 UserPage, 로그아웃 누르면 로그아웃 되도록