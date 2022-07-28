import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { toggleLiked, toggleForLater } from "../store/trendsSlice";

function Trend({ trend }) {
  const dispatch = useDispatch();
  const [url, setURL] = useState("");

  const goToExamplePost = useCallback(async () => {
    try {
      const response = await (await axios.get(trend.tag.url)).data;
      setURL(response.posts[0].URL);
    } catch (error) {
      throw new Error(error.message);
    }
  }, [trend.tag.url]);

  useEffect(() => {
    goToExamplePost();
  }, [goToExamplePost]);

  return (
    <div className="trend" key={trend.id}>
      <h4>{trend.tag.title}</h4>
      <div className="trend__header">Count: {trend.count}</div>
      <div className="buttons">
        <a
          href={url}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to example post
        </a>
        <BiTimeFive
          style={{
            color: trend.forLater ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleForLater(trend.id))}
        />
        <BsFillHeartFill
          style={{
            color: trend.liked ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleLiked(trend.id))}
        />
      </div>
    </div>
  );
}

export default Trend;
