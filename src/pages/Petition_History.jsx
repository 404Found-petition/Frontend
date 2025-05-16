import React from "react";
import PetitionList from "./PetitionList"; // 동일한 디자인 재사용

const PetitionHistory = () => {
  return (
    <div className="px-10 py-5">
      <h2 className="text-2xl font-bold mb-6">청원 이행 확률 예측 사용기록</h2>
      <PetitionList apiEndpoint="/api/predictions/mine/" />
    </div>
  );
};

export default PetitionHistory; // ✅ 이 줄 추가
