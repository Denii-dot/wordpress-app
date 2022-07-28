import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLikedPosts,
  showForLaterPosts,
  showLikedComments,
  showForLaterComments,
  showLikedTaxonomy,
  showForLaterTaxonomy,
  showLikedTrends,
  showForLaterTrends,
} from "../store/profileSlice";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Trend from "../components/Trend";
import Category from "../components/Category";
import Spinner from "../components/Spinner";

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const taxonomy = useSelector((state) => state.taxonomy);
  const trends = useSelector((state) => state.trends);

  useEffect(() => {
    dispatch(showLikedPosts());
    dispatch(showForLaterPosts());
  }, [dispatch, posts]);

  useEffect(() => {
    dispatch(showLikedComments());
    dispatch(showForLaterComments());
  }, [dispatch, comments]);

  useEffect(() => {
    dispatch(showLikedTrends());
    dispatch(showForLaterTrends());
  }, [dispatch, trends]);

  useEffect(() => {
    dispatch(showLikedTaxonomy());
    dispatch(showForLaterTaxonomy());
  }, [dispatch, taxonomy]);
  return (
    <>
      {profile.isLoading ? (
        <Spinner />
      ) : (
        <section className="container content container--pa">
          <div className="posts">
            <h2 className="header">Liked posts:</h2>
            <div className="line"></div>
            <div className="posts__container">
              {profile.postsLiked.length ? (
                profile.postsLiked.map((post) => (
                  <Post post={post} key={post.ID} />
                ))
              ) : (
                <h4 className="h4--profile">No categories to display</h4>
              )}
            </div>
            <h2 className="header">For later posts:</h2>
            <div className="line"></div>
            <div className="container">
              <div className="posts__container">
                {profile.postsForLater.length ? (
                  profile.postsForLater.map((post) => (
                    <Post post={post} key={post.ID} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
            </div>
          </div>
          <div className="comments">
            <h2 className="header">Liked comments:</h2>
            <div className="line"></div>
            <div className="container">
              <div className="comments__container">
                {profile.commentsLiked.length ? (
                  profile.commentsLiked.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
              <h2 className="header">For later comments:</h2>
              <div className="line"></div>
              <div className="comments__container">
                {profile.commentsForLater.length ? (
                  profile.commentsForLater.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
            </div>
          </div>
          <div className="taxonomy">
            <h2 className="header">Liked categories:</h2>
            <div className="line"></div>
            <div className="container">
              <div className="taxonomy__container">
                {profile.taxonomyLiked.length ? (
                  profile.taxonomyLiked.map((category) => (
                    <Category category={category} key={category.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
              <h2 className="header">For later categories:</h2>
              <div className="line"></div>
              <div className="taxonomy__container">
                {profile.taxonomyForLater.length ? (
                  profile.taxonomyForLater.map((category) => (
                    <Category category={category} key={category.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
            </div>
          </div>
          <div className="trends">
            <h2 className="header">Liked tags:</h2>
            <div className="line"></div>
            <div className="container">
              <div className="trends__container">
                {profile.trendsLiked.length ? (
                  profile.trendsLiked.map((trend) => (
                    <Trend trend={trend} key={trend.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
              <h2 className="header">For later tags:</h2>
              <div className="line"></div>
              <div className="trends__container">
                {profile.trendsForLater.length ? (
                  profile.trendsForLater.map((trend) => (
                    <Trend trend={trend} key={trend.id} />
                  ))
                ) : (
                  <h4 className="h4--profile">No categories to display</h4>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
