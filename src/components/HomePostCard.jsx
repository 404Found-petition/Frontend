// HomePostCard.jsx
// 메인 화면에서 사용할 게시글 디자인

import React from "react";

const HomePostCard = ({ username, date, preview }) => {
  return (
    <div className="w-[745px] h-[140px] rounded-[26px] border-[1.5px] border-[#5cab7c] relative p-4">
      {/* 프로필 아이콘 */}
      <div className="absolute w-10 h-10 top-[19px] left-[21px] bg-[#93e1b3] rounded-full border border-black" />

      {/* 작성자 및 날짜 */}
      <div className="absolute top-[26px] left-[77px]">
        <div className="text-[13px] font-bold text-[#000000cc]">{username}</div>
        <div className="text-[15px] text-[#6b6b6b] mt-1">{date}</div>
      </div>

      {/* 미리보기 텍스트 */}
      <p className="absolute top-[85px] left-[77px] text-[22px] font-medium text-black w-[532px]">
        {preview}
      </p>
    </div>
  );
};

export default HomePostCard;

// 5.14 22:22 생성