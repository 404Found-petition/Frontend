import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithdrawMessage from "../pages/Withdraw_message";
import api from "../api/axiosInstance";
import { API_BASE_URL } from "../config";

const CircularPercent = ({ percentage }) => {
  const radius = 30;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progressLength = (percentage / 100) * circumference;

  return (
    <div className="w-[80px] h-[80px] relative">
      <svg width="80" height="80">
        <circle
          r={normalizedRadius}
          cx="40"
          cy="40"
          fill="none"
          stroke="#000"
          strokeWidth={stroke}
          strokeDasharray={`${progressLength} ${circumference - progressLength}`}
          strokeDashoffset="0"
          transform="rotate(-90 40 40)"
          strokeLinecap="butt"
        />
        <circle
          r={normalizedRadius}
          cx="40"
          cy="40"
          fill="none"
          stroke="#15803D"
          strokeWidth={stroke - 2}
          strokeDasharray={`${progressLength} ${circumference - progressLength}`}
          strokeDashoffset="0"
          transform="rotate(-90 40 40)"
          strokeLinecap="butt"
        />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fill="black"
          fontWeight="bold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

const UserPage = () => {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await api.get(`${API_BASE_URL}/api/user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access");

    api
      .get(`${API_BASE_URL}/api/posts/mine/recent/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const posts = res.data?.data;
        setMyPosts(Array.isArray(posts) ? posts : []);
      })
      .catch((err) => console.error("❌ 게시권 불러오기 실패", err));

    api
      .get(`${API_BASE_URL}/api/my-predictions/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMyPredictions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("❌ 예측 기록 불러오기 실패", err));
  }, []);

  if (!user) return <div className="p-8 text-center">로딩 중...</div>;

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-[1080px] min-h-screen py-10 px-8 relative">
        <div className="flex items-start gap-10 mb-6">
          <div className="w-[120px] h-[120px] bg-[#15803D] rounded-full border border-black" />
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-semibold">{user.userid}</h2>
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
              NAME <span className="ml-4 font-bold text-black">{user.name}</span>
            </div>
            <div className="text-lg text-[#555]">
              Phone number <span className="ml-4 font-bold text-black">{user.phone_num}</span>
            </div>
          </div>
        </div>

        <div className="w-[1040px] border-t border-gray-300 my-6" />

        <div className="flex mb-4 relative">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold pl-[5px]">내가 작성한 게시글</h3>
            <button
              onClick={() => navigate("/posts/history?mine=true")}
              className="absolute right-[52%] top-0 text-xl"
            >
              ⋯
            </button>
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold pl-[20px]">청원 이행 확률 예측 사용기록</h3>
            <button
              onClick={() => navigate("/petitions/history")}
              className="absolute right-0 top-0 text-xl"
            >
              ⋯
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="border-[1.5px] border-green-700 rounded-lg px-4 py-2 text-sm min-h-[70px] flex flex-col justify-center"
              >
                <div className="mb-1 text-xs text-gray-600">{post.created_at?.slice(0, 10)}</div>
                <div className="text-base font-medium">{post.title}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {myPredictions.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative border-[1.5px] border-green-700 rounded-lg px-4 py-4 text-sm min-h-[70px] flex items-center"
              >
                <div className="pr-[100px]">
                  <div className="mb-1 text-xs text-gray-600">{item.predicted_at?.slice(0, 10)}</div>
                  <div className="text-base font-medium">{item.petition_title}</div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CircularPercent percentage={Math.round(item.prediction_percentage)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
//5.23 23:13 res.data.data가 아니라 res.data<<이게 맞아서 이거로 수정 이제 확인해보기 됏음
//5.24 00:30 ✅ myPosts를 /posts/mine/recent/ API로 변경하여 4개만 미리 보여주도록 수정함
//5.23 23:45 검색 기록 유저페이지에서 3개만 보여주도록 수정 잘보이는지 확인하기 -> 확인 완 (이제 디자인 수정하기)
//5.24 12:46 유저페이지 내 디자인 수정 완
