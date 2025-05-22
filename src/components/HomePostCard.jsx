// HomePostCard.jsx
// 메인 화면에서 사용할 게시글 디자인

import React from "react";
import { useNavigate } from "react-router-dom";

const HomePostCard = ({ username, date, preview, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`); // ← ✅ 이 부분이 핵심
  };

  return (
    <div
      onClick={handleClick}
      className="w-[745px] h-[140px] rounded-[26px] border-[1.5px] border-[#5cab7c] relative p-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="absolute w-10 h-10 top-[19px] left-[21px] bg-[#93e1b3] rounded-full border border-black" />
      <div className="absolute top-[26px] left-[77px]">
        <div className="text-[13px] font-bold text-[#000000cc]">{username}</div>
        <div className="text-[15px] text-[#6b6b6b] mt-1">{date}</div>
      </div>
      <p className="absolute top-[85px] left-[77px] text-[22px] font-medium text-black w-[532px]">
        {preview}
      </p>
    </div>
  );
};

export default HomePostCard;


// 5.14 22:22 생성
// 5.22 03:17 navigate()로 상세페이지 연결 추가
