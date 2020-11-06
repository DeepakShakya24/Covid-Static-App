import React, { useState, useEffect } from "react";
import Report from "./components/Report";
import "./App.css";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function App() {
  const [country, setcountry] = useState("");
  const [recovered, setrecovered] = useState("");
  const [active, setactive] = useState("");
  const [deaths, setdeaths] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const virusData = await axios.get(
        "https://corona.lmao.ninja/v2/countries/India?yesterday&strict&query%20"
      );
      setcountry(virusData.data.country);
      setactive(virusData.data.cases);
      setrecovered(virusData.data.recovered);
      setdeaths(virusData.data.deaths);
    };
    fetchData();
  }, []);

  const handleform = (event) => {
    event.preventDefault();
    const country = event.target.elements.country.value;
    fetch(
      "https://corona.lmao.ninja/v2/countries/" +
        country +
        "?yesterday&strict&query%20"
    )
      .then((response) => response.json())
      .then((data) => {
        setcountry(data.country);
        setactive(data.cases);
        setrecovered(data.recovered);
        setdeaths(data.deaths);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="content">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Precautions for Covid-19</h1>
          <ul className="lead">
            <li>
              <p className="lead">
                Clean your hands often. Use soap and water, or an alcohol-based
                hand rub.
              </p>
            </li>
            <li>
              <p className="lead">
                Maintain a safe distance from anyone who is coughing or
                sneezing.
              </p>
            </li>
            <li>
              <p className="lead">
                Wear a mask when physical distancing is not possible.
              </p>
            </li>
            <li>
              <p className="lead">Don’t touch your eyes, nose or mouth.</p>
            </li>
            <li>
              <p className="lead">
                If you have a fever, cough and difficulty breathing, seek
                medical attention.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="App">
        <form onSubmit={handleform} id="form">
          <input
            type="text"
            name="country"
            placeholder="Enter a country name"
          />
          <br />
          <button className="btn btn-primary btn-lg" type="submit">
            Search For Cases
          </button>
        </form>
        <Report status="Confirmed" Country={country} Cases={active} />
        <Report status="Recovered" Country={country} Cases={recovered} />
        <Report status="Deaths" Country={country} Cases={deaths} />
        <div className="container-chart">
          <Bar
            data={{
              labels: ["Infected", "Recovered", "Deaths"],
              datasets: [
                {
                  label: "People",
                  backgroundColor: [
                    "rgba(0,0, 255, 0.5)",
                    "rgba(0,255, 0, 0.5)",
                    "rgba(255,0,0, 0.5)",
                  ],
                  data: [active, recovered, deaths],
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Total Covid Cases:" + country,
                fontSize: 50,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
