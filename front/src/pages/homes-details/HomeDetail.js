import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { getHomeById } from "../../services/utils";
import CardRoom from "../../components/cardDetail/CardRoom";
import Table from "../../components/table/Table";
import "./HomeDetail.scss";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";

export const HomeDetail = () => {
  let { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const pieChart = useRef();

  const drawPie = (dataModify) => {
    let width = 400;
    let height = 400;
    const piedata = d3.pie().value((d) => d.value)(dataModify);
        //console.log("piedata", piedata);
        // Define arcs for graphing
        const arc = d3.arc().innerRadius(0).outerRadius(150);
        // Define scale ordinal - discrete
        const colors = d3.scaleOrdinal([
          "#ffa822",
          "#134e6f",
          "#ff6150",
          "#1ac0c6",
          "#dee0e6",
        ]);

        // Define the size and position of svg
        const svg = d3
          .select(pieChart.current)
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(200,200)");

        // Tooltip
        const tooldiv = d3
          .select("body")
          .append("div")
          .style("visibility", "hidden")
          .style("position", "absolute")
          .style("background-color", "#f8f9fa")
          .style("font-weight", "bold");

        // Draw pie
        svg
          .append("g")
          .selectAll("path")
          .data(piedata)
          .join("path")
          .attr("d", arc)
          .attr("fill", (d, i) => colors(i))
          .attr("stroke", "white")
          .on("mouseover", (e, d) => {
            tooldiv
              .style("visibility", "visible")
              .text(`${d.data.room}:` + `${d.data.value}KwH`);
          })
          .on("mousemove", (e, d) => {
            tooldiv
              .style("top", e.pageY - 50 + "px")
              .style("left", e.pageX - 50 + "px");
          })
          .on("mouseout", () => {
            tooldiv.style("visibility", "hidden");
          });
  }

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("rooms") === null) {
        setRooms("Loading...");
        
      } else {
        setRooms(JSON.parse(localStorage.getItem("rooms")));
        let dataModify = [];
        JSON.parse(localStorage.getItem("rooms")).map((elem) =>
          dataModify.push({ room: elem.name, value: elem.powerUsage.value })
        );
        
        drawPie(dataModify);
        
      }
    } else {
      getHomeById(id).then((data) => {
        setRooms(data.rooms);
        localStorage.setItem("rooms", JSON.stringify(data.rooms));
        let width = 400;
        let height = 400;

        let dataModify = [];
        data.rooms.map((elem) =>
          dataModify.push({ room: elem.name, value: elem.powerUsage.value })
        );
        drawPie(dataModify, width, height);
      
      }).catch(function (e) {
        console.log("Cant fetch data, error: "+ e);
      });
    }

  }, []);
  return (
    <div className="container">
      <h1>
        <FormattedMessage id="myRooms" />
      </h1>
      <div className="row">
        <div className="col-8">
          {Array.isArray(rooms) && rooms ?
            rooms.map((room, i) => (
              <CardRoom
                key={i}
                name={room.name}
                type={room.type}
                onPress={() => setSelectedRoom(room)}
              />
            )):rooms!==null?<>{rooms}</>:<FormattedMessage id="charging"/>}
        </div>
        <div className="col-4">
          {selectedRoom ? <Table selectedRoom={selectedRoom} /> : <></>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div id="chartArea">
            <h2>
              <FormattedMessage id="stats" />
            </h2>
            <h6>
              <FormattedMessage id="graphTit" />
            </h6>
            <svg ref={pieChart}></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeDetail;
