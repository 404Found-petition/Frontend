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


// SeatChartStatus.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";
import { API_BASE_URL } from "../config"; // 예: http://localhost:8000

const ROW_COUNTS = [48, 42, 39, 36, 33, 30, 27, 24, 21];
const CENTER_X = 500;
const CENTER_Y = -10;
const RADIUS_STEP = 30;
const innerMostRadius = 500 - ROW_COUNTS.length * RADIUS_STEP - 25;

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
  const [percentage, setPercentage] = useState(0);
  const [lawmembers, setLawmembers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/lawmembers/`)
      .then((res) => setLawmembers(res.data))
      .catch((err) => console.error(err));
  }, []);

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
      <svg width="1000" height="550" className="absolute top-0 left-0 z-0 overflow-visible">
        <path d={`M0,${CENTER_Y} A500,500 0 0,0 1000,${CENTER_Y}`} fill="#e5e5e5" />
        <path d={createSectorPath(percentage)} fill="#5CAB7C" />
      </svg>

      <div
        className="absolute text-[48px] font-bold text-black z-10 select-none"
        style={{
          top: `${CENTER_Y + innerMostRadius / 2 - 10}px`,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
          const lawmaker = lawmembers.find((lm) => lm.seat_number === seatNumber);

          const seat = {
            seat_number: seatNumber,
            top: y,
            left: x,
            name: lawmaker?.name || "",
            party: lawmaker?.party || "",
            bills: lawmaker?.bills.map((b) => b.title) || [],
            tags: [lawmaker?.representative_field] || [],
            imageSrc: lawmaker?.photo || "",
            color: lawmaker?.color || "#d9d9d9",
          };

          seatIndex++;

          return (
            <Seat
              key={seat.seat_number}
              seat={seat}
              onHover={() =>
                setHoveredSeat({
                  ...seat,
                  position: { top: seat.top - 90, left: seat.left + 15 },
                })
              }
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


