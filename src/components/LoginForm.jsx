// LoginPage.jsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginErrorPopup from "../components/LoginErrorPopup";

const LoginPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);

  return (
    <div className="bg-white flex justify-center items-center min-h-screen relative">
      <LoginForm setLoginFailed={setLoginFailed} />
      {loginFailed && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
          <LoginErrorPopup onClose={() => setLoginFailed(false)} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;

//LoginForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/7.png";
import closeLine1 from "../assets/line-5.svg";
import closeLine2 from "../assets/line-6.svg";

const LoginForm = ({ setLoginFailed }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 예시: ID / PW 입력 후 실제로는 백엔드와 연결 필요
    const token = "sample.jwt.token";
    localStorage.setItem("token", token);
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="w-[694px] h-[654px] bg-[#f6fff4] border-[3px] border-[#3f7d58] rounded-[18px] shadow relative">
      <img
        src={logo}
        alt="Lawgic Logo"
        className="absolute top-[19px] left-[35px] w-[199px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="absolute top-6 right-6 cursor-pointer" onClick={() => navigate("/")}>
        <img src={closeLine1} alt="X" className="absolute" />
        <img src={closeLine2} alt="X" className="absolute" />
      </div>

      <div className="text-center text-[56px] font-bold mt-16">Log In</div>
      <form onSubmit={handleLogin} className="flex flex-col items-center mt-12 gap-6">
        <input
          type="text"
          placeholder="ID"
          className="w-[515px] h-[43px] rounded border border-black px-4 bg-[#f7f5f5]"
        />
        <input
          type="password"
          placeholder="PWD"
          className="w-[515px] h-[43px] rounded border border-black px-4 bg-[#f7f5f5]"
        />
        <button
          type="submit"
          className="w-[111px] h-[30px] bg-[#5cab7c] text-white text-sm rounded border border-black"
        >
          Log In
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="w-[90px] h-[22px] bg-[#5cab7c] text-white text-xs rounded border border-black"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

// 아이디와 비밀번호 입력 필드를 가진 로그인 폼 렌더링
// 로그인 버튼 클릭 시 handleLogin 실행
// 현재는 임시로 토큰을 저장해 로그인 성공 처리 (실제 연동 필요)
// 로그인 성공 시 홈(/)으로 이동, 실패 시 로그인 실패 상태 설정
// 상단 로고 클릭 또는 X 버튼 클릭 시 홈으로 이동



// LoginErrorPopup.jsx
import React from "react";
import closeX1 from "../assets/image.svg";
import closeX2 from "../assets/line-6-2.svg";

const LoginErrorPopup = ({ onClose }) => {
  return (
    <div className="w-[315px] h-[160px] bg-[#f6fff4] border border-black rounded shadow-md relative z-20">
      <div className="text-red-600 text-xl font-semibold text-center mt-4">WRONG</div>
      <div className="text-center mt-2 text-lg font-semibold">
        아이디나 비밀번호를 <br />다시 확인하세요
      </div>
      <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
        <img src={closeX1} alt="닫기" className="absolute" />
        <img src={closeX2} alt="닫기" className="absolute" />
      </div>
    </div>
  );
};

export default LoginErrorPopup;
