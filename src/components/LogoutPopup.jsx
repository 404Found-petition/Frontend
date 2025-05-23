// ✅ src/components/LogoutPopup.jsx
import React from "react";

const LogoutPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-[#f0fcef] border-[2px] border-black rounded-2xl w-[440px] h-[240px] shadow-xl flex flex-col items-center pt-10">
        {/* ✅ 글자: 크기 키우고 아래로 */}
        <h2 className="text-[28px] font-bold mt-10">로그아웃 하시겠습니까?</h2>

        {/* ✅ 버튼: 살짝 더 아래로 (mt-8) */}
        <div className="flex justify-center gap-10 mt-8">
          <button
            onClick={onCancel}
            className="w-[100px] h-[40px] bg-green-700 text-white rounded-full text-sm font-semibold hover:bg-[#4aa46d] border border-black"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="w-[100px] h-[40px] bg-green-700 text-white rounded-full text-sm font-semibold hover:bg-[#4aa46d] border border-black"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;

//5.21 12:46 로그아웃 팝업창 생성
//5.21 9:26 팝업창 폭 넓힘(확인해보기)