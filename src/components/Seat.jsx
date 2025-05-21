import React from "react";

const Seat = ({ seat, onHover, onLeave }) => {
  if (!seat || seat.top === undefined || seat.left === undefined) return null;

  return (
    <div
      className="absolute w-[23px] h-[23px] rounded-full border border-black select-none"
      style={{
        top: `${seat.top}px`,
        left: `${seat.left}px`,
        backgroundColor: seat.color || "#d9d9d9",
        cursor: "pointer",
        outline: "none",           // 포커스 외곽선 제거
        userSelect: "none",        // 텍스트 선택 방지
      }}
      onMouseEnter={() => onHover && onHover(seat)}
      onMouseLeave={() => onLeave && onLeave()}
    />

  );
};

export default Seat;
