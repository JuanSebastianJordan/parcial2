import React from "react";
import "./CardRoom.scss";

const CardRoom = (props) => {
  return (
    <div className="card card-home">
      <div className="card-home-body">
        <h5 className="card-home-title">{props.name}</h5>
      </div>
      <div className="card-home-img-link">
        {props.type === "room" ? (
          <img
            src="/living-room.png"
            className="card-home-img-top"
            alt="Icon Home"
            onClick={props.onPress}
          />
        ) : (
          <img
            src="/kitchen.png"
            className="card-home-img-top loft"
            alt="Icon Loft"
            onClick={props.onPress}
          />
        )}
      </div>
    </div>
  );
};

export default CardRoom;
