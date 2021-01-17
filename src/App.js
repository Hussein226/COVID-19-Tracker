import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const US_STATES = require("./files/US_States.json");

const allStates = Object.values(US_STATES).map((item, key) => ({
  key: key,
  text: item,
  value: key,
}));

function App() {
  const [covidResults, setCovidResults] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [loading, setLoading] = useState(true);

  const selectedStateHandler = (e, { value }) => {
    e.persist();
    setSelectedState(value);
  };

  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v1/states/current.json")
      .then((response) => {
        setCovidResults(response.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="resultsContainer">
        {/* {covidResults.map((item, index) => {
          return <li key={index}>{covidResults[index].state}</li>;
        })} */}

        <div className="stateName">
          <h1>{allStates[selectedState].text}</h1>
        </div>

        <div className="positiveContainer">
          <h2 className="title">Total COVID-19 Cases:</h2>

          <div className="numberPositiveContainer">
            <div className="totalPositive">
              <p>
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].positive
                )}
              </p>
            </div>
            <div className="positiveIncreased">
              <p>
                +
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].positiveIncrease
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dropDownContainer">
        <Dropdown
          placeholder="Select State"
          search
          selection
          options={allStates}
          onChange={selectedStateHandler}
        />
      </div>
    </div>
  );
}

export default App;
