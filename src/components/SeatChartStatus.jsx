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
import React, { useState } from "react";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";

const CATEGORY_COLORS = {
  "정치·행정": "#70B7FF",
  "사회": "#B1FF9A",
  "경제·산업": "#F2B856",
  "교육": "#FFF12B",
  "환경": "#42D583",
  "기타": "#AAAAAA"
};

const ROW_COUNTS = [48, 42, 39, 36, 33, 30, 27, 24, 21];
const CENTER_X = 500;
const CENTER_Y = -10;
const RADIUS_STEP = 30;
const innerMostRadius = 500 - ROW_COUNTS.length * RADIUS_STEP - 25;

// 🎯 모든 좌석이 동일한 더미 정보로 채워진 테스트용 lawmaker
const dummyLawmaker = {
  name: "홍길동",
  party: "더불어민주당",
  representative_field: "교육",
  tags: ["입시", "학교제도", "교육정책"],
  bills: ["고등교육 강화법", "사교육 축소법", "무상교육 확대안"],
  color: CATEGORY_COLORS["교육"]
};

const dummyLawmakers = Array.from({ length: 300 }).map((_, i) => ({
  seat_number: i + 1,
  ...dummyLawmaker
}));

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

const SeatChartStatus = () => {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const percentage = 78; // ✅ 테스트용 확률 값
  let seatIndex = 0;

  return (
    <div className="relative w-[1000px] h-[550px] mx-auto overflow-visible">
      <svg width="1000" height="550" viewBox="0 0 1000 550" className="absolute top-0 left-0 z-0 overflow-visible">
        <path d={`M0,${CENTER_Y} A500,500 0 0,0 1000,${CENTER_Y}`} fill="#e5e5e5" />
        <path d={createSectorPath(percentage)} fill="#5CAB7C" />
      </svg>

      <div
        className="absolute text-[48px] font-bold text-black z-10 select-none"
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
              onHover={() => setHoveredSeat({
                name: seat.name,
                party: seat.party,
                tags: seat.tags,
                bills: seat.bills,
                position: {
                  top: seat.top - 90,
                  left: seat.left + 15,
                }
              })}
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
