import React, { useState } from "react";
import axios from "axios";
import image from "./image.png";
import { LoginAlertModal } from "./LoginAlertModal";

export const SearchBar = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // JWT 토큰 유무로 로그인 상태 판단
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  const handleSearchClick = async () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

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
      onSearchResult(response.data); // 부모에게 결과 전달
    } catch (error) {
      console.error("검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
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
      <img
        className="w-[41px] h-11 cursor-pointer"
        alt="검색"
        src={image}
        onClick={handleSearchClick}
      />

      {showModal && <LoginAlertModal onClose={() => setShowModal(false)} />}
    </div>
  );
};



//2:54 그 청원 검색하려고 했을 때 비로그인시 검색 못하게 