import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./pages/PostList";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import PetitionHistory from "./pages/Petition_History";

// TODO: 실제 로그인 상태는 Context나 전역 상태로 관리 예정
const isLoggedIn = false; // 테스트용, 나중에 연동 필요

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/my-predictions" element={<PetitionHistory />} />

        {/* 로그인된 사용자만 접근 가능 */}
        <Route
          path="/posts/create"
          element={isLoggedIn ? <PostCreate /> : <Navigate to="/login" />}
        />

        {/* 추후 404 페이지 필요 시 여기 추가 가능 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



// Header 컴포넌트를 모든 페이지 상단에 고정되도록 추가
// 라우팅 구조는 기본 홈, 로그인, 회원가입, 게시글 목록, 작성 페이지 구성
//5.14 프론트 테스트 위해 수정 우선 비로그인 상태로 UI 파악할 수 있도록