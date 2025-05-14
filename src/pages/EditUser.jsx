import React from "react";
import x9 from "./9.png";
import line5 from "./line-5.svg";
import line6 from "./line-6.svg";


export const Screen = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[750px] h-[706px] top-[116px] left-[345px] bg-[#f6fff4] rounded-[16.3px] border-[2.93px] border-solid border-[#3f7d58] shadow-[0px_1.3px_1.3px_#00000040]">
          <div className="absolute w-[329px] h-[66px] top-[438px] left-[212px]">
            <div className="absolute w-[329px] h-[66px] top-0 left-0">
              <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border-[0.64px] border-solid border-black" />

              <div className="absolute w-[95px] top-0 left-0 [font-family:'NanumSquareOTF-Regular',Helvetica] font-normal text-black text-[12.7px] tracking-[0] leading-[normal] whitespace-nowrap">
                비밀번호 재확인
              </div>
            </div>

            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#6b6b6b] text-[17.5px] tracking-[0] leading-[normal]">
              Re Password
            </div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[529px] left-[212px]">
            <div className="absolute w-[329px] h-[66px] top-0 left-0">
              <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border-[0.64px] border-solid border-black" />

              <div className="absolute w-[95px] top-0 left-0 [font-family:'NanumSquareOTF-Regular',Helvetica] font-normal text-black text-[12.7px] tracking-[0] leading-[normal] whitespace-nowrap">
                핸드폰 번호
              </div>
            </div>

            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[17.5px] tracking-[0] leading-[normal]">
              Phone_number
            </div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-64 left-[212px]">
            <div className="absolute w-[329px] h-[66px] top-0 left-0">
              <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#cecece] rounded-[3.18px] border-[0.64px] border-solid border-black" />

              <div className="w-10 top-0 left-0 [font-family:'NanumSquareOTF-Regular',Helvetica] font-normal text-[12.7px] whitespace-nowrap absolute text-black tracking-[0] leading-[normal]">
                아이디
              </div>
            </div>

            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[17.5px] tracking-[0] leading-[normal]">
              User_ID
            </div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[347px] left-[212px]">
            <div className="absolute w-[329px] h-[66px] top-0 left-0">
              <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border-[0.64px] border-solid border-black" />

              <div className="w-12 top-0 left-0 [font-family:'NanumSquareOTF-Regular',Helvetica] font-normal text-[12.7px] whitespace-nowrap absolute text-black tracking-[0] leading-[normal]">
                비밀번호
              </div>
            </div>

            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#6b6b6b] text-[17.5px] tracking-[0] leading-[normal]">
              Password
            </div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[165px] left-[212px]">
            <div className="absolute w-[329px] h-[66px] top-0 left-0">
              <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border-[0.64px] border-solid border-black" />

              <div className="w-[34px] top-0 left-0 [font-family:'NanumSquareOTF-Regular',Helvetica] font-normal text-[12.7px] whitespace-nowrap absolute text-black tracking-[0] leading-[normal]">
                이름
              </div>
            </div>

            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[17.5px] tracking-[0] leading-[normal]">
              Name
            </div>
          </div>

          <div className="absolute w-[119px] h-[31px] top-[632px] left-[313px]">
            <div className="relative w-[117px] h-[31px] bg-[#5cab7c] rounded-[3.18px] border-[0.64px] border-solid border-black">
              <div className="absolute w-[60px] top-[7px] left-7 [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[12.7px] text-center tracking-[0] leading-[normal]">
                Modify
              </div>
            </div>
          </div>

          <div className="w-[286px] top-[63px] left-[228px] [font-family:'Inter-Bold',Helvetica] font-bold text-[48.1px] text-center absolute text-black tracking-[0] leading-[normal]">
            회원정보 수정
          </div>

          <div className="absolute w-[22px] h-[22px] top-[30px] left-[693px]">
            <img
              className="left-px absolute w-[22px] h-[22px] top-0"
              alt="Line"
              src={line5}
            />

            <img
              className="left-0 absolute w-[22px] h-[22px] top-0"
              alt="Line"
              src={line6}
            />
          </div>
        </div>

        <img
          className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover"
          alt="Element"
          src={x9}
        />
      </div>
    </div>
  );
};
