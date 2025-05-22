import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import LogoutPopup from "./LogoutPopup";
import "../styles/global.css";
import logoImage from "../assets/LAWGIC.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const accessToken = localStorage.getItem("access");
  const isLoggedIn =
    !!accessToken && accessToken !== "undefined" && accessToken !== "null";

  const handleLogout = async () => {
    const isFrontendOnly = true;

    if (isFrontendOnly) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
      window.location.reload();
      return;
    }

    try {
      const refreshToken = localStorage.getItem("refresh");
      await api.post("/api/logout/", { refresh: refreshToken });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  // 🔹 로그인/로그아웃 버튼을 숨길 페이지들
  const hideLoginControls = ["/login", "/signup", "/success"].includes(location.pathname);

  // 🔹 UserPage/게시글상세 등 compact 헤더를 쓸 페이지
  const isCompactPage =
    [
      "/login", "/signup", "/success",
      "/posts", "/petitionlist", "/petitions/history",
      "/user", "/posts/create", "/edit-user", "/withdraw", "/withdrawal-complete"
    ].includes(location.pathname) ||
    location.pathname.startsWith("/posts/");  // ✅ PostDetail도 포함됨

  const logoClass = isCompactPage
    ? "absolute top-[-45px] left-[40px] h-[240px] w-auto"
    : "absolute top-[20px] left-[120px] h-[240px] w-auto";

  const buttonPositionClass = isCompactPage
    ? "absolute top-[40px] right-[80px]"
    : "absolute top-[110px] right-[200px]";

  return (
    <div className="w-full h-[100px] bg-white relative">
      {/* 🔹 로고 */}
      <img
        src={logoImage}
        alt="LAWGIC Logo"
        className={`${logoClass} object-contain cursor-pointer`}
        onClick={() => navigate("/")}
      />

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