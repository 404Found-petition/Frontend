import React from "react";

const PostListCard = ({ title, content, authorId, date, voteEnabled, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[629px] h-[343px] border-[2.64px] border-[#5cab7c] rounded-[20px] p-6 relative cursor-pointer overflow-hidden"
    >
      {/* 상단: 작성자 + 아이콘 */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-[47px] h-[47px] bg-[#93e1b3] border border-black rounded-full" />
        <div className="text-[12.4px] text-black">{authorId || "익명"}</div>
        <div className="ml-auto text-[10.6px] text-[#6b6b6b] flex items-center gap-1">
          {date || "날짜 없음"}
          {voteEnabled && <span className="ml-1 text-green-700 text-[13px]">✅</span>}
        </div>

      </div>

      {/* 제목 */}
      <div className="text-[21.5px] font-bold text-black mb-2">{title || "제목 없음"}</div>

      {/* 본문 내용: truncate */}
      <div className="w-full">
        <p
          className="truncate w-full text-[14.9px] text-black leading-normal"
          title={content}
        >
          {content || "내용 없음"}
        </p>
      </div>
    </div>
  );
};

export default PostListCard;
