import React from "react";

export const LoginAlertModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="relative w-[502px] h-[255px] bg-[#fffcfc] rounded-[9px] border-[2.7px] border-black shadow-lg">
        {/* 닫기 버튼 */}
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-[20px] font-bold text-gray-600 cursor-pointer"
        >
          ×
        </div>

        {/* 안내 문구 */}
        <p className="absolute top-[95px] left-1/2 transform -translate-x-1/2 text-black text-2xl font-semibold text-center">
          로그인 후 이용 가능합니다
        </p>

        {/* 로그인 버튼 */}
        <button
          onClick={onClose} // 또는 navigate('/login') 등으로 연결 가능
          className="absolute top-[178px] left-1/2 transform -translate-x-1/2 bg-[#5cab7c] text-white px-6 py-2 rounded-[9px] border border-black text-sm font-medium"
        >
          Log In
        </button>
      </div>
    </div>
  );
};
