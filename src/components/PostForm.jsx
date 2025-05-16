// 사용자가 게시글 작성할 수 있는 글쓰기 UI 폼
// 옵션으로 투표 기능도 추가하거나 제거 가능
// 등록/취소 시 게시판(/posts)으로 이동

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteBox from "./VoteBox";

const PostForm = ({ showVote, setShowVote }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setShowAlert(true);
      return;
    }

    try {
      console.log("제출됨", { title, content, has_vote: showVote });
      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="absolute w-[1007px] h-[666px] top-[137px] left-[217px] shadow-xl">
      <div className="relative w-full h-full bg-white p-4 border rounded-md">
        <input
          className="w-full border p-2 mb-4"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full h-[200px] border p-2"
          placeholder="내용 작성"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={() => setShowVote((prev) => !prev)}
          className="mt-4 text-green-700 underline"
        >
          🗳️ 투표 {showVote ? "제거" : "추가"}
        </button>

        {showVote && <VoteBox />}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="w-[108px] h-[37px] bg-gray-300 text-black font-semibold rounded-md border border-black hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[108px] h-[37px] bg-[#5cab7c] text-white font-semibold rounded-md border border-black hover:bg-[#489766] transition"
          >
            Submit
          </button>
        </div>

        {/* 안내 문구 */}
        {showAlert && (
          <div className="absolute w-[315px] h-40 top-10 left-1/2 transform -translate-x-1/2 z-50">
            <div className="relative w-full h-full rounded-[6px] bg-[#f6fff4] border border-black">
              <div className="absolute top-3 right-3 text-[20px] font-bold text-gray-600 cursor-pointer" onClick={() => setShowAlert(false)}>
                ×
              </div>
              <div className="absolute top-[26px] w-full text-center font-semibold text-[#f20707] text-[21.9px]">
                WRONG
              </div>
              <div className="absolute top-[67px] w-full text-center font-semibold text-black text-[21.9px]">
                게시글의 제목과<br />내용을 모두 입력하세요
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm;

// 5.12 23:06  3가지 문제 수정(1.제목/내용 데이터 관리 안 됨 2.게시글 작성 내용 백으로 안 넘어감 3.제목or내용 비어있을시 제출 안되도록 해야함)
// 5.15 1:17  SUBMIT, CANCEL 버튼 이미지로 되어 있던거 수정, 안내문구 X자도 이미지로 되어있던거 수정