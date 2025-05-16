import React from "react";
import { useNavigate } from "react-router-dom";
import x10 from "../assets/LAWGIC.png";

export const Screen = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/withdrawal-complete");
  };

  const handleNo = () => {
    navigate("/user");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[717px] h-[675px] top-[116px] left-[361px] bg-[#f6fff4] rounded-[15.57px] border-[2.8px] border-solid border-[#3f7d58] shadow-[0px_1.25px_1.25px_#00000040]">

          {/* X 버튼 (텍스트 ×로 대체) */}
          <div
            className="absolute top-[29px] left-[662px] text-[21px] font-bold text-gray-600 cursor-pointer"
            onClick={handleNo}
          >
            ×
          </div>

          {/* 안내 텍스트 */}
          <div className="absolute w-[519px] h-[367px] top-[178px] left-[98px]">
            <div className="absolute w-[217px] h-10 top-0 left-[151px] font-extrabold text-[#f20707] text-[46px] text-center">
              회원탈퇴
            </div>

            <div className="flex flex-col absolute w-[519px] top-[60px] left-0 text-center text-[29.3px] font-extrabold text-black">
              <p>지금까지 작성한 모든 글들이 삭제됩니다.</p>
              <p>삭제된 글들은 복구할 수 없습니다.</p>
              <p>정말로 회원탈퇴를 진행하시겠습니까?</p>
            </div>
          </div>

          {/* NO 버튼 */}
          <div
            className="left-[427px] absolute w-[114px] h-[30px] top-[548px] cursor-pointer"
            onClick={handleNo}
          >
            <div className="w-28 h-[30px] bg-[#5cab7c] rounded border border-black flex items-center justify-center text-white text-[12.2px] font-medium">
              NO
            </div>
          </div>

          {/* YES 버튼 */}
          <div
            className="left-[181px] absolute w-[114px] h-[30px] top-[548px] cursor-pointer"
            onClick={handleYes}
          >
            <div className="w-28 h-[30px] bg-[#120707] rounded border border-black flex items-center justify-center text-white text-[12.2px] font-extrabold">
              YES
            </div>
          </div>
        </div>

        {/* 로고 클릭 시 홈으로 이동 */}
        <img
          className="absolute w-[199px] h-[66px] top-[19px] left-[35px] object-cover cursor-pointer"
          alt="Logo"
          src={x10}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};