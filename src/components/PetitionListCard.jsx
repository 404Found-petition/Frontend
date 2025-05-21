import React from "react";

const PetitionListCard = ({ title, summary, probability, department }) => {
  // 제목 줄바꿈 로직 (띄어쓰기 제외 10글자 기준)
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
    <div className="w-[300px] h-[300px] bg-[#E3F8EB] rounded-[12px] p-4 border-[2px] border-black shadow-sm flex flex-col">
      {/* 부서명 */}
      <div className="text-[11.08px] text-left text-gray-700">{department}</div>

      {/* 제목 + 내용 + 퍼센트바 그룹 */}
      <div className="flex flex-col items-center justify-center flex-1 scale-[1.3] origin-center">
        {/* 제목 */}
        <div className="text-center mt-2 font-bold leading-tight text-[19.95px] text-[#000000]">
          {line1}
          <br />
          {line2}
        </div>

        {/* 요약 */}
        <div className="text-center mt-2 text-[12.68px] text-gray-700">
          {summary}
        </div>

        {/* 퍼센트 원형 바 */}
        <div className="flex justify-center items-center mt-4">
          <div className="relative w-16 h-16">
            <svg className="absolute top-0 left-0 w-16 h-16">
              {/* 바깥 검정 외곽선 */}
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
              {/* 초록 퍼센트 바 (두께 + 외곽선 효과) */}
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
    </div>
  );
};

export { PetitionListCard };




//5.19 19:07 피그마 디자인대로 수정 중 아직 확인 X
//5.19 19:29 색, 크기 조정 중
//5.19 19:38 제목 색, 카드 크기 글자 줄바꿈 설정
//5.19 19:41 좀 여백 없게 크기 키움
//5.19 19:44 카드 내 글자 위치 조정, 글자 줄바꿈 한 줄에 10자로 설정
//5.19 19:50 퍼센테이지바 모양 수정, 외곽선 두껍게
//5.19 19:53 ㄴ 다시 수정
//5.19 19:55 퍼센테이지 바 외곽선, 조금 두껍게
//5.19 19: 57 일단 완성