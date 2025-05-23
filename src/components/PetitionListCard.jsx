import React, { useState, useRef, useEffect } from "react";

const PetitionListCard = ({ title, summary, probability, hideSummaryTag = false }) => {
  const [showSummary, setShowSummary] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [showSummary]);

  const splitTitleByLength = (title) => {
    const words = title.split(" ");
    let line1 = "";
    let line2 = "";
    let charCount = 0;

    for (let word of words) {
      const wordLength = word.replace(/\s/g, "").length;
      if (charCount + wordLength <= 10) {
        line1 += (line1 ? " " : "") + word;
        charCount += wordLength;
      } else {
        line2 += (line2 ? " " : "") + word;
      }
    }

    return [line1, line2];
  };

  const [line1, line2] = splitTitleByLength(title);

  return (
    <div className="relative w-[300px] h-[300px] bg-[#E3F8EB] rounded-[12px] p-4 border-[2px] border-black shadow-sm overflow-hidden">
      {/* ✅ summary 버튼은 조건부 렌더링 */}
      {!hideSummaryTag && (
        <button
          onClick={() => setShowSummary((prev) => !prev)}
          className="text-[13px] font-semibold px-3 py-1 border-[1.5px] border-black rounded-md bg-white shadow-sm"
        >
          {showSummary ? "title" : "summary"}
        </button>
      )}

      {/* ✅ 텍스트 영역 */}
      <div
        ref={scrollRef}
        className="absolute top-[50px] bottom-[80px] left-4 right-4 overflow-auto flex items-start justify-center text-center"
      >
        {hideSummaryTag || !showSummary ? (
          <div className="text-[22px] font-bold text-black leading-[1.6]">
            {line1}
            <br />
            {line2}
          </div>
        ) : (
          <p className="text-[15px] font-semibold text-gray-700 whitespace-pre-line">{summary}</p>
        )}
      </div>

      {/* ✅ 퍼센트 원형 바 */}
      <div className="absolute transform -translate-x-1/2 bottom-4 left-1/2">
        <div className="relative w-16 h-16">
          <svg className="absolute top-0 left-0 w-16 h-16">
            <circle
              cx="32"
              cy="32"
              r="25"
              stroke="black"
              strokeWidth="6"
              fill="none"
              strokeDasharray="157"
              strokeDashoffset={`${157 - (157 * probability) / 100}`}
              strokeLinecap="butt"
              transform="rotate(-90 32 32)"
            />
            <circle
              cx="32"
              cy="32"
              r="25"
              stroke="#5CAB7C"
              strokeWidth="5"
              fill="none"
              strokeDasharray="157"
              strokeDashoffset={`${157 - (157 * probability) / 100}`}
              strokeLinecap="butt"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black">
            {probability}%
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetitionListCard };

// 5.19 19:07 피그마 디자인대로 수정 중 아직 확인 X
// 5.19 19:29 색, 크기 조정 중
// 5.19 19:38 제목 색, 카드 크기 글자 줄바꿈 설정
// 5.19 19:41 좀 여백 없게 크기 키움
// 5.19 19:44 카드 내 글자 위치 조정, 글자 줄바꿈 한 줄에 10자로 설정
// 5.19 19:50 퍼센테이지바 모양 수정, 외곽선 두껍게
// 5.19 19:53 ㄴ 다시 수정
// 5.19 19:55 퍼센테이지 바 외곽선, 조금 두껍게
// 5.19 19:57 일단 완성
// 5.24 2:05 유저페이지 내 청원 이행 확률 예측 사용 기록에서는 summary 볼 필요 없어서 버튼 삭제
// 5.25 ✅ hideSummaryTag true일 때 summary 버튼 및 텍스트 전환 제거 (최종 반영)
