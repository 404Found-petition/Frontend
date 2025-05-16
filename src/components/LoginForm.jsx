//LoginForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LAWGIC.png";

const LoginForm = ({ setLoginFailed }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const id = e.target[0].value;
    const pw = e.target[1].value;

    // ✅ 임시 테스트용 로그인 조건
    if (id === "test" && pw === "1234") {
      const token = "sample.jwt.token";
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      setLoginFailed(true); // ❌ 에러 상태 ON
    }
  };

  return (
    <div className="w-[694px] h-[654px] bg-[#f6fff4] border-[3px] border-[#3f7d58] rounded-[18px] shadow relative">
      <img
        src={logo}
        alt="Lawgic Logo"
        className="absolute top-[19px] left-[35px] w-[199px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div
        className="absolute top-6 right-6 text-[20px] font-bold text-gray-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ×
      </div>

      <div className="text-center text-[56px] font-bold mt-16">Log In</div>

      <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 mt-12">
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

      <div className="mt-4 text-center">
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

//5.15 5:39 이미지(로고, x자) 삭제
//5.15 21:58 로그인 실패시 에러 팝업 뜨도록 설정 (프론트 테스트용으로 아이디 비번 만들어 놓음)
//5.15 로고 위치 크기 정확히 맞춰져 있음 확인 완