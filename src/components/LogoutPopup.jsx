import React from "react";

const LogoutPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-[#f0fcef] border border-black rounded-xl p-6 w-[540px] shadow-xl text-center">
        <h2 className="text-xl font-bold mb-6">로그아웃 하시겠습니까?</h2>
        <div className="flex justify-center gap-10 px-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-green-700 text-white rounded-full w-[120px] hover:bg-[#4aa46d]"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-700 text-white rounded-full w-[120px] hover:bg-[#4aa46d]"
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