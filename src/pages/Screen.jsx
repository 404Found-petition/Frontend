import { useEffect, useState } from "react";
import Seat from "../components/Seat";
import { Tooltip } from "../components/Tooltip";
import { SearchBar } from "./SearchBar";
import SeatChartStatus from "../components/SeatChartStatus"; // ✅ 퍼센트 반원 컴포넌트 import 추가 <<이거 수정 12:26
import seatPositions from "../data/seatPositions.json";

const Screen = () => {
  const [lawmakers, setLawmakers] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [petitionProb, setPetitionProb] = useState(null);

  useEffect(() => {
    // 백엔드에서 국회의원 정보 + 청원 키워드 + 법안 등 통합 데이터 받아옴
    fetch("/api/lawmembers")
      .then((res) => res.json())
      .then((data) => {
        const merged = data.map((law) => {
          const pos = seatPositions.find((p) => p.seat_number === law.seat_number);
          return {
            ...law,
            top: pos?.top || 0,
            left: pos?.left || 0,
          };
        });
        setLawmakers(merged);
      });

    // ✅ 청원 확률 데이터 가져오기
    fetch("/api/predict-latest")
      .then((res) => res.json())
      .then((data) => {
        setPetitionProb(Math.round(data.probability * 100));
      });
  }, []);

  return (
    <div className="relative w-[1244px] h-[1259px]">
      {/* ✅ 청원 이행 퍼센트 반원 컴포넌트 */}
      {petitionProb !== null && <SeatChartStatus percentage={petitionProb} />}

      {/* ✅ 의원 좌석 렌더링 */}
      {lawmakers.map((seat) => (
        <Seat
          key={seat.seat_number}
          seat={seat}
          onHover={setHoveredSeat}
          onLeave={() => setHoveredSeat(null)}
        />
      ))}

      {/* ✅ 마우스 오버 툴팁 */}
      {hoveredSeat && (
        <Tooltip
          name={hoveredSeat.name}
          party={hoveredSeat.party}
          tags={hoveredSeat.tags}
          bills={hoveredSeat.bills}
          imageSrc={hoveredSeat.image}
          position={{ top: hoveredSeat.top - 80, left: hoveredSeat.left + 30 }}
        />
      )}
    </div>
  );
};

export default Screen;


//6:50 seatData.json 수정으로 인한 수정