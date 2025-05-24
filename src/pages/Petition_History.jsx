import React from "react";
import PetitionList from "./PetitionList"; // 예측 결과 카드 목록 컴포넌트

const PetitionHistory = () => {
  return (
    <div className="px-10 py-5">
      <PetitionList
        apiEndpoint="/api/my-predictions/"
        hideSummaryButton={true} // ✅ 유저페이지에서는 summary 버튼 숨김
      />
    </div>
  );
};

export default PetitionHistory;

//5.24 1:15 한글 문구 삭제
//5.25 ✅ 유저페이지에서는 summary 버튼 숨기도록 hideSummaryButton 추가
