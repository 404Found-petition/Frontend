// VoteBox.jsx
// 게시글 작성 시 투표 포함을 선택한 경우 보여주는 투표 UI (PostVoteBox 디자인 통일)

import React, { useState } from "react";

const VoteBox = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="bg-[#e3f8eb] p-6 rounded-xl mt-4 text-center border border-black shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="투표 제목을 입력하세요"
        className="text-[#A2A2A2] mb-6 font-semibold border-b border-gray-300 w-full text-center outline-none bg-transparent placeholder-[#A2A2A2]"
      />

      <div className="flex divide-x-2 divide-white rounded-lg overflow-hidden shadow-md">
        {/* YES 영역 */}
        <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-4">
          <span className="text-lg font-bold">YES</span>
        </div>

        {/* NO 영역 */}
        <div className="flex-1 bg-[#5cab7c] text-white flex flex-col items-center py-4">
          <span className="text-lg font-bold">NO</span>
        </div>
      </div>
    </div>
  );
};

export default VoteBox;

// 5.15 2:45 디자인 PostVoteBox랑 통일시키고 제목 입력할 수 있고 입력 시작시 "투표 제목을 입력하세요" 문구 사라짐