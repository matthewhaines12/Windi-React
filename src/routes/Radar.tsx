import React from "react";
import { GiRadarSweep } from "react-icons/gi";
import Weather from "../Components/Weather";

function Radar() {
  return (
    <div className="radar">
      <h1>Radar</h1>
      <GiRadarSweep className="page-icon" />
    </div>
  );
}

export default Radar;
