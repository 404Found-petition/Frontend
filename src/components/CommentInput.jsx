// 댓글 작성하는 컴포넌트

import React from "react";

const CommentInput = ({ value, onChange, onSubmit }) => {
  return (
    <div className="p-4 mt-6 bg-white border border-gray-400 rounded-xl">
      <textarea
        placeholder="댓글 작성..."
        className="w-full text-sm text-gray-600 resize-none focus:outline-none"
        rows={3}
        value={value}
        onChange={onChange}
      />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-white bg-green-700 border border-black rounded-lg shadow"
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
