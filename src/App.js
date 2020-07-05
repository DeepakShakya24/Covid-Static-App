import React, { useState } from "react";
import Report from "./components/Report";
//import { Grid } from "@material-ui/core/";
import "./App.css";
//import Chart from "./components/Chart";
import { Bar } from "react-chartjs-2";

function App() {
  const [country, setcountry] = useState("");
  const [recovered, setrecovered] = useState("");
  const [active, setactive] = useState("");
  const [deaths, setdeaths] = useState("");

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
    <div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Precautions for Covid-19</h1>
          <ul class="lead">
            <li>
              <p class="lead">
                Clean your hands often. Use soap and water, or an alcohol-based
                hand rub.
              </p>
            </li>
            <li>
              <p class="lead">
                Maintain a safe distance from anyone who is coughing or
                sneezing.
              </p>
            </li>
            <li>
              <p class="lead">
                Wear a mask when physical distancing is not possible.
              </p>
            </li>
            <li>
              <p class="lead">Don’t touch your eyes, nose or mouth.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="App">
        <form onSubmit={handleform} id="form">
          <input type="text" name="country" />
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
