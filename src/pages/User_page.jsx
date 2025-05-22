import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WithdrawMessage from "../pages/Withdraw_message"; // ✅ 탈퇴 확인 모달 컴포넌트

// ✅ 원형 퍼센트 차트 컴포넌트 (청원 이행 확률 시각화용)
const CircularPercent = ({ percentage }) => {
  const radius = 20;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <svg height="48" width="48">
      <circle
        stroke="#E5E5E5"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx="24"
        cy="24"
      />
      <circle
        stroke="#5cab7c"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx="24"
        cy="24"
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="11"
        fill="black"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const UserPage = () => {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // 🔹 더미 데이터 (실제 로그인 사용자 정보 대체용)
  const user = {
    id: "USER_ID",
    name: "김땡땡",
    phone: "010-1234-5678",
    posts: [
      { date: "2025.03.31", title: "게시글 제목제목제목" },
      { date: "2025.03.31", title: "게시글 제목제목제목" },
      { date: "2025.03.31", title: "게시글 제목제목제목" },
      { date: "2025.03.31", title: "게시글 제목제목제목" },
    ],
    predictions: [
      { date: "2025.03.31", summary: "의료 관련 법률 개정을 제안합니다", percent: 92 },
      { date: "2025.03.31", summary: "촉법소년 연령을 낮춰주세요", percent: 92 },
      { date: "2025.03.31", summary: "모두 정당한 교육을 받을 수 있게 해주세요", percent: 92 },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-[1080px] min-h-screen py-10 px-8 relative">
        
        {/* ✅ 사용자 프로필 정보 */}
        <div className="flex items-start gap-10 mb-6">
          <div className="w-[120px] h-[120px] bg-[#93e1b3] rounded-full border border-black" />
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-semibold">{user.id}</h2>
              <button
                className="bg-[#5CAB7C] text-white px-3 py-1 text-sm rounded"
                onClick={() => navigate("/edit-user")}
              >
                회원정보 수정하기
              </button>
              <button
                className="bg-[#F30707] text-white px-3 py-1 text-sm rounded"
                onClick={() => setShowWithdrawModal(true)}
              >
                탈퇴하기
              </button>
            </div>
            <div className="text-lg text-[#555] mb-1">
              NAME <span className="ml-4 text-black font-bold">{user.name}</span>
            </div>
            <div className="text-lg text-[#555]">
              Phone number <span className="ml-4 text-black font-bold">{user.phone}</span>
            </div>
          </div>
        </div>

        {/* ✅ 구분선 (프로필 ↔ 기록) */}
        <div className="w-[1040px] border-t border-gray-300 my-6" />

        {/* ✅ 기록 타이틀 */}
        <div className="flex mb-4">
          <h3 className="text-xl font-semibold pl-[5px] w-1/2">내가 작성한 게시글</h3>
          <h3 className="text-xl font-semibold pl-[20px] w-1/2">청원 이행 확률 예측 사용기록</h3>
        </div>

        {/* ✅ 게시글 및 예측 카드 그리드 (좌: 게시글, 우: 예측) */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* 🔹 내가 작성한 게시글 카드들 */}
          <div className="flex flex-col gap-4">
            {user.posts.map((post, i) => (
              <div
                key={i}
                className="border-[1.5px] border-green-700 rounded-lg px-4 py-2 text-sm min-h-[70px] flex flex-col justify-center"
              >
                <div className="text-xs text-gray-600 mb-1">{post.date}</div>
                <div className="text-base font-medium">{post.title}</div>
              </div>
            ))}
          </div>

          {/* 🔹 청원 예측 결과 카드들 */}
          <div className="flex flex-col gap-4">
            {user.predictions.map((item, i) => (
              <div
                key={i}
                className="border-[1.5px] border-green-700 rounded-lg px-4 py-2 text-sm min-h-[70px] flex justify-between items-center"
              >
                <div>
                  <div className="text-xs text-gray-600 mb-1">{item.date}</div>
                  <div className="text-base">{item.summary}</div>
                </div>
                <CircularPercent percentage={item.percent} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ 탈퇴 확인 모달 (조건부 표시) */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <WithdrawMessage />
        </div>
      )}
    </div>
  );
};

export default UserPage;



//5.20 21:48 더미데이터 넣어서 이제 유저페이지 들어가지기는 함
//5.20 22:25 디자인 전체적으로 수정 제대로 되어있는지 1차 수정
//5.21 22:10 하단 게시글+예측과 프로필 구간 구분용 회색 선 추가, 게시글+예측 높이 정렬 
