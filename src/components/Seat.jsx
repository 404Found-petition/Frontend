import React from "react";

const Seat = ({ seat, onHover, onLeave }) => {
  if (!seat || seat.top === undefined || seat.left === undefined) return null;

  return (
    <div
      className="absolute w-[27px] h-[27px] rounded-full border border-black bg-[#d9d9d9] hover:bg-green-300 cursor-pointer transition"
      style={{ top: `${seat.top}px`, left: `${seat.left}px` }}
      onMouseEnter={() => onHover(seat)}
      onMouseLeave={onLeave}
    />
  );
};

export default Seat;