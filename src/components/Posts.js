import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchAmountPosts } from "../store/postsSlice";
import Post from "./Post";
import Spinner from "./Spinner";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!posts.counter) {
      dispatch(fetchPosts());
      dispatch(fetchAmountPosts());
    }
  }, [posts.counter, dispatch]);

  return (
    <section className="posts content container container--pa">
      <h2 className="header">
        Posts: <br />
      </h2>
      <div className="line"></div>
      <p className="paragraph">
        (Founded: {posts.foundPosts}, {posts.counter} loaded)
      </p>
      <div className="posts__container">
        {posts.posts.map((post) => (
          <Post post={post} key={post.ID} />
        ))}
      </div>
      <div className="button--loader">
        {posts.isLoading ? (
          <Spinner />
        ) : (
          <button onClick={() => dispatch(fetchPosts())}>Load more</button>
        )}
      </div>
    </section>
  );
}

export default Posts;
