import React from "react";
import { useNavigate } from "react-router-dom";
import LoginErrorPopup from "../components/LoginErrorPopup";

const LoginForm = ({ setLoginFailed, loginFailed }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const id = e.target[0].value;
    const pw = e.target[1].value;

    if (id === "test" && pw === "1234") {
      localStorage.setItem("access", "sample.access.token"); // ✅ 'access' 키
      localStorage.setItem("refresh", "sample.refresh.token");
      navigate("/");
      window.location.reload(); // ✅ 상태 새로고침
    } else {
      setLoginFailed(true);
    }
  }; // ✅ 함수 여기서 닫아야 함

  return (
    <div className="bg-white w-[1440px] h-[1024px] relative overflow-hidden">
      {/* 로그인 박스 */}
      <div className="absolute w-[694px] h-[654px] top-[116px] left-[373px] bg-[#f6fff4] border-[3px] border-[#3f7d58] rounded-[18px] shadow">
        {/* X 닫기 */}
        <div
          className="absolute top-[28px] right-[28px] text-[20px] font-bold text-gray-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ×
        </div>

        {/* 제목 */}
        <div className="text-[56px] font-bold text-center mt-[115px]">Log In</div>

        {/* 폼 */}
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 mt-[50px]">
          <input
            type="text"
            placeholder="ID"
            className="w-[515px] h-[43px] rounded border border-black px-4 bg-[#f7f5f5] text-sm"
          />
          <input
            type="password"
            placeholder="PWD"
            className="w-[515px] h-[43px] rounded border border-black px-4 bg-[#f7f5f5] text-sm"
          />
          <button
            type="submit"
            className="w-[111px] h-[30px] bg-green-700 text-white text-[14px] rounded-[9px] border border-black"
          >
            Log In
          </button>
        </form>

        {/* 회원가입 */}
        <div className="flex justify-center mt-4">
          <button
            className="w-[90px] h-[22px] bg-green-700 text-white text-[11px] rounded-[9px] border border-black"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* 팝업 */}
      {loginFailed && (
        <div className="fixed top-[360px] left-[564px] z-50">
          <LoginErrorPopup onClose={() => setLoginFailed(false)} />
        </div>
      )}
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
//5.17 15:52 피그마 디자인대로 수정 완, 로고 삭제 나중에 Header.jsx 수정해서 맞추려고
//5.17 16:59 로그인 실패 안내창 고정되게 하는데 고정이 안됨 왜 안돼
//5.17 17:02 아 이제 됐다