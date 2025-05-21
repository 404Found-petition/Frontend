import React, { useEffect, useState } from "react";
import SeatChartStatus from "../components/SeatChartStatus";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";

// 카테고리별 대표 색상 정의
const FIELD_COLORS = {
  "정치·행정": "#70B7FF",
  "사회": "#B1FF9A",
  "경제·산업": "#F2B856",
  "교육": "#FFF12B",
  "환경": "#42D583",
  "국방·외교": "#FF8D8D",
  "기타": "#AAAAAA",
};

// 각 반원 줄에 배치될 좌석 수
const ROW_COUNTS = [21, 24, 27, 30, 33, 36, 39, 42, 48];
// 반원의 중심 좌표
const CENTER_X = 208;
const CENTER_Y = 208;
// 반지름 간격
const RADIUS_STEP = 22;

// 의원 배열을 받아서 좌석 위치 및 정보 객체를 생성
const generateLawmakerPositions = (lawmembers) => {
  let seatIndex = 0;
  return ROW_COUNTS.flatMap((count, rowIdx) => {
    const radius = (rowIdx + 1) * RADIUS_STEP;
    const angleStep = 180 / (count - 1); // 반원 기준 각도 간격

    return Array.from({ length: count }).map((_, i) => {
      const angle = (180 - i * angleStep) * (Math.PI / 180); // 도 → 라디안 변환
      const x = CENTER_X + radius * Math.cos(angle);
      const y = CENTER_Y + radius * Math.sin(angle);

      const law = lawmembers[seatIndex];

      const seat = {
        seat_number: seatIndex + 1,
        top: y,
        left: x,
        name: law?.name || "",
        party: law?.party || "",
        tags: law?.tags || [],
        bills: law?.bills || [],
        image: law?.image || "/images/placeholder.png", // 이미지 없을 경우 대체 이미지
        color: FIELD_COLORS[law?.representative_field] || "#d9d9d9", // 지정된 분야 색상 또는 회색
      };

      seatIndex++;
      return seat;
    });
  });
};

const Screen = () => {
  const [lawmembers, setLawmembers] = useState([]); // 의원 전체 데이터
  const [hoveredSeat, setHoveredSeat] = useState(null); // 마우스 오버된 좌석 정보
  const [petitionProb, setPetitionProb] = useState(null); // 최신 청원 예측 확률

  // 페이지 처음 렌더링될 때 API 호출
  useEffect(() => {
    // 국회의원 정보 로드
    fetch("/api/lawmembers")
      .then((res) => res.json())
      .then((data) => setLawmembers(data))
      .catch((err) => {
        console.error("의원 데이터 오류", err);
        setLawmembers([]);
      });

    // 청원 예측 확률 로드
    fetch("/api/predict-latest")
      .then((res) => res.json())
      .then((data) => {
        const p = data?.probability;
        if (typeof p === "number") setPetitionProb(Math.round(p * 100)); // 백분율로 환산
      })
      .catch((err) => {
        console.error("청원 예측 오류", err);
        setPetitionProb(78); // 오류 시 fallback 값
      });
  }, []);

  // 좌석 위치 데이터 생성
  const seats = generateLawmakerPositions(lawmembers);

  return (
    <div className="relative w-[1244px] h-[1259px]">
      {/* 좌석 차트 + 예측 퍼센트 표시 */}
      {petitionProb !== null && (
        <SeatChartStatus
          percentage={petitionProb}
          lawmakers={seats}
          onHover={setHoveredSeat} // 마우스 오버 시 좌석 정보 설정
          onLeave={() => setHoveredSeat(null)} // 마우스가 벗어나면 툴팁 제거
        />
      )}

      {/* 마우스 오버 시 툴팁 표시 */}
      {hoveredSeat && (
        <Tooltip
          name={hoveredSeat.name}
          party={hoveredSeat.party}
          tags={hoveredSeat.tags}
          bills={hoveredSeat.bills}
          imageSrc={hoveredSeat.image}
          position={{
            top: (hoveredSeat.top ?? 0) - 80, // 좌석 위치 기준 툴팁 위쪽
            left: (hoveredSeat.left ?? 0) + 30, // 좌석 위치 기준 툴팁 오른쪽
          }}
        />
      )}
    </div>
  );
};

export default Screen;
