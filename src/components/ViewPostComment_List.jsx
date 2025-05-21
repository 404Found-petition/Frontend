// 댓글을 화면에 보여주는 역할

// ✅ 수정된 ViewPostComment_List.jsx
import React from "react";

const ViewPostComment_List = ({ comments, bottomRef }) => {
  return (
    <div className="w-full">
      {/* 댓글 리스트 영역 (스크롤) */}
      <div className="h-[250px] overflow-y-auto pr-2">
        {comments.map((c, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-start space-x-2">
              {/* 프로필 원형 */}
              <div className="w-[22px] h-[22px] rounded-full bg-[#93e1b3] border border-black mt-[2px]" />
              
              {/* 닉네임과 날짜 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{c.nickname}</span>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <p className="text-[#6b6b6b] text-[12.4px]">{c.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* ✅ 댓글 맨 아래로 스크롤할 수 있도록 ref 달기 */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ViewPostComment_List;

// 5.12 23:19 key값으로 user id 사용하도록 수정
// 5.13 21:59 스크롤 기능 추가 댓글 개수 동적으로 변하도록 설정
// 5.20 postdetail과 연동되도록 수정