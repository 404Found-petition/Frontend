import React from "react";
import PetitionList from "./PetitionList"; // 예측 결과 카드 목록 컴포넌트

const PetitionHistory = () => {
  return (
    <div className="px-10 py-5">
      <h2 className="mb-6 text-2xl font-bold">청원 이행 확률 예측 전체 기록</h2>
      {/* ✅ 로그인한 사용자의 예측 기록 API 사용 */}
      <PetitionList apiEndpoint="/api/my-predictions/" />
    </div>
  );
};

export default PetitionHistory;
