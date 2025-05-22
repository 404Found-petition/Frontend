// 의원 좌석 배치 화면 (Screen.jsx)

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 사용해 API 요청
import SERVER_IP from "../config"; // 백엔드 API 주소 중앙 관리용
import SeatChartStatus from "../components/SeatChartStatus"; // 퍼센트와 좌석 표시 컴포넌트
import Seat from "../components/Seat"; // 개별 좌석 컴포넌트 (여기선 직접 사용 X)
import { Tooltip } from "../components/Tooltip"; // 마우스 오버 시 보여지는 툴팁

// 청원 분야별 대표 색상 정의
const FIELD_COLORS = {
  "정치·행정": "#70B7FF",
  "사회": "#B1FF9A",
  "경제·산업": "#F2B856",
  "교육": "#FFF12B",
  "환경": "#42D583",
  "국방·외교": "#FF8D8D",
  "기타": "#AAAAAA",
};

// 각 줄마다 좌석 수 정의 (안쪽 → 바깥쪽으로 9줄)
const ROW_COUNTS = [21, 24, 27, 30, 33, 36, 39, 42, 48];

// 원형 좌석 배치의 중심 좌표
const CENTER_X = 208;
const CENTER_Y = 208;

// 줄 간의 반지름 간격
const RADIUS_STEP = 22;

// 의원 데이터 배열을 받아서 화면상 좌석 좌표와 툴팁용 정보 생성
const generateLawmakerPositions = (lawmembers) => {
  let seatIndex = 0;
  return ROW_COUNTS.flatMap((count, rowIdx) => {
    const radius = (rowIdx + 1) * RADIUS_STEP; // 현재 줄의 반지름 계산
    const angleStep = 180 / (count - 1); // 각 좌석 사이 각도

    return Array.from({ length: count }).map((_, i) => {
      const angle = (180 - i * angleStep) * (Math.PI / 180); // 도 → 라디안 변환
      const x = CENTER_X + radius * Math.cos(angle);
      const y = CENTER_Y + radius * Math.sin(angle);

      const law = lawmembers[seatIndex]; // 각 좌석에 해당하는 의원

      const seat = {
        seat_number: seatIndex + 1,
        top: y,
        left: x,
        name: law?.name || "",
        party: law?.party || "",
        tags: law?.tags || [],
        bills: law?.bills || [],
        image: law?.image || "/images/placeholder.png", // 이미지 없을 경우 기본값
        color: FIELD_COLORS[law?.representative_field] || "#d9d9d9", // 분야별 색상
      };

      seatIndex++;
      return seat;
    });
  });
};

const Screen = () => {
  // 상태(state) 정의
  const [lawmembers, setLawmembers] = useState([]); // 전체 국회의원 데이터
  const [hoveredSeat, setHoveredSeat] = useState(null); // 마우스 오버된 좌석
  const [petitionProb, setPetitionProb] = useState(null); // 예측 확률 (백분율)

  // 페이지 로드시 한번 실행되는 데이터 요청
  useEffect(() => {
    // 1. 국회의원 정보 불러오기
    axios.get(`${SERVER_IP}/api/lawmembers/`)
      .then((res) => setLawmembers(res.data)) // 성공 시 데이터 저장
      .catch((err) => {
        console.error("의원 데이터 오류", err);
        setLawmembers([]); // 실패 시 빈 배열로 초기화
      });

    // 2. 최신 청원 예측 확률 불러오기
    axios.get(`${SERVER_IP}/api/predict-latest/`)
      .then((res) => {
        const p = res.data?.probability;
        if (typeof p === "number") setPetitionProb(Math.round(p * 100)); // 소수 → 백분율
      })
      .catch((err) => {
        console.error("청원 예측 오류", err);
        setPetitionProb(78); // 실패 시 기본값으로 설정
      });
  }, []);

  // 좌석 데이터 생성 (좌표 + 툴팁에 표시될 정보)
  const seats = generateLawmakerPositions(lawmembers);

  return (
    <div className="relative w-[1244px] h-[1259px]">
      {/* 예측 퍼센트가 준비된 후 좌석 차트 표시 */}
      {petitionProb !== null && (
        <SeatChartStatus
          percentage={petitionProb} // 예측 확률 %
          lawmakers={seats}         // 좌석 위치 및 의원 정보
          onHover={setHoveredSeat}  // 마우스 오버 시 좌석 정보 저장
          onLeave={() => setHoveredSeat(null)} // 마우스 벗어나면 툴팁 제거
        />
      )}

      {/* 마우스 오버된 좌석이 있을 경우 툴팁 표시 */}
      {hoveredSeat && (
        <Tooltip
          name={hoveredSeat.name}
          party={hoveredSeat.party}
          tags={hoveredSeat.tags}
          bills={hoveredSeat.bills}
          imageSrc={hoveredSeat.image}
          position={{
            top: (hoveredSeat.top ?? 0) - 80, // 툴팁 위치 조정 (좌석 기준 위로)
            left: (hoveredSeat.left ?? 0) + 30,
          }}
        />
      )}
    </div>
  );
};

export default Screen;
