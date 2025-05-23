import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { API_BASE_URL } from "../config";

export const EditUserInfo = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get(`${API_BASE_URL}/api/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserId(res.data.userid);
        setName(res.data.name);
        setPhone(res.data.phone_num);
      })
      .catch((err) => {
        console.error("❌ 사용자 정보 로딩 실패:", err);
      });
  }, []);

  const handleSubmit = async () => {
    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const token = localStorage.getItem("access");

    try {
      await api.put(
        `${API_BASE_URL}/api/update-user/`,
        {
          name,
          phone_num: phone,
          password,
          password_confirm: rePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("회원정보가 수정되었습니다.");
      navigate("/user");
    } catch (error) {
      console.error("❌ 회원정보 수정 실패:", error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-row justify-center w-full bg-white">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[750px] h-[706px] top-[70px] left-[345px] bg-[#f6fff4] rounded-[16.3px] border-[2.93px] border-solid border-[#3f7d58] shadow-[0px_1.3px_1.3px_#00000040]">
          <div
            className="absolute top-[30px] left-[693px] text-[22px] font-bold text-gray-600 cursor-pointer select-none"
            onClick={() => navigate("/user")}
          >
            ×
          </div>

          <div className="w-[286px] top-[63px] left-[228px] font-bold text-[48.1px] text-center absolute text-black">
            회원정보 수정
          </div>

          <div className="absolute w-[329px] h-[66px] top-64 left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#cecece] rounded-[3.18px] border-[0.64px] border-solid border-black" />
            <div className="w-10 top-0 left-0 absolute text-black text-[12.7px]">아이디</div>
            <input
              type="text"
              value={userId}
              readOnly
              className="absolute w-[300px] h-8 top-[27px] left-[13px] bg-transparent text-black text-[17.5px] outline-none"
            />
          </div>

          <div className="absolute w-[329px] h-[66px] top-[165px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">이름</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="absolute w-[300px] h-8 top-[27px] left-[13px] bg-transparent text-black text-[17.5px] outline-none"
            />
          </div>

          <div className="absolute w-[329px] h-[66px] top-[347px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">비밀번호</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute w-[300px] h-8 top-[27px] left-[13px] bg-transparent text-[#6b6b6b] text-[17.5px] outline-none"
            />
          </div>

          <div className="absolute w-[329px] h-[66px] top-[438px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">비밀번호 재확인</div>
            {rePassword && password && (
              <div className="absolute top-0 left-[110px]">
                {password === rePassword ? (
                  <p className="text-[#3F7D58] text-[12.4px]">✔ 비밀번호가 일치합니다</p>
                ) : (
                  <p className="text-[#e83232] text-[12.4px]">❌ 비밀번호가 일치하지 않습니다</p>
                )}
              </div>
            )}
            <input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="absolute w-[300px] h-8 top-[27px] left-[13px] bg-transparent text-[#6b6b6b] text-[17.5px] outline-none"
            />
          </div>

          <div className="absolute w-[329px] h-[66px] top-[529px] left-[212px]">
            <div className="absolute w-[327px] h-[45px] top-[21px] left-0 bg-[#f7f5f5] rounded-[3.18px] border border-black" />
            <div className="absolute top-0 left-0 text-black text-[12.7px]">핸드폰 번호</div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="absolute w-[300px] h-8 top-[27px] left-[13px] bg-transparent text-black text-[17.5px] outline-none"
            />
          </div>

          <div className="absolute w-[119px] h-[31px] top-[632px] left-[313px]">
            <div
              className="relative w-[117px] h-[31px] bg-[#5cab7c] rounded-[3.18px] border border-black cursor-pointer"
              onClick={handleSubmit}
            >
              <div className="absolute w-[60px] top-[7px] left-7 text-white text-[12.7px] text-center">
                Modify
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;


//5.21 2:58 입력할 수 있도록 수정
//5.21 3:03 비밀번호를 제외한 기본 정보는 입력되어있도록 설정
//5.21 3:09 회원정보가 수정되었습니다 뜨고 유저페이지로 이동
//5.22 22:36 백과 연동
//5.24 1:30 상자 위로 좀 올림