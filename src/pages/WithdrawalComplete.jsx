import React from "react";
import { useNavigate } from "react-router-dom";

export const WithdrawalComplete = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white w-full min-h-screen flex items-start justify-center pt-[80px]">
      <div className="w-[500px] h-[500px] bg-[#f6fff4] rounded-[15px] border-[2px] border-[#3f7d58] shadow-md p-10 relative flex flex-col items-center justify-center">
        {/* X 버튼 */}
        <div
          className="absolute top-4 right-5 text-[24px] font-bold text-gray-600 cursor-pointer"
          onClick={goHome}
        >
          ×
        </div>

        <h2 className="text-[42px] font-extrabold text-black text-center mb-8">
          Good-Bye!
        </h2>

        <div className="text-[22px] font-bold text-center text-black mb-10 leading-relaxed">
          <p className="mb-2">회원탈퇴가 정상적으로 처리되었습니다.</p>
          <p>서비스를 이용해주셔서 감사합니다.</p>
        </div>

        <button
          className="w-[114px] h-[40px] bg-[#5cab7c] rounded border border-black flex items-center justify-center text-white text-[14px] font-medium cursor-pointer"
          onClick={goHome}
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default WithdrawalComplete;

//5.17 21:25 컴포넌트 이름 수정 Screen->WithdrawalComplete