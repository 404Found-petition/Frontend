// src/components/CanvasWordcloud.jsx
import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

export default function CanvasWordcloud() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const words = [
            ["복지", 50],
            ["경제", 30],
            ["교육", 25],
            ["환경", 20],
            ["교통", 15],
        ];

        if (canvasRef.current) {
            WordCloud(canvasRef.current, {
                list: words,
                gridSize: 8,
                weightFactor: 5,
                fontFamily: "Impact",
                color: "random-dark",
                backgroundColor: "#ffffff",
                rotateRatio: 0.5,
                rotationSteps: 2,
                drawOutOfBound: false,
            });
        }
    }, []);

    return (
        <div className="flex justify-center items-center bg-white border-2 border-black shadow-md w-[600px] h-[400px]">
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    );
}