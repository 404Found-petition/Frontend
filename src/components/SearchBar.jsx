// 🔍 SearchBar.jsx – 검색창 전체 반응형 + 아이콘 밀림 해결
import React, { useState } from "react";
import { Search } from "lucide-react";
import { LoginAlertModal } from "./LoginAlertModal";
import api from "../api/axiosInstance";
import { API_BASE_URL } from "../config";

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

    try {
      const response = await api.post(
        `${API_BASE_URL}/api/predict/`,
        { petition_text: searchTerm },
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
  };

  return (
    // 🔍 수정된 SearchBar JSX container
    <div className="flex items-center w-full h-[3rem] px-4 bg-[#ecebeb] border-2 border-green-700 rounded-3xl shadow-md">

      <input
        type="text"
        placeholder="청원을 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow bg-transparent text-base sm:text-lg placeholder-[#a2a2a2] focus:outline-none"
      />
      <button
        onClick={handleSearchClick}
        className="ml-2 text-green-700 hover:scale-105 transition-transform"
        style={{ flexShrink: 0 }} // ✅ 아이콘이 밀리지 않도록 고정
      >
        <Search size={24} strokeWidth={3} />
      </button>
      {showModal && <LoginAlertModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
