import React from "react";
import x9 from "../assets/LAWGIC.png";
import { useNavigate } from "react-router-dom";

export const EditUserInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[750px] h-[706px] top-[116px] left-[345px] bg-[#f6fff4] rounded-[16.3px] border-[2.93px] border-solid border-[#3f7d58] shadow-[0px_1.3px_1.3px_#00000040]">
          {/* X 버튼 (텍스트로 대체, 클릭 시 유저페이지 이동) */}
          <div
            className="absolute top-[30px] left-[693px] text-[22px] font-bold text-gray-600 cursor-pointer select-none"
            onClick={() => navigate("/user")}
          >
            ×
          </div>

          <div className="w-[286px] top-[63px] left-[228px] [font-family:'Inter-Bold',Helvetica] font-bold text-[48.1px] text-center absolute text-black tracking-[0] leading-[normal]">
            회원정보 수정
          </div>

          <div className="absolute w-[329px] h-[66px] top-64 left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#cecece] rounded-[3.18px] border-[0.64px] border-solid border-black" />
            <div className="w-10 top-0 left-0 absolute text-black text-[12.7px]">아이디</div>
            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] text-black text-[17.5px]">User_ID</div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[165px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">이름</div>
            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] text-black text-[17.5px]">Name</div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[347px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">비밀번호</div>
            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] text-[#6b6b6b] text-[17.5px]">Password</div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[438px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">비밀번호 재확인</div>
            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] text-[#6b6b6b] text-[17.5px]">Re Password</div>
          </div>

          <div className="absolute w-[329px] h-[66px] top-[529px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">핸드폰 번호</div>
            <div className="absolute w-[157px] h-8 top-[27px] left-[13px] text-black text-[17.5px]">Phone_number</div>
          </div>

          <div className="absolute w-[119px] h-[31px] top-[632px] left-[313px]">
            <div className="relative w-[117px] h-[31px] bg-[#5cab7c] rounded-[3.18px] border border-black">
              <div className="absolute w-[60px] top-[7px] left-7 text-white text-[12.7px] text-center">
                Modify
              </div>
            </div>
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
