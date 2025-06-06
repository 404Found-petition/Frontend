// LoginButton.jsx
import React from "react";
import image from "./image.png"; // 로그인 버튼 이미지 등

export const LoginButton = () => {
  return (
    <div className="relative w-[795px] h-[58px] bg-[#ecebeb] border-[1.81px] border-solid border-black rounded-lg flex items-center px-4">
      {/* 안내 문구 */}
      <div className="text-[#a2a2a2] text-xl tracking-tight">
        청원을 입력하세요.
      </div>

      {/* 로그인 이미지 버튼 */}
      <img
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[41px] h-11 cursor-pointer"
        alt="로그인"
        src={image}
      />
    </div>
  );
};

// 5.15 22:51 필요없어 보임 지금 Headr.jsx랑 로그인 페이지에서도 안 씀 다른 데에서도 안쓰는거 정확히 파악되면 지우기기