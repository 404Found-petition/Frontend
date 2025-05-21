// src/context/PostContext.jsx
import { createContext, useState } from "react";

// ✅ 더미 데이터 넣기
const dummyPosts = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    title: `더미 게시글 제목 ${i + 1}`,
    content: `이것은 ${i + 1}번째 더미 게시글입니다.`,
    author: `user_${i + 1}`,
    created_at: "2025-05-19",
    vote_count: Math.floor(Math.random() * 100),
    comments: [
        {
            nickname: `댓글러${i + 1}`,
            content: `이것은 댓글 내용입니다.`,
            date: "2025-05-19",
        },
        {
            nickname: `유저${i + 1}`,
            content: `또 다른 댓글입니다.`,
            date: "2025-05-19",
        },
    ],
    vote_title: i % 2 === 0 ? "이 안건에 동의하십니까?" : null,
    voted: false,
    vote_result: { yes: 60, no: 40, voted_option: "yes" },
}));

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(dummyPosts); // ✅ 초기값을 더미로 설정

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};

