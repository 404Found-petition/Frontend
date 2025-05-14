// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ centeredLogo = false }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    window.location.reload(); // 상태 즉시 반영
  };

  return (
    <div className="w-full h-[100px] bg-[#f5f5f5] flex items-center px-14 border-b border-gray-300 relative">
      {/* 로고 위치: 가운데 or 왼쪽 */}
      {centeredLogo ? (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className="text-[40px] font-extrabold text-[#1c6b41] tracking-wide cursor-pointer"
            onClick={() => navigate("/")}
          >
            LAWGIC
          </h1>
        </div>
      ) : (
        <h1
          className="text-2xl font-bold text-[#1c6b41] cursor-pointer"
          onClick={() => navigate("/")}
        >
          LAWGIC
        </h1>
      )}

      {/* 로그인 or 로그아웃 + 프로필 동그라미 */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-3 ml-auto">
          <div className="w-[39px] h-[39px] bg-[#93e1b3] rounded-full border border-black" />
          <button
            onClick={handleLogout}
            className="bg-[#5cab7c] text-white px-4 py-2 rounded shadow border border-black"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="ml-auto bg-[#5cab7c] text-white px-4 py-2 rounded shadow border border-black"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;



// localStorage에 저장된 JWT 토큰 유무로 로그인 상태 판단
// 로그인 상태이면 초록색 프로필 동그라미와 Logout 버튼 표시
// ㄴ 안 됨 구현 안되어 있음
// 비로그인 상태이면 Login 버튼만 표시
// Logout 클릭 시 토큰 삭제하고 페이지 새로고침하여 상태 반영

// 5.14 12:01 로그아웃 버튼 클릭 시 로그아웃 되도록
// 5.14 21:27 PetitionCard, PostCard 시 로고 위치 다르게 위치할 수 있도록 변경