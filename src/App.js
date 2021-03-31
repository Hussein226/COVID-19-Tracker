import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

var convertTime = require("convert-time");
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

  function formatDate(date) {
    if (date != null) {
      var array = date.split(" ");

      var timeString = array[1].toString();
      console.log(timeString);
      var convertedTime = convertTime(timeString);

      console.log(convertedTime);

      return array[0] + " " + convertedTime;
    } else {
      return "No update time available from APIaa";
    }
  }

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
          <div className="childPostivieContainer">
            <h2 className="title">Total COVID-19 Cases:</h2>
            <div className="numberPositiveContainer">
              <p>
                Total:
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].positive
                )}
              </p>

              <p>
                New cases:
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].positiveIncrease
                )}
              </p>
            </div>
          </div>
          <div className="hospitlizedContainer">
            <h1>Hospitalized</h1>

            <div>
              <p>
                Total:
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].hospitalized
                )}
              </p>

              <p>
                New hospitalized:
                {new Intl.NumberFormat().format(
                  covidResults[selectedState].hospitalizedIncrease
                )}
              </p>
            </div>
          </div>

          <div className="deathContainer">
            <h1>Deaths</h1>

            <p>
              Total:
              {new Intl.NumberFormat().format(
                covidResults[selectedState].death
              )}
            </p>

            <p>
              New Deaths:
              {new Intl.NumberFormat().format(
                covidResults[selectedState].deathIncrease
              )}
            </p>
          </div>
        </div>

        <div className="lastUpdatedContainer">
          <p id="#titleUpdated">Last Updated: </p>
          <p>{formatDate(covidResults[selectedState].lastUpdateEt)}</p>
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

      {console.log(covidResults)}
    </div>
  );
}

export default App;
