import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosInstance';
import { API_BASE_URL } from "../config";
import PasswordMismatchPopup from "../components/PasswordMismatchPopup";
import IdDuplicatePopup from "../components/IdDuplicatePopup";
import IdCheckRequiredPopup from "../components/IdCheckRequiredPopup";

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [showIdDuplicatePopup, setShowIdDuplicatePopup] = useState(false);
  const [showIdCheckRequiredPopup, setShowIdCheckRequiredPopup] = useState(false);

  // ✅ 중복 확인
  const handleDuplicateCheck = async () => {
    console.log("🟢 중복 확인 버튼 클릭됨");

    if (!userid.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }
    console.log("🔍 서버로 중복 확인 요청 전송:", userid); // ✅ 이거 추가
    try {
      const res = await api.get(`${API_BASE_URL}/api/check-duplicate/`, {
        params: { userid },
      });
      console.log("✅ 서버 응답:", res.data); // ✅ 응답 확인용
      setIsIdAvailable(res.data.available);
      setIdChecked(true);
    } catch (err) {
      console.error("중복 확인 실패:", err);
      setIsIdAvailable(false);
      setIdChecked(true);
    }
  };

  // ✅ 회원가입 요청
  const handleSubmit = async () => {
    console.log("🔽 SUBMIT 버튼 눌림");

    if (!idChecked) {
      setShowIdCheckRequiredPopup(true);
      return;
    }
    if (idChecked && !isIdAvailable) {
      setShowIdDuplicatePopup(true);
      return;
    }
    if (password !== confirmPassword) {
      setShowPasswordPopup(true);
      return;
    }

    try {
      const response = await api.post(`${API_BASE_URL}/api/register/`, {
        userid,
        password,
        name,
        phone_num: phone, // ✅ 백엔드에 맞춘 필드명
      });
      console.log("✅ 회원가입 성공:", response.data);
      navigate("/success");
    } catch (error) {
      console.error("❌ 회원가입 실패:", error.response?.data || error.message);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[750px] h-[706px] top-[40px] left-[345px] bg-[#f6fff4] rounded-[16.3px] border-[2.93px] border-solid border-[#3f7d58] shadow-[0px_1.3px_1.3px_#00000040]">

          {/* 이름 */}
          <div className="absolute w-[321px] h-16 top-[166px] left-[213px]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded-[3.1px] border border-black px-3 text-sm"
              placeholder="이름을 입력하세요"
            />
            <div className="absolute top-0 left-0 text-[12.4px]">이름</div>
          </div>

          {/* 아이디 */}
          <div className="absolute w-[321px] h-16 top-[257px] left-[216px]">
            <div className="text-[12.4px] flex items-center space-x-2">
              <span>아이디</span>
              {idChecked && isIdAvailable && (
                <span className="text-[#3F7D58] text-[12.4px]">✔ 사용 가능한 아이디입니다.</span>
              )}
              {idChecked && !isIdAvailable && (
                <span className="text-[#e83232] text-[12.4px]">❌ 이미 사용 중인 아이디입니다</span>
              )}
            </div>
            <input
              type="text"
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
                setIdChecked(false);
              }}
              className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black px-3 text-sm"
              placeholder="아이디를 입력하세요"
            />
            <button
              type="button" // ✅ 이 한 줄 추가!
              onClick={handleDuplicateCheck}
              className="absolute w-[69px] h-[31px] top-[27px] left-[246px] bg-[#d9d9d9] rounded border border-black text-[9.9px]"
            >
              중복 확인
            </button>
          </div>

          {/* 비밀번호 */}
          <div className="absolute w-[321px] h-16 top-[343px] left-[213px]">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black px-3 text-sm"
              placeholder="비밀번호를 입력하세요"
            />
            <div className="absolute top-0 left-0 text-[12.4px]">비밀번호</div>
          </div>

          {/* 비밀번호 재확인 */}
          <div className="absolute w-[550px] h-16 top-[432px] left-[213px]">
            <div className="absolute top-0 left-0 text-[12.4px]">비밀번호 재확인</div>
            {confirmPassword && password && (
              <div className="absolute top-0 left-[100px]">
                {password === confirmPassword ? (
                  <p className="text-[#3F7D58] text-[12.4px]">✔ 비밀번호가 일치합니다</p>
                ) : (
                  <p className="text-[#e83232] text-[12.4px]">❌ 비밀번호가 일치하지 않습니다</p>
                )}
              </div>
            )}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black px-3 text-sm"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          {/* 핸드폰 번호 */}
          <div className="absolute w-[321px] h-16 top-[521px] left-[213px]">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="absolute w-[319px] h-11 top-5 left-0 bg-[#f7f5f5] rounded border border-black px-3 text-sm"
              placeholder="핸드폰 번호 입력"
            />
            <div className="absolute top-0 left-0 text-[12.4px]">핸드폰 번호</div>
          </div>

          {/* SUBMIT 버튼 */}
          <button
            type="button"
            onClick={handleSubmit}
            className="absolute w-[115px] h-[31px] top-[624px] left-[315px] bg-[#5cab7c] text-white text-[12.4px] rounded border border-black"
          >
            SUBMIT
          </button>

          {/* 제목 */}
          <div className="absolute w-60 top-[67px] left-[252px] text-[46.6px] font-bold text-center">
            Sign Up
          </div>

          {/* X 닫기 버튼 */}
          <div
            className="absolute top-[37px] left-[685px] text-[20px] font-bold text-gray-600 cursor-pointer"
            onClick={handleClose}
          >
            ×
          </div>
        </div>

        {/* 팝업들 */}
        {showPasswordPopup && (
          <div className="absolute top-[360px] left-[564px] z-50">
            <PasswordMismatchPopup onClose={() => setShowPasswordPopup(false)} />
          </div>
        )}
        {showIdDuplicatePopup && (
          <div className="absolute top-[360px] left-[564px] z-50">
            <IdDuplicatePopup onClose={() => setShowIdDuplicatePopup(false)} />
          </div>
        )}
        {showIdCheckRequiredPopup && (
          <div className="absolute top-[360px] left-[564px] z-50">
            <IdCheckRequiredPopup onClose={() => setShowIdCheckRequiredPopup(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;


//5.15 5:32 X자 이미지 없애고 x로 수정
//5.16 12:40 비밀번호 실시간 일치/불일치 메시지, 불일치 SUBMIT 시 팝업, 로고&x시 메인
//5.16 12:46 비밀번호 일치불일치 메시지 위치 조정
//5.16 12:49 진짜 다시 수정 제발 정확히 돼라 에라이
//5.16 1:28 진짜 위치 됐고 비밀번호 불일치 팝업 위치도 수정 완   360/564
//5.16 1:48 사용중 아이디 SUBMIT 할 때 안내창 팝업 뜨도록
//5.17 14:52 중복 확인 안 하고 SUBMIT 할 때 안내창 팝업 뜨도록
//5.22 20:08 회원가입 백 연동중...
//5.22 20:13 중복확인 API도 추가