import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ setLoginFailed }) => {
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("🟢 받은 Google 토큰:", token);

    try {
      const res = await fetch("http://localhost:8000/api/social-login/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error("백엔드 응답 실패");
      }

      const data = await res.json();
      console.log("✅ JWT 발급:", data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Google 로그인 실패:", err);
      if (setLoginFailed) setLoginFailed(true);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => {
        console.log("❌ Google 로그인 중 에러 발생");
        if (setLoginFailed) setLoginFailed(true);
      }}
    />
  );
};

export default GoogleLoginButton;


//5.21 23:47 생성