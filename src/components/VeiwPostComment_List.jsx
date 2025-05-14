// 댓글을 화면에 보여주는 역할

import React from "react";

const ViewPostComment_List = ({ comments }) => {
  return (
    <div className="absolute top-[53px] left-[700px] w-[300px]">

      {/* 댓글 개수 표시 */}
      <div className="text-[#6b6b6b] text-[12.4px] mb-2">
        댓글({comments.length})
      </div>

      {/* 댓글 리스트 영역 (스크롤) */}
      <div className="h-[250px] overflow-y-scroll pr-2">
        {comments.map((c, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-center space-x-2">
              {/* 프로필 원형 */}
              <div className="w-[22px] h-[22px] rounded-full bg-[#93e1b3] border border-black" />
              
              {/* 닉네임과 날짜 */}
              <div className="flex justify-between w-full">
                <span className="text-black text-[15.5px]">{c.nickname}</span>
                <span className="text-[#6b6b6b] text-[12.2px]">{c.date}</span>
              </div>
            </div>

            {/* 댓글 내용 */}
            <p className="text-[#6b6b6b] text-[12.4px] mt-1">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPostComment_List;


// 5.12 23:19 key값으로 user id 사용하도록 수정
// 5.13 21:59 스크롤 기능 추가 댓글 개수 동적으로 변하도록 설정