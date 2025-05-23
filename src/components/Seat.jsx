import React from "react";

const Seat = ({ seat, onHover, onLeave, size = 23 }) => {
  if (!seat || seat.top === undefined || seat.left === undefined) return null;

  return (
    <div
      className={`
        absolute 
        border border-black 
        rounded-full 
        select-none 
        transition-all duration-300 ease-in-out 
        hover:scale-125 hover:shadow-xl
      `}
      style={{
        top: `${seat.top}px`,
        left: `${seat.left}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: seat.color || "#d9d9d9",
        cursor: "pointer",
        outline: "none",
        userSelect: "none",
      }}
      onMouseEnter={() => onHover && onHover(seat)}
      onMouseLeave={() => onLeave && onLeave()}
    />
  );
};

export default Seat;
