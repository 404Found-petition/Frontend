import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const WithdrawMessage = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/withdrawal-complete");
  };

  const handleNo = () => {
    navigate("/");
  };

  return (
    <div className="bg-white w-full min-h-screen relative">
      {/* ✅ 헤더 포함 */}
      <Header />

      {/* ✅ 중앙 탈퇴 안내 박스 */}
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f6fff4] rounded-[15px] border-[2px] border-[#3f7d58] shadow-md p-10 flex flex-col items-center justify-center relative">
        {/* X 버튼 */}
        <div
          className="absolute top-4 right-5 text-[24px] font-bold text-gray-600 cursor-pointer"
          onClick={handleNo}
        >
          ×
        </div>

        {/* 타이틀 */}
        <h2 className="text-center text-[36px] font-extrabold text-[#f20707] mb-8">
          회원 탈퇴
        </h2>

        {/* 설명 텍스트 */}
        <div className="text-center text-[20px] font-semibold leading-relaxed text-black mb-10">
          <p>지금까지 작성한 모든 글들이 삭제됩니다.</p>
          <p>삭제된 글들은 복구할 수 없습니다.</p>
          <p className="mt-5 font-extrabold">
            정말로 회원탈퇴를 진행하시겠습니까?
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-12">
          <button
            onClick={handleYes}
            className="bg-[#f20707] text-white font-bold px-10 py-3 rounded border border-black text-[18px]"
          >
            YES
          </button>
          <button
            onClick={handleNo}
            className="bg-[#5cab7c] text-white font-medium px-10 py-3 rounded border border-black text-[18px]"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawMessage;

// 5.22: 회원탈퇴 경고창을 완전 페이지 전환으로 구현
// 5.22: 디자인은 WithdrawalComplete 참고하여 동일한 구조로 구현
// 5.22: 로고 제거 및 헤더 포함
// 5.22: 박스 정사각형(500x500), 글씨 및 버튼 확대, 정중앙 정렬 및 하단 여유 있게 조정



//5.17 17:28 우선 로고 삭제하고 YES 버튼 빨간색으로 수정