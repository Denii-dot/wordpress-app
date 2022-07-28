import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaxonomy } from "../store/taxonomySlice";
import Category from "./Category";
import Spinner from "./Spinner";

function Taxonomy() {
  const taxonomy = useSelector((state) => state.taxonomy);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!taxonomy.counter) {
      dispatch(fetchTaxonomy());
    }
  }, [dispatch, taxonomy.counter]);

  return (
    <section className="taxonomy content container container--pa">
      <h2 className="header">Categories:</h2>
      <div className="line"></div>
      <p className="paragraph">
        (Founded: {taxonomy.found}, loaded: {taxonomy.counter})
      </p>
      <div className="taxonomy__container">
        {taxonomy.categories.map((oneCategory) => (
          <Category category={oneCategory} key={oneCategory.id} />
        ))}
      </div>
      <div className="button--loader">
        {taxonomy.isLoading ? (
          <Spinner />
        ) : (
          taxonomy.found > taxonomy.counter && (
            <button onClick={() => dispatch(fetchTaxonomy())}>Load more</button>
          )
        )}
      </div>
    </section>
  );
}

export default Taxonomy;
