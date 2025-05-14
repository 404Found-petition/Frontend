import React from "react";
import PetitionList from "./PetitionList"; // 동일한 디자인 재사용

const PetitionHistory = () => {
  return (
    <PetitionList apiEndpoint="/api/predictions/mine/" />
  );
};

export default PetitionHistory;
