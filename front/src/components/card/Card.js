import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card card-home2">
      <Link className="card-home2-img-link" to={`/homes/${props.id}`}>
        {props.type === "house" ? (
          <img src="/home.png" className="card-home2-img-top" alt="Icon Home" />
        ) : (
          <img
            src="/loft.png"
            className="card-home2-img-top loft"
            alt="Icon Loft"
          />
        )}
      </Link>
      <div className="card-home2-body">
        <div className="card-home2-body-description">
          <h5 className="card-home2-title">{props.name}</h5>
          <p className="card-home2-text">{props.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
