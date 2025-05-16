import { useEffect, useState } from "react";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";
import SeatChartStatus from "../components/SeatChartStatus";
import seatPositions from "../data/seatPositions.json";

const Screen = () => {
  const [lawmakers, setLawmakers] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [petitionProb, setPetitionProb] = useState(null);

  useEffect(() => {
    // 의원 정보 불러오기
    fetch("/api/lawmembers")
      .then((res) => res.json())
      .then((data) => {
        const merged = Array.isArray(data)
          ? data.map((law) => {
              const pos = seatPositions.find((p) => p.seat_number === law.seat_number);
              return {
                ...law,
                top: pos?.top ?? 0,
                left: pos?.left ?? 0,
              };
            })
          : [];

        console.log("좌석 데이터 (merged):", merged); // <-- 좌석 데이터 확인용

        setLawmakers(merged);
      })
      .catch((err) => {
        console.error("의원 데이터 오류", err);

        // fallback mock
        setLawmakers([
          {
            name: "홍길동",
            party: "무소속",
            seat_number: 101,
            top: 100,
            left: 200,
            tags: ["정치", "복지"],
            bills: ["복지법 개정안", "국회 운영 개선안"],
            image: "/images/placeholder.png",
          },
        ]);
      });

    // 청원 확률
    fetch("/api/predict-latest")
      .then((res) => res.json())
      .then((data) => {
        const p = data?.probability;
         console.log("청원 예측 확률:", p);  // 여기 추가
        if (typeof p === "number") setPetitionProb(Math.round(p * 100));
      })
      .catch((err) => {
        console.error("청원 예측 오류", err);
        setPetitionProb(78); // fallback mock
      });
  }, []);

  return (
    <div className="relative w-[1244px] h-[1259px]">
      {/* 퍼센트 반원 */}
      {petitionProb !== null && <SeatChartStatus percentage={petitionProb} />}

      {/* 의원 좌석 */}
      {Array.isArray(lawmakers) &&
        lawmakers.map((seat) => (
          <Seat
            key={seat.seat_number}
            seat={seat}
            onHover={setHoveredSeat}
            onLeave={() => setHoveredSeat(null)}
          />
        ))}

      {/* 좌석 위치 확인용 빨간 점 표시 */}
      {Array.isArray(lawmakers) &&
        lawmakers.map((seat) => (
          <div
            key={`debug-dot-${seat.seat_number}`}
            style={{
              position: "absolute",
              top: seat.top,
              left: seat.left,
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          />
        ))}

      {/* 툴팁 */}
      {hoveredSeat && (
        <Tooltip
          name={hoveredSeat.name}
          party={hoveredSeat.party}
          tags={hoveredSeat.tags || []}
          bills={hoveredSeat.bills || []}
          imageSrc={hoveredSeat.image}
          position={{
            top: (hoveredSeat.top ?? 0) - 80,
            left: (hoveredSeat.left ?? 0) + 30,
          }}
        />
      )}
    </div>
  );
};

export default Screen;
