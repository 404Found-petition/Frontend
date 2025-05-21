import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteBox from "./VoteBox";
import voteIcon from "../assets/vote_Icon.png";

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
    <div className="absolute w-[1007px] h-[750px] top-[40px] left-[217px] shadow-xl">
      {/* ✅ ▶ POST 상단 좌측에 배치 */}
      <div className="text-[#6C6C6C] text-sm font-semibold flex items-center mb-2 ml-1">
        <span className="mr-1">▶</span>
        <span>POST</span>
      </div>

      <div className="relative w-full h-full bg-[#f6fff4] p-6 rounded-[10px] border border-[#a3a3a3] flex flex-col justify-between">

        {/* 제목 입력 + 투표 아이콘 버튼 */}
        <div className="flex items-center justify-between mb-4">
          <input
            className="h-[40px] border border-gray-300 rounded-md p-2 w-[calc(100%-48px)]"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={() => setShowVote((prev) => !prev)}
            className="ml-2 w-[36px] h-[36px] bg-[#3F7D58] rounded-full flex items-center justify-center hover:opacity-80 shrink-0"
            title="투표 추가/제거"
          >
            <img src={voteIcon} alt="투표 아이콘" className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* 내용 입력란 + 투표 박스 포함 */}
        <div className="w-full border border-gray-300 rounded-md p-4 bg-white flex-1 mb-6 flex flex-col justify-between">
          <textarea
            className="w-full h-full resize-none outline-none overflow-y-auto"
            placeholder="내용 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {showVote && (
            <div className="mt-4">
              <VoteBox />
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="w-[108px] h-[37px] bg-green-700 text-white font-semibold rounded-md border border-black transition"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="w-[108px] h-[37px] bg-green-700 text-white font-semibold rounded-md border border-black transition"
          >
            SUBMIT
          </button>
        </div>

        {/* 경고창 */}
        {showAlert && (
          <div className="absolute w-[315px] h-40 top-10 left-1/2 transform -translate-x-1/2 z-50">
            <div className="relative w-full h-full rounded-[6px] bg-[#f6fff4] border border-black">
              <div
                className="absolute top-3 right-3 text-[20px] font-bold text-gray-600 cursor-pointer"
                onClick={() => setShowAlert(false)}
              >
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
//5.20 12:21 피그마 디자인대로 우선 1차 수정(뭐했다고 벌써 20일)
//5.20 12:42 투표 이미지 넣었고 누르면 투표 나오고 배경색 바꾸고 버튼 색 바꾸고 에러나올때 에러 나오고 제목 내용란 크기 수정 근데 바탕 전체가 좀 큰거같기도
//5.21 10:15 투표 아이콘으로만 투표
//5.21 10:18 제목란 가로 좀 줄임
//5.21 10:24 투표상자 내용작성란 안으로 넣음
//5.21 10:33 내용작성란 늘림
//5.21 10:38 투표 좀 아래로 내림
//5.21 10:48 투표 아래로 더 내림, 내용 더 많아질 시 스크롤 할 수 
//5.21 10:58 ▶POST 추가
//5.21 11:05