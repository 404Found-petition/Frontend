// 🔒 기존 API 연동용 원본 코드 (후에 복구를 위해 주석 처리 보존)
/*
import React, { useState } from "react";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";

const ROW_COUNTS = [48, 42, 39, 36, 33, 30, 27, 24, 21];
const CENTER_X = 500;
const CENTER_Y = -10;
const RADIUS_STEP = 30;

const SeatChartStatus = ({ lawmakers = [], percentage = 0 }) => {
  const seatPadding = 15;
  const positionOffsetX = -15;
  const fullInnerMostRadius = 500 - ROW_COUNTS.length * RADIUS_STEP - 10;
  const innerMostRadius = fullInnerMostRadius - seatPadding;

  const [hoveredSeat, setHoveredSeat] = useState(null);

  const createSectorPath = (percent) => {
    const radius = innerMostRadius;
    const angle = (percent / 100) * 180;
    const startAngle = 0;
    const endAngle = angle;

    const startX = CENTER_X + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = CENTER_Y + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = CENTER_X + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = CENTER_Y + radius * Math.sin((endAngle * Math.PI) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M${CENTER_X},${CENTER_Y} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
  };

  let seatIndex = 0;

  return (
    <div className="relative w-[1000px] h-[550px] mx-auto overflow-visible">
      <svg width="1000" height="550" viewBox="0 0 1000 550" className="absolute top-0 left-0 z-0 overflow-visible">
        <path d={`M0,${CENTER_Y} A500,500 0 0,0 1000,${CENTER_Y}`} fill="#e5e5e5" />
        <path d={createSectorPath(percentage)} fill="#5CAB7C" />
      </svg>

      <div className="absolute text-[48px] font-bold text-black z-10 select-none"
        style={{ top: `${CENTER_Y + innerMostRadius / 2 - 10}px`, left: "50%", transform: "translate(-50%, -50%)" }}>
        {percentage}%
      </div>

      {ROW_COUNTS.map((count, rowIdx) => {
        const radius = 500 - (rowIdx + 1) * RADIUS_STEP;
        const angleStep = 180 / (count - 1);
        return Array.from({ length: count }).map((_, i) => {
          const angle = (180 + i * angleStep) * (Math.PI / 180);
          const x = CENTER_X + radius * Math.cos(angle) - 15;
          const y = CENTER_Y - radius * Math.sin(angle);

          const seatNumber = seatIndex + 1;
          const lawmaker = lawmakers.find((lm) => lm.seat_number === seatNumber);

          const seat = {
            seat_number: seatNumber,
            top: y,
            left: x,
            name: lawmaker?.name || "",
            party: lawmaker?.party || "",
            tags: lawmaker?.tags || [],
            bills: lawmaker?.bills || [],
            color: lawmaker?.color || "#d9d9d9",
          };
          seatIndex++;

          return (
            <Seat
              key={seat.seat_number}
              seat={seat}
              onHover={() => setHoveredSeat({...})}
              onLeave={() => setHoveredSeat(null)}
            />
          );
        });
      })}

      {hoveredSeat && <Tooltip {...hoveredSeat} />}
    </div>
  );
};

export default SeatChartStatus;
*/


// 🧪 UI 테스트용 코드 (더미 데이터 사용, API 연결 없이 동작)
// 🎯 SeatChartStatus.jsx - 국회의원 좌석 배치도 + 확률 게이지 애니메이션 표시
// 👉 전달받은 percentage 값을 기반으로 중앙 게이지 애니메이션 + 더미 의원 표시

import React, { useState, useEffect } from "react";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";

// ✅ 대표 분야 색상 설정
const CATEGORY_COLORS = {
  "교육": "#FFF12B", // 노란색
  // 필요한 분야만 추가
};

// ✅ 좌석 행별 갯수
const ROW_COUNTS = [48, 42, 39, 36, 33, 30, 27, 24, 21];
const CENTER_X = 500;
const CENTER_Y = -10;
const RADIUS_STEP = 30;
const innerMostRadius = 500 - ROW_COUNTS.length * RADIUS_STEP - 25;

// 🧪 [더미 데이터] 의원 정보
const dummyLawmaker = {
  name: "홍길동",
  party: "더불어민주당",
  representative_field: "교육",
  tags: ["입시", "교육정책"],
  bills: ["고등교육 강화법"],
  color: CATEGORY_COLORS["교육"]
};

// 🧪 [더미 데이터] 300명 좌석용 의원 더미 배열
const dummyLawmakers = Array.from({ length: 300 }).map((_, i) => ({
  seat_number: i + 1,
  ...dummyLawmaker
}));

// ✅ 확률 게이지 (sector path 생성 함수)
const createSectorPath = (percent) => {
  const radius = innerMostRadius;
  const angle = (percent / 100) * 180;
  const startX = CENTER_X + radius * Math.cos(0);
  const startY = CENTER_Y + radius * Math.sin(0);
  const endX = CENTER_X + radius * Math.cos((angle * Math.PI) / 180);
  const endY = CENTER_Y + radius * Math.sin((angle * Math.PI) / 180);
  const largeArcFlag = angle > 180 ? 1 : 0;

  return `M${CENTER_X},${CENTER_Y} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
};

const SeatChartStatus = ({ targetPercentage }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [percentage, setPercentage] = useState(0); // 내부 상태로 애니메이션용 퍼센트

  // ✅ 퍼센트가 바뀔 때마다 0 → targetPercentage 애니메이션
  useEffect(() => {
    let current = 0;
    const step = targetPercentage / 30;
    const interval = setInterval(() => {
      current += step;
      if (current >= targetPercentage) {
        setPercentage(targetPercentage);
        clearInterval(interval);
      } else {
        setPercentage(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [targetPercentage]);

  let seatIndex = 0;

  return (
    <div className="relative w-[1000px] h-[550px] mx-auto overflow-visible">
      {/* 🟩 반원 + 확률 게이지 표시 */}
      <svg width="1000" height="550" viewBox="0 0 1000 550" className="absolute top-0 left-0 z-0 overflow-visible">
        <path d={`M0,${CENTER_Y} A500,500 0 0,0 1000,${CENTER_Y}`} fill="#e5e5e5" />
        <path d={createSectorPath(percentage)} fill="#5CAB7C" />
      </svg>

      {/* ✅ 중앙 숫자 퍼센트 텍스트 */}
      <div
        className="absolute text-[48px] font-bold text-black z-10 select-none"
        style={{ top: `${CENTER_Y + innerMostRadius / 2 - 10}px`, left: "50%", transform: "translate(-50%, -50%)" }}>
        {percentage}%
      </div>

      {/* 🧪 [더미 데이터] 300명 좌석 렌더링 */}
      {ROW_COUNTS.map((count, rowIdx) => {
        const radius = 500 - (rowIdx + 1) * RADIUS_STEP;
        const angleStep = 180 / (count - 1);
        return Array.from({ length: count }).map((_, i) => {
          const angle = (180 + i * angleStep) * (Math.PI / 180);
          const x = CENTER_X + radius * Math.cos(angle) - 15;
          const y = CENTER_Y - radius * Math.sin(angle);

          const seat = {
            ...dummyLawmakers[seatIndex],
            top: y,
            left: x
          };

          seatIndex++;

          return (
            <Seat
              key={seat.seat_number}
              seat={seat}
              onHover={() =>
                setHoveredSeat({
                  name: seat.name,
                  party: seat.party,
                  tags: seat.tags,
                  bills: seat.bills,
                  position: { top: seat.top - 90, left: seat.left + 15 },
                })
              }
              onLeave={() => setHoveredSeat(null)}
            />
          );
        });
      })}

      {/* ⬆️ 마우스 오버 시 툴팁 표시 */}
      {hoveredSeat && <Tooltip {...hoveredSeat} />}
    </div>
  );
};

export default SeatChartStatus;
