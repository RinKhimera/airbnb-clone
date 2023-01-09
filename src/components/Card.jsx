import React from "react";
import card from "../img/katie-zaferes.png";
import star from "../img/star.png";

const Card = (props) => {
  return (
    <div className="card">
      <img src={card} alt="Rin Khimera" className="card--image" />
      <div className="card--stats">
        <img src={star} alt="Rin Khimera" className="card--star" />
        <span>{props.rating}</span>
        <span className="gray">({props.reviewCount}) • </span>
        <span className="gray">{props.country}</span>
      </div>
      <p>{props.title}</p>
      <p>
        <span className="bold">From ${props.price}</span> / person
      </p>
    </div>
  );
};

export default Card;
