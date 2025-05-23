import React from "react";
import PetitionList from "./PetitionList"; // 예측 결과 카드 목록 컴포넌트

const PetitionHistory = () => {
  return (
    <div className="px-10 py-5">
      {/* 🔥 한글 문구 삭제 */}
      <PetitionList apiEndpoint="/api/my-predictions/" />
    </div>
  );
};

export default PetitionHistory;

//5.24 1:15 한글 문구 삭제