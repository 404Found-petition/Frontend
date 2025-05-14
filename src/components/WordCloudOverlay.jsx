//마우스 오버 효과 발생시 워드 클라우드 확대해서 보여줌

import React from "react";
import WordCloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const overlayOptions = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [40, 120], // 확대용
};

export default function WordCloudOverlay({ words }) {
  return (
    <div
      className="w-[820px] h-[500px] bg-white border-[2.72px] border-black border-solid shadow-xl flex justify-center items-center"
    >
      <div style={{ width: "700px", height: "400px" }}>
        <WordCloud words={words} options={overlayOptions} />
      </div>
    </div>
  );
}
