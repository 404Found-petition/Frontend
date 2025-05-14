import React from "react";

export const Box = ({ onCancel, onLogout }) => {
  return (
    <div className="w-[636px] h-[323px]">
      <div className="fixed w-[638px] h-[323px] top-0 left-0">
        <div className="w-[636px] h-[323px] bg-[#f6fff4] rounded-[11.44px] border-black">
          <div className="absolute w-[355px] top-[124px] left-[137px] font-semibold text-black text-[34.8px] text-center">
            로그아웃 하시겠습니까?
          </div>

          {/* CANCEL 버튼 */}
          <div
            className="left-[109px] absolute w-[169px] h-[41px] top-[220px] cursor-pointer"
            onClick={onCancel}
          >
            <div className="w-[167px] h-[41px] bg-[#5cab7c] rounded-[14.01px] border border-black">
              <div className="absolute w-[86px] top-[9px] left-10 text-white text-[16.8px] text-center">
                CANCEL
              </div>
            </div>
          </div>

          {/* LOGOUT 버튼 */}
          <div
            className="left-[357px] absolute w-[169px] h-[41px] top-[220px] cursor-pointer"
            onClick={onLogout}
          >
            <div className="w-[167px] h-[41px] bg-[#5cab7c] rounded-[14.01px] border border-black">
              <div className="absolute w-[86px] top-[9px] left-10 text-white text-[16.8px] text-center">
                LOGOUT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
