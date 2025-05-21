// 🔍 SearchBar.jsx - 청원 검색창 + 확률 예측 결과 상위 컴포넌트에 전달
import React, { useState } from "react";
import { Search } from "lucide-react";
import { LoginAlertModal } from "./LoginAlertModal";

export const SearchBar = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("access");
  const isLoggedIn = !!token;

  const handleSearchClick = async () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (searchTerm.trim() === "") {
      onSearchResult(null); // ✅ 빈 입력 시 0%로 처리되게 함
      return;
    }

    // 🔒 API 호출은 주석 처리
    /*
    try {
      const response = await axios.post(
        "http://localhost:8000/api/predict/",
        { content: searchTerm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("백엔드 응답:", response.data);
      onSearchResult(response.data);
    } catch (error) {
      console.error("검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
    */

    // 🧪 더미 응답
    const fakeResult = {
      probability: Math.random(), // 0 ~ 1
    };
    onSearchResult(fakeResult); // ✅ Home.jsx 에 전달
  };

  return (
    <div className="relative w-[795px] h-[58px] bg-[#ecebeb] border-[1.81px] border-solid border-black flex items-center px-4">
      <input
        type="text"
        placeholder="청원을 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow h-[40px] bg-[#ecebeb] text-2xl text-black placeholder-[#a2a2a2] focus:outline-none"
      />
      <Search
        size={34}
        strokeWidth={3}
        className="text-green-700 cursor-pointer"
        onClick={handleSearchClick}
      />
      {showModal && <LoginAlertModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
