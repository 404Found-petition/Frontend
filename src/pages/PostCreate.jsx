import React, { useState } from "react";
import Header from "../components/Header";
import PostForm from "../components/PostForm";

const PostCreate = () => {
  const [showVote, setShowVote] = useState(false);

  return (
    <div className="bg-white w-full flex justify-center">
      <div className="w-[1440px] h-[1024px] relative">
        <Header />
        <PostForm showVote={showVote} setShowVote={setShowVote} />
      </div>
    </div>
  );
};

export default PostCreate;
