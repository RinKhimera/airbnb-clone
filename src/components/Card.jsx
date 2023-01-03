import React from "react";
import card from "../img/katie-zaferes.png";
import star from "../img/star.png";

const Card = () => {
  return (
    <div className="card">
      <img src={card} alt="Rin Khimera" className="card--image" />
      <div className="card--stats">
        <img src={star} alt="Rin Khimera" className="card--star" />
        <span>5.0</span>
        <span className="gray">(6) • </span>
        <span className="gray">USA</span>
      </div>
      <p>Life Lessons with Katie Zaferes</p>
      <p>
        <span className="bold">From $136</span> / person
      </p>
    </div>
  );
};

export default Card;
