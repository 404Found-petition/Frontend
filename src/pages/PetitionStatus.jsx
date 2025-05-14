import React from "react";
import { PetitionCard } from "../components/PetitionCard"; // 경로 주의

export const PetitionStatus = () => {
  const petitionList = [
    {
      id: 1,
      title: "보건복지부",
      summary: "의료관련 법률 개정을\n제안합니다.",
      probability: 78,
    },
    {
      id: 2,
      title: "교육부",
      summary: "초등 교육과정 개편\n청원입니다.",
      probability: 64,
    },
  ];

  return (
    <div className="flex flex-col gap-6 items-center p-4">
      <h2 className="text-xl font-bold">청원 동의 현황</h2>
      {petitionList.map((p) => (
        <PetitionCard
          key={p.id}
          title={p.title}
          summary={p.summary}
          probability={p.probability}
        />
      ))}
    </div>
  );
};
