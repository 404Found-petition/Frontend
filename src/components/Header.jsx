import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LogoutPopup from "./LogoutPopup"; // ✅ 팝업 컴포넌트
import "../styles/global.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const accessToken = localStorage.getItem("access");
  const isLoggedIn =
    !!accessToken && accessToken !== "undefined" && accessToken !== "null";

  // ✅ 프론트 테스트용 로그아웃 처리
  const handleLogout = async () => {
    const isFrontendOnly = true;

    if (isFrontendOnly) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
      window.location.reload();
      return;
    }

    // 🔌 백엔드 연동 시 사용
    try {
      const refreshToken = localStorage.getItem("refresh");
      await axios.post("/api/logout/", { refresh: refreshToken });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  const hideLoginControls = ["/login", "/signup", "/success"].includes(location.pathname);

  const isCompactPage = [
    "/login", "/signup", "/success",
    "/posts", "/petitionlist", "/petitions/history", "/posts/:id", "/user", "/posts/create"
  ].includes(location.pathname);

  const logoClass = isCompactPage
    ? "absolute top-[-60px] left-[-250px] w-[800px] h-[240px]"
    : "absolute top-[0px] left-[-140px] w-[800px] h-[240px]";

  const buttonPositionClass = isCompactPage
    ? "absolute top-[40px] right-[80px]"
    : "absolute top-[110px] right-[200px]";

  return (
    <div className="w-full h-[100px] bg-white relative">
      {/* 🔹 로고 */}
      <img
        src="../assets/LAWGIC.png" // ⛏ 경로는 실제 로고 이미지 위치로 맞춰주세요
        alt="LAWGIC Logo"
        className={`${logoClass} cursor-pointer`}
        onClick={() => navigate("/")}
      />
      {/*<div
            className={`${logoClass} bg-lawgic-logo bg-contain bg-no-repeat bg-left cursor-pointer`}
            onClick={() => navigate("/")}
        />*/}

      {/* 🔹 로그인/로그아웃 버튼 */}
      {!hideLoginControls && (
        isLoggedIn ? (
          <div className={`${buttonPositionClass} flex items-center gap-2 whitespace-nowrap z-10`}>
            <div
              className="w-[35px] h-[35px] bg-[#93e1b3] rounded-full border border-black cursor-pointer"
              onClick={() => navigate("/user")}
            />
            <span
              onClick={() => setShowLogoutPopup(true)}
              className="text-[#5cab7c] font-semibold text-[16px] cursor-pointer leading-none whitespace-nowrap"
            >
              Logout
            </span>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`${buttonPositionClass} text-[#5cab7c] font-semibold text-[16px] cursor-pointer bg-transparent border-none outline-none p-0 m-0 select-none z-10`}
          >
            Login
          </button>
        )
      )}

      {/* 🔹 로그아웃 팝업 */}
      {showLogoutPopup && (
        <LogoutPopup
          onCancel={() => setShowLogoutPopup(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Header;


//5.20 20:32 로그인하면 로그인 자리에 프로필 사진 로그아웃 뜨도록
//5.20 21:06 프로필 사진 누르면 유저 페이지 이동, 로그아웃 되도록
//5.21 12:39 와 이제 어디서든 로고 누르면 홈화면으로 가진다 드디어
//5.21 12:59 와 이제 로그아웃도 된다