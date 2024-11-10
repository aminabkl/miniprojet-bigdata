import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import tendence from "../assets/tendancepop.png";

function PopulationTrend({ country, countries }) {
  let populationData;
  let density, growthRate;

  if (country === "all") {
    populationData = [
      "1970",
      "1980",
      "1990",
      "2000",
      "2010",
      "2015",
      "2020",
      "2022",
    ].map((year) => {
      const totalPopulation = countries.reduce((sum, currentCountry) => {
        return sum + (currentCountry[year + " Population"] || 0);
      }, 0);
      return { year: parseInt(year), population: totalPopulation };
    });
  } else {
    const selectedCountry = countries.find(
      (c) => c["Country/Territory"] === country
    );
    if (selectedCountry) {
      populationData = [
        { year: 1970, population: selectedCountry["1970 Population"] },
        { year: 1980, population: selectedCountry["1980 Population"] },
        { year: 1990, population: selectedCountry["1990 Population"] },
        { year: 2000, population: selectedCountry["2000 Population"] },
        { year: 2010, population: selectedCountry["2010 Population"] },
        { year: 2015, population: selectedCountry["2015 Population"] },
        { year: 2020, population: selectedCountry["2020 Population"] },
        { year: 2022, population: selectedCountry["2022 Population"] },
      ];

      density = selectedCountry["Density (per km²)"];
      growthRate = selectedCountry["Growth Rate"];
    }
  }

  let yAxisLabel = "";
  const maxPopulation = Math.max(...populationData.map((d) => d.population));
  let divisor = 1;

  if (maxPopulation >= 1e9) {
    divisor = 1e9;
    yAxisLabel = " (en milliards)";
  } else if (maxPopulation >= 1e6) {
    divisor = 1e6;
    yAxisLabel = " (en millions)";
  } else if (maxPopulation >= 1e3) {
    divisor = 1e3;
    yAxisLabel = " (en milliers)";
  }

  return (
    <div className="population-trend">
      <div className="population-trend-header">
        <img
          src={tendence}
          alt="world"
          style={{ width: "45px", height: "auto" }}
        />
        <h3>
          Tendance de la population&nbsp;
          <span style={{ fontStyle: "italic" }}>
            {country === "all" ? "mondiale" : `pour ${country}`}
          </span>
        </h3>
      </div>
      <div className="trend-div" style={{ display: "flex" }}>
        <div className="chart">
          <LineChart width={900} height={330} data={populationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={(value) => (value / divisor).toFixed(2)}
              label={{
                value: `Population${yAxisLabel}`,
                position: "top",
                offset: 10,
                style: { textAnchor: "start" },
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="population" stroke="#007bff" />
          </LineChart>
        </div>

        {country !== "all" && (
          <div className="pop-div-block">
            <div className="pop-block-1">
              <h4>Densité (par km²)</h4>

              <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                {density || "Données non disponibles"}
              </p>
            </div>
            <div className="pop-block-2">
              <h4>Taux de croissance</h4>
              <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                {growthRate || "Données non disponibles"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopulationTrend;

// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import tendence from "../assets/tendancepop.png";

// function PopulationTrend({ country, countries }) {
//   let populationData;

//   if (country === "all") {
//     populationData = [
//       "1970",
//       "1980",
//       "1990",
//       "2000",
//       "2010",
//       "2015",
//       "2020",
//       "2022",
//     ].map((year) => {
//       const totalPopulation = countries.reduce((sum, currentCountry) => {
//         return sum + (currentCountry[year + " Population"] || 0);
//       }, 0);
//       return { year: parseInt(year), population: totalPopulation };
//     });
//   } else {
//     const selectedCountry = countries.find(
//       (c) => c["Country/Territory"] === country
//     );
//     if (selectedCountry) {
//       populationData = [
//         { year: 1970, population: selectedCountry["1970 Population"] },
//         { year: 1980, population: selectedCountry["1980 Population"] },
//         { year: 1990, population: selectedCountry["1990 Population"] },
//         { year: 2000, population: selectedCountry["2000 Population"] },
//         { year: 2010, population: selectedCountry["2010 Population"] },
//         { year: 2015, population: selectedCountry["2015 Population"] },
//         { year: 2020, population: selectedCountry["2020 Population"] },
//         { year: 2022, population: selectedCountry["2022 Population"] },
//       ];
//     }
//   }
//   //
//   let yAxisLabel = "";
//   const maxPopulation = Math.max(...populationData.map((d) => d.population));
//   let divisor = 1;

//   if (maxPopulation >= 1e9) {
//     divisor = 1e9;
//     yAxisLabel = " (en milliards)";
//   } else if (maxPopulation >= 1e6) {
//     divisor = 1e6;
//     yAxisLabel = " (en millions)";
//   } else if (maxPopulation >= 1e3) {
//     divisor = 1e3;
//     yAxisLabel = " (en milliers)";
//   }

//   return (
//     <div className="population-trend">
//       <div className="population-trend-header">
//         <img
//           src={tendence}
//           alt="world"
//           style={{ width: "45px", height: "auto" }}
//         />
//         <h3>
//           Tendance de la population&nbsp;
//           <span style={{ fontStyle: "italic" }}>
//             {country === "all" ? "mondiale" : `pour ${country}`}
//           </span>
//         </h3>
//       </div>
//       <div className="trend-div">
//         <div>
//           <div>
//             <h4>Population en 2022</h4>
//             <h3>//population du pays selectionne</h3>
//           </div>
//         </div>
//         <LineChart LineChart width={900} height={330} data={populationData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="year" />
//           {/* <YAxis /> */}
//           <YAxis
//             tickFormatter={(value) => (value / divisor).toFixed(2)}
//             label={{
//               value: `Population${yAxisLabel}`,
//               // angle: -90,
//               // position: "insideLeft",
//               position: "top",
//               offset: 10,
//               style: { textAnchor: "start" },
//             }}
//           />
//           <Tooltip />
//           {/* <Legend /> */}
//           <Line type="monotone" dataKey="population" stroke="#007bff" />
//         </LineChart>
//       </div>
//     </div>
//   );
// }

// export default PopulationTrend;
