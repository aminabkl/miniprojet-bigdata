import React, { useEffect, useState } from "react";
import axios from "axios";
import PopulationTrend from "../src/components/PopulationTrend";
import CountryComparison from "../src/components/CountryComparison";
import CountryTable from "../src/components/CountryTable";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2022); // Par défaut 2022

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10)); // Convertit la valeur de l'année en nombre
  };

  return (
    <div className="App">
      <div className="app-h1">
        <h1>Tableau de bord démographique</h1>
      </div>
      <div className="select-div">
        <div className="select-menu-app">
          <label>Choisissez un pays </label>
          <select onChange={handleCountryChange} value={selectedCountry}>
            <option value="all">Tout le monde</option>
            {countries.map((country, index) => (
              <option key={index} value={country["Country/Territory"]}>
                {country["Country/Territory"]}
              </option>
            ))}
          </select>
        </div>
        <div className="select-menu-app">
          <label>Choisissez l'année </label>
          <select onChange={handleYearChange}>
            <option value="2022">2022</option>
            <option value="2020">2020</option>
            <option value="2015">2015</option>
            <option value="2010">2010</option>
            <option value="2000">2000</option>
            <option value="1990">1990</option>
            <option value="1980">1980</option>
            <option value="1970">1970</option>
          </select>
        </div>
      </div>
      {selectedCountry && (
        <>
          <PopulationTrend country={selectedCountry} countries={countries} />
        </>
      )}
      <CountryComparison countries={countries} selectedYear={selectedYear} />
      <CountryTable data={countries} />
    </div>
  );
}

export default App;
