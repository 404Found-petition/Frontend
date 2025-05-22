import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginErrorPopup from "../components/LoginErrorPopup";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);

  // Google 로그인 성공 시
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    fetch("http://localhost:8000/api/social-login/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 응답 실패");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        window.location.href = "/"; // 홈으로 리디렉션
      })
      .catch((err) => {
        console.error("Google 로그인 오류:", err);
        setLoginFailed(true);
      });
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-screen relative gap-6">
      {/* 기존 로그인 폼 */}
      <LoginForm setLoginFailed={setLoginFailed} />

      {/* 로그인 실패 시 팝업 */}
      {loginFailed && (
        <div className="fixed left-[562px] top-[382px] z-50">
          <LoginErrorPopup onClose={() => setLoginFailed(false)} />
        </div>
      )}
    </div>
  );
};

export default Login;



// 로그인 실패 여부를 상태로 관리 (loginFailed)
// 로그인 성공/실패 여부는 LoginForm에서 결정

//5.15 21:55 검은 배경 반투명 오버레이 삭제, 로그인 실패시 그냥 에러 팝업창만 뜨도록 설정
//5.15 22:19 로그인 에러창 뜨는 위치 고정
//