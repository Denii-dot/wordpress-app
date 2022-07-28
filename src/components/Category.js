import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toggleLiked, toggleForLater } from "../store/taxonomySlice";

function Category({ category }) {
  const dispatch = useDispatch();
  return (
    <div className="category">
      <div className="category__header">
        <h4>{category.name}</h4>
        <p className="paragraph">Amount: {category.count}</p>
      </div>
      <div className="buttons">
        <BiTimeFive
          style={{
            color: category.forLater ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleForLater(category.id))}
        />
        <BsFillHeartFill
          style={{
            color: category.liked ? "#58c7fb" : "hsl(233, 4%, 54%)",
            cursor: "pointer",
            fontSize: "1.25rem",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => dispatch(toggleLiked(category.id))}
        />
      </div>
    </div>
  );
}

export default Category;
