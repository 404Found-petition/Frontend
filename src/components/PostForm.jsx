// 사용자가 게시글 작성할 수 있는 글쓰기 UI 폼
// 옵션으로 투표 기능도 추가하거나 제거 가능
// 등록/취소 시 게시판(/posts)으로 이동

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteBox from "./VoteBox";
import group18 from "../assets/group-18.png";
import group19 from "../assets/group-19.png";
import line5 from "./line-5.svg";
import line6 from "./line-6.svg";

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
      // 실제 백엔드 연동 시 axios.post(...) 사용
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

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={handleCancel}>
            <img src={group19} alt="Cancel" className="cursor-pointer" />
          </button>
          <button onClick={handleSubmit}>
            <img src={group18} alt="Submit" className="cursor-pointer" />
          </button>
        </div>

        {/* 안내 문구 */}
        {showAlert && (
          <div className="absolute w-[315px] h-40 top-10 left-1/2 transform -translate-x-1/2 z-50">
            <div className="relative w-[315px] h-40 rounded-[5.67px] bg-[#f6fff4] border border-black">
              <div className="absolute w-[274px] top-[67px] left-5 font-semibold text-black text-[21.9px] text-center">
                게시글의 제목과<br />내용을 모두 입력하세요
              </div>
              <div className="absolute w-28 top-[26px] left-[102px] font-semibold text-[#f20707] text-[21.9px] text-center">
                WRONG
              </div>
              <div className="absolute top-3 right-3 w-4 h-4 cursor-pointer" onClick={() => setShowAlert(false)}>
                <div className="relative w-[18px] h-[17px]">
                  <img className="absolute w-[17px] h-[17px]" src={line5} alt="line5" />
                  <img className="absolute w-[17px] h-[17px]" src={line6} alt="line6" />
                </div>
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
