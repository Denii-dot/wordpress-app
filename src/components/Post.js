import React from "react";
import { useDispatch } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { toggleLiked, toggleForLater } from "../store/postsSlice";

function Post({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="post__header">
        <img src={post.author.avatar_URL} alt="" className="post__avatar" />
        <div className="post__title">
          <h4 dangerouslySetInnerHTML={{ __html: post.title }} />
        </div>
        <p className="post__date">{new Date(post.date).toDateString()}</p>
      </div>
      <img src={post.featured_image} alt="" className="post__image" />
      <div
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
        className="post__description"
      />
      <div className="buttons">
        <a
          href={post.author.profile_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          About author
        </a>
        <a
          href={post.URL}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to article
        </a>
        <BiTimeFive
          style={{
            color: post.forLater ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleForLater(post.ID))}
        />
        <BsFillHeartFill
          style={{
            color: post.liked ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleLiked(post.ID))}
        />
      </div>
    </div>
  );
}

export default Post;
