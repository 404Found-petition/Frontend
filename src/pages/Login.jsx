import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginErrorPopup from "../components/LoginErrorPopup";

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);

  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-screen relative gap-6">
      {/* 로그인 폼 내부에서 GoogleLogin 포함 */}
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
//5.23 20:05 ✅ Google 로그인 시 userid localStorage에 저장 추가   뭐야 이거?
//5.24 20:40 로그인 페이지 맨 밑에 구글 로그인 버튼 하나 더 있는거 삭제(확인해보기) 됐당