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

// 로그인 실패 여부를 상태로 관리 (loginFailed)
// 로그인 실패 시 검은 배경 반투명 오버레이와 함께 에러 팝업 표시
// 로그인 성공/실패 여부는 LoginForm에서 결정
