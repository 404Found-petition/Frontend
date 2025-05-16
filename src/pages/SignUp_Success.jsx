import React from "react";
import x10 from "../assets/LAWGIC.png";
import image2 from "../assets/party.webp"; // ← 기존 .png 대신 .webp로 변경
import { useNavigate } from "react-router-dom";

export const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
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
            <div className="absolute w-[279px] top-0 left-0 [font-family:'Inter-Bold', Helvetica] font-bold text-black text-[45.6px] text-center tracking-[0] leading-[normal]">
              SUCCESS
            </div>

            <img
              className="absolute w-[164px] h-[164px] top-20 left-[58px] object-cover"
              alt="Image"
              src={image2}
            />
          </div>

          <div className="absolute w-[448px] top-[453px] left-32 [font-family:'Inter-Bold', Helvetica] font-bold text-black text-[29.3px] text-center tracking-[0] leading-[normal]">
            Welcome to Lawgic!
          </div>

          <div className="absolute w-[114px] h-[30px] top-[541px] left-[296px] cursor-pointer" onClick={handleGoHome}>
            <div className="relative w-28 h-[30px] bg-[#5cab7c] rounded-[3.04px] border-[0.61px] border-solid border-black">
              <div className="absolute w-[58px] top-[7px] left-[27px] [font-family:'Inter-Medium', Helvetica] font-medium text-white text-[12.2px] text-center tracking-[0] leading-[normal]">
                HOME
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[163px] h-[39px] top-8 left-[1243px]">
          <div className="absolute w-[39px] h-[39px] top-0 left-0 bg-[#93e1b3] rounded-[19.39px] border-[0.78px] border-solid border-black" />
          <div className="absolute w-[91px] top-1.5 left-[70px] [font-family:'Inter-Regular', Helvetica] font-normal text-black text-[21.1px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            LOGOUT
          </div>
        </div>

        <img
          className="absolute w-[199px] h-[65px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Element"
          src={x10}
          onClick={handleGoHome}
        />
      </div>
    </div>
  );
};
