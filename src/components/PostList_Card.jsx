import React from "react";

const PostListCard = ({ title, content, authorId, date, onClick }) => {
  return (
    <div
      className="w-[629px] h-[343px] rounded-[20.46px] overflow-hidden border-[2.64px] border-solid border-[#5cab7c] relative cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute w-[497px] h-[98px] top-[19px] left-[27px]">
        <p className="w-[416px] top-[43px] left-[76px] absolute font-normal text-black text-[14.9px] leading-[normal]">
          {content || "내용 없음"}
        </p>
        <div className="w-[226px] top-0 left-[76px] absolute font-normal text-black text-[21.5px]">
          {title || "제목 없음"}
        </div>
        <div className="absolute top-14 left-0 text-black text-[12.4px]">
          {authorId || "작성자 없음"}
        </div>
        <div className="w-[47px] h-[47px] rounded-[23.58px] border absolute top-0 left-0 bg-[#93e1b3] border-black" />
      </div>

      <div className="absolute w-[77px] top-3 left-[554px] text-[10.6px] text-[#6b6b6b]">
        {date || "날짜 없음"}
      </div>
    </div>
  );
};

export default PostListCard;
