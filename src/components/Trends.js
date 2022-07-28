import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrends } from "../store/trendsSlice";
import Trend from "./Trend";
import Spinner from "./Spinner";

function Trends() {
  const dispatch = useDispatch();
  const trends = useSelector((state) => state.trends);

  useEffect(() => {
    if (trends.trends.length === 0) {
      dispatch(fetchTrends());
    }
  }, [trends.trends.length, dispatch]);

  return (
    <section className="trends content container container--pa">
      <h2 className="header">Trends: </h2>
      <div className="line"></div>
      <p className="paragraph">(Loaded: {trends.count})</p>
      {trends.isLoading && <Spinner />}
      <div className="trends__container">
        {trends.trends.map((trend) => (
          <Trend trend={trend} key={trend.id} />
        ))}
      </div>
    </section>
  );
}

export default Trends;
