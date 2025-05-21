import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { SignUpSuccess } from "./pages/SignUp_Success"; // ✅ named import
import UserPage from "./pages/User_page"; // ✅ 파일명 정확히 반영
import './styles/global.css';
import EditUserInfo from "./pages/EditUser"; // ✅ default import
import WithdrawMessage from "./pages/Withdraw_message";
import WithdrawalComplete from "./pages/WithdrawalComplete";

// ✅ localStorage를 기반으로 로그인 여부 확인 (access 키 기준)
const isLoggedIn = !!localStorage.getItem("access");

function App() {
  return (
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
        <Route path="/withdraw" element={<WithdrawMessage />} /> {/* ✅ 이 줄 추가 */}
        <Route path="/withdrawal-complete" element={<WithdrawalComplete />} /> {/* ✅ 이 줄도 */}

        {/* 로그인된 사용자만 접근 가능한 경로들 */}
        <Route
          path="/posts/create"
          element={isLoggedIn ? <PostCreate /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={isLoggedIn ? <UserPage /> : <Navigate to="/login" />}
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
//5.15 23:14 회원가입시 회원가입 성공 창 나오도록 수정
// 5.20 화면 이동시 최상단 화면부터 표시 되도록
//5.20 21:25 유저 페이지로 이동할 수 있도록