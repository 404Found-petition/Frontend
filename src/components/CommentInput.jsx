// 댓글 작성하는 컴포넌트

import React from "react";

const CommentInput = ({ value, onChange, onSubmit }) => {
  return (
    <div className="bg-white border border-gray-400 rounded-xl p-4 mt-6">
      <textarea
        placeholder="댓글 작성..."
        className="w-full text-sm text-gray-600 resize-none focus:outline-none"
        rows={3}
        value={value}
        onChange={onChange}
      />
      <div className="flex justify-end">
        <button
          className="bg-[#5cab7c] text-white px-4 py-2 rounded-lg border border-black shadow"
          onClick={onSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default CommentInput;

//5.13 22:26 이름 수정
