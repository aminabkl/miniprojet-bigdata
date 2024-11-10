import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../App.css";
import comparaison from "../assets/comparaison.png";
function CountryComparison({ countries, selectedYear }) {
  // const [selectedYear, setSelectedYear] = useState(2022);

  // const handleYearChange = (e) => {
  //   setSelectedYear(parseInt(e.target.value, 10)); // Convertit la valeur de l'année en nombre
  // };

  return (
    <>
      <div className="country-comparison">
        <div className="country-comparison-header">
          <img
            src={comparaison}
            alt="world"
            style={{ width: "45px", height: "auto" }}
          />
          <h3>
            Comparaison de la population des pays&nbsp;
            <span style={{ fontStyle: "italic" }}>({selectedYear})</span>
          </h3>
        </div>
        <div className="chart">
          <BarChart width={950} height={350} data={countries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Country/Territory"
              interval={0}
              angle={-45}
              textAnchor="end"
              tick={false}
            />
            <YAxis
              tickFormatter={(value) => [value / 1e9]}
              label={{
                value: "Population (en milliards)",
                position: "top",
                offset: 10,
                style: { textAnchor: "start" },
              }}
            />
            <Tooltip labelFormatter={(value) => `Pays: ${value}`} />
            {/* <Legend /> */}
            <Bar dataKey={`${selectedYear} Population`} fill="#007bff" />
          </BarChart>
        </div>
      </div>
    </>
  );
}

export default CountryComparison;
