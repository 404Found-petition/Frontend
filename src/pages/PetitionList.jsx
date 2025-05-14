import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { PetitionCardList } from "../components/PetitionCard_List";

const PetitionList = ({ apiEndpoint = "/api/posts/" }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}?page=${page}`)
      .then((res) => {
        setPosts(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [page, apiEndpoint]);

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <Header centeredLogo />

      <div className="w-[1336px] mt-10 rounded-[34px] border-2 border-black p-10">
        <h2 className="text-[28px] font-bold text-center text-gray-700 mb-6">
          Status of Petition Agreement
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <PetitionCard
              key={index}
              title={post.title}
              summary={post.content}
              probability={post.percentage}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`text-lg px-3 py-1 ${
                  page === n ? "font-bold border-b-2 border-black" : "text-gray-600"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetitionList;
