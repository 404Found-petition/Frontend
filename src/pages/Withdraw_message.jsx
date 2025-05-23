import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ API 주소 추가

export const WithdrawMessage = () => {
  const navigate = useNavigate();

  const handleYes = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      await axios.delete(`${API_BASE_URL}/api/delete-account/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/withdrawal-complete");
    } catch (error) {
      console.error("❌ 회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNo = () => {
    navigate("/");
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center">
      <div className="mt-[130px] w-[500px] h-[500px] bg-[#f6fff4] rounded-[15px] border-[2px] border-[#3f7d58] shadow-md p-10 relative flex flex-col items-center justify-center">
        {/* X 버튼 */}
        <div
          className="absolute top-4 right-5 text-[24px] font-bold text-gray-600 cursor-pointer"
          onClick={handleNo}
        >
          ×
        </div>

        <h2 className="text-[36px] font-extrabold text-[#f20707] text-center mb-6">
          회원 탈퇴
        </h2>

        <div className="text-[20px] font-semibold text-center text-black mb-10 leading-relaxed">
          <p>지금까지 작성한 모든 글들이 삭제됩니다.</p>
          <p>삭제된 글들은 복구할 수 없습니다.</p>
          <p className="mt-4 font-extrabold">
            정말로 회원탈퇴를 진행하시겠습니까?
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <button
            onClick={handleYes}
            className="w-[100px] h-[45px] bg-[#f20707] text-white text-[16px] font-bold rounded border border-black"
          >
            YES
          </button>
          <button
            onClick={handleNo}
            className="w-[100px] h-[45px] bg-[#5cab7c] text-white text-[16px] font-medium rounded border border-black"
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
// 5.23: 상자 정중앙 약간 하단 이동 및 버튼/텍스트 크기 확대
// 5.23: transform 제거 후 flex 레이아웃으로 안전하게 상자 위치 조절
// 5.23: config.js에서 API_BASE_URL 불러와 8000포트 axios.delete 요청으로 수정


//5.17 17:28 우선 로고 삭제하고 YES 버튼 빨간색으로 수정