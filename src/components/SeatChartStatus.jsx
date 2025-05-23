import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";
import { API_BASE_URL } from "../config";

const ROW_COUNTS = [40, 40, 42, 37, 33, 32, 28, 23, 17, 8];
const CENTER_X = 500;
const CENTER_Y = -10;

const SeatChartStatus = ({ targetPercentage, isCompact }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [lawmembers, setLawmembers] = useState([]);

  const rowGap = isCompact ? 20 : 30;
  const innerMostRadius = 500 - ROW_COUNTS.length * rowGap - 25;

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

  useEffect(() => {
    api
      .get(`${API_BASE_URL}/api/lawmembers/`)
      .then((res) => setLawmembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (typeof targetPercentage !== "number") return;

    let current = 0;
    const final = Math.max(0, targetPercentage);
    const step = final > 0 ? final / 30 : 1;

    const interval = setInterval(() => {
      if (current >= final) {
        setPercentage(final);
        clearInterval(interval);
      } else {
        current += step;
        setPercentage(Math.min(Math.floor(current), final));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [targetPercentage]);

  let seatIndex = 0;

  return (
    // ✅ 전체 좌석 배치도 wrapper (중앙 정렬용 translateX 적용)
    <div
      className="relative overflow-visible transition-all duration-300 ease-in-out"
      style={{
        height: isCompact ? "300px" : "550px",
        width: isCompact ? "900px" : "1000px",
        position: "relative",
        left: "50%",                    // ✅ 가운데 정렬
        transform: "translateX(-50%)", // ✅ 가운데 정렬
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 550"
        className="absolute top-0 left-0 z-0 overflow-visible"
      >
        <path d={`M0,${CENTER_Y} A500,500 0 0,0 1000,${CENTER_Y}`} fill="#e5e5e5" />
        <path d={createSectorPath(percentage)} fill="#5CAB7C" />
      </svg>

      {/* ✅ 중앙 퍼센트 표시 */}
      <div
        className={`absolute font-bold text-black z-10 select-none ${isCompact ? "text-[36px]" : "text-[48px]"}`}
        style={{
          top: `${CENTER_Y + innerMostRadius / 2 - 10}px`,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {percentage}%
      </div>

      {/* ✅ 각 줄에 대해 좌석 생성 */}
      {ROW_COUNTS.map((count, rowIdx) => {
        const radius = 500 - (rowIdx + 1) * rowGap;
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
