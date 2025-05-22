import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ 추가

import ScrollToTop from "./components/ScrollToTop";
import PostList from "./pages/PostList";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import PostListHistory from "./pages/PostList_History";
import PetitionHistory from "./pages/Petition_History";
import PetitionList from "./pages/PetitionList";
import { SignUpSuccess } from "./pages/SignUp_Success";
import UserPage from "./pages/User_page";
import EditUserInfo from "./pages/EditUser";
import WithdrawMessage from "./pages/Withdraw_message";
import WithdrawalComplete from "./pages/WithdrawalComplete";
import { PostProvider } from "./context/PostContext";

import './styles/global.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access && access !== "undefined" && access !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="993737985073-qhthheoiruduqv4oaem4ao6evq4i4ovm.apps.googleusercontent.com">
      <PostProvider>
        <Router>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/success" element={<SignUpSuccess />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/history" element={<PostListHistory />} />
            <Route path="/petitions/history" element={<PetitionHistory />} />
            <Route path="/petitionlist" element={<PetitionList />} />
            <Route path="/edit-user" element={<EditUserInfo />} />
            <Route path="/withdraw" element={<WithdrawMessage />} />
            <Route path="/withdrawal-complete" element={<WithdrawalComplete />} />

            <Route
              path="/posts/create"
              element={isLoggedIn ? <PostCreate /> : <Navigate to="/login" />}
            />
            <Route
              path="/user"
              element={isLoggedIn ? <UserPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      </PostProvider>
    </GoogleOAuthProvider>
  );
}

export default App;



// Header 컴포넌트를 모든 페이지 상단에 고정되도록 추가
// 라우팅 구조는 기본 홈, 로그인, 회원가입, 게시글 목록, 작성 페이지 구성
//5.14 프론트 테스트 위해 수정 우선 비로그인 상태로 UI 파악할 수 있도록
//5.15 23:14 회원가입시 회원가입 성공 창 나오도록 수정
// 5.20 화면 이동시 최상단 화면부터 표시 되도록
//5.20 21:25 유저 페이지로 이동할 수 있도록
//5.21 들어가자마자 로그인 되어있는 문제 해결(아직 확인중)