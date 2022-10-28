import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLiked, toggleForLater } from "../store/commentsSlice";
import { BsFillHeartFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

function Comment({ comment }) {
  const [url, setURL] = useState("");
  const goToPost = useCallback(async () => {
    try {
      const response = (await axios.get(comment.post.link)).data.URL;
      setURL(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }, [comment.post.link]);

  useEffect(() => {
    goToPost();
  }, [goToPost]);

  const dispatch = useDispatch();
  return (
    <div className="comment">
      <div className="comment__post">
        <h2>Post</h2>
        <p>
          <b>Title: </b>
          <span className="comment__title">{comment.post.title}</span>
        </p>
      </div>
      <div className="comment__author">
        <div
          style={{ backgroundImage: `url(${comment.author.avatar})` }}
          src={comment.author.avatar}
          className="comment__avatar"
        />
        <h2>{comment.name}</h2>
        <p
          dangerouslySetInnerHTML={{ __html: comment.content }}
          className="comment__paragragh"
        />
      </div>
      <div className="buttons">
        <a
          className="button"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to post
        </a>
        <BiTimeFive
          style={{
            color: comment.forLater ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleForLater(comment.id))}
        />
        <BsFillHeartFill
          style={{
            color: comment.liked ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleLiked(comment.id))}
        />
      </div>
    </div>
  );
}

export default Comment;
