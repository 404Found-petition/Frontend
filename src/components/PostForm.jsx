import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteBox from "./VoteBox";
import voteIcon from "../assets/vote_Icon.png";
import api from "../api/axiosInstance";
import { API_BASE_URL } from "../config";

const PostForm = ({ showVote, setShowVote }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // ✅ 글 작성 처리 함수
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setShowAlert(true); // 제목/내용 없으면 경고창
      return;
    }

    try {
      // 🔹 서버에 글 저장 요청 (axios POST)
      const res = await api.post(
        `${API_BASE_URL}/api/posts/create/`,
        {
          title: title,
          content: content,
          has_poll: showVote, // 백엔드에서 받는 필드 이름에 맞춰야 함!
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (res.data.success) {
        alert("게시글이 성공적으로 등록되었습니다!");

        // 🔸 목록 페이지로 이동하고 새로고침하여 최신 글 표시
        navigate("/posts");
        window.location.reload();
      } else {
        alert("작성 실패: " + res.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.error("서버 응답 오류:", err.response.status, err.response.data);
      } else {
        console.error("요청 자체 실패:", err);
      }
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  // 🔹 작성 취소 시 목록으로 돌아가기
  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="relative w-[1007px] min-h-[750px] mt-[40px] ml-[217px] shadow-xl">
      {/* 상단 ▶ POST 표시 */}
      <div className="text-[#6C6C6C] text-sm font-semibold flex items-center mb-2 ml-1">
        <span className="mr-1">▶</span>
        <span>POST</span>
      </div>

      {/* 글쓰기 폼 영역 */}
      <div className="relative w-full bg-[#f6fff4] p-6 rounded-[10px] border border-[#a3a3a3] flex flex-col">
        {/* 제목 입력 + 투표 추가 버튼 */}
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

        {/* 내용 입력 + 투표 박스 */}
        <div className="flex flex-col flex-grow w-full gap-4 p-4 mb-4 bg-white border border-gray-300 rounded-md">
          {/* 🔧 h-full 제거 → 내용에 맞춰 자동 높이 */}
          <textarea
            className="w-full h-[300px] resize-none outline-none overflow-y-auto"
            placeholder="내용 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 투표 UI 노출 조건 */}
          {showVote && (
            <div>
              <VoteBox />
            </div>
          )}
        </div>

        {/* 하단 버튼들 */}
        <div className="flex justify-end gap-4 mt-2">
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

        {/* 제목/내용 누락 시 경고 팝업 */}
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
