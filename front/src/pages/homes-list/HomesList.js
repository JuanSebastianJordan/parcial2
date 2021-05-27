import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { getHomes } from "../../services/utils";
import Card from "../../components/card/Card";
import { FormattedMessage } from "react-intl";

export const HomesList = () => {
  const [homes, setHomes] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("homes") === null) {
        setHomes("Loading...");
      } else {
        setHomes(JSON.parse(localStorage.getItem("homes")));
      }
    } else {
      getHomes()
        .then((data) => {
          setHomes(data);
          localStorage.setItem("homes", JSON.stringify(data));
        })
        .catch(function (e) {
          console.log("Cant fetch data, error: "+ e);
        });
    }
  }, []);

  return (
    <div className="container home">
      <h1>
        <FormattedMessage id="spaces" />
      </h1>
      <div className="cards">
        {Array.isArray(homes) &&
          homes ?
          homes.map((home, i) => (
            <Card
              key={i}
              name={home.name}
              address={home.address}
              id={home.id}
              type={home.type}
            />
          )): homes !== null?<>{homes}</>: <FormattedMessage id="charging"/>}
      </div>
    </div>
  );
};
