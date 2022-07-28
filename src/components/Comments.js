import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../store/commentsSlice";
import Comment from "./Comment";
import Spinner from "./Spinner";

function Comments() {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!comments.counter) {
      dispatch(fetchComments());
    }
  }, [comments.counter, dispatch]);

  return (
    <section className="comments content container container--pa">
      <h2 className="header">Recent comments:</h2>
      <div className="line"></div>
      <p className="paragraph">(Loaded: {comments.counter} )</p>
      <div className="comments__container">
        {comments.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <div className="button--loader">
        {comments.isLoading ? (
          <Spinner />
        ) : (
          <button onClick={() => dispatch(fetchComments())}>Load more</button>
        )}
      </div>
    </section>
  );
}

export default Comments;
