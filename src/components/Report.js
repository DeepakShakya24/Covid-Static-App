import React from "react";
import "./Report.css";
import CountUp from "react-countup";
//import { Grid, Card, CardContent, Typography } from "@material-ui/core/";
//import CountUp from "react-countup";
const Report = (props) => {
  return (
    <div className="card flex" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.status}</h5>
        <h5 className="card-title">
          <CountUp start={0} end={props.Cases} separator="," duration={2.5} />
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.Country}</h6>
        <p className="card-text">Number of {props.status} of Covid-19</p>
      </div>
    </div>
  );
};

export default Report;
