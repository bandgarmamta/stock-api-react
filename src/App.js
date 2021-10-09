import "./styles.css";
import { useState } from "react";

export default function App() {
  var [result, setResult] = useState("");
  // var [name,setName] = useState("");
  var [purchase, setPurchase] = useState("");
  var [num, setNum] = useState("");
  var [current, setCurrent] = useState("");

  var serverURL = "https://www.alphavantage.co/";

  function getStockURL(inputText) {
    return (
      serverURL +
      "query?function=SYMBOL_SEARCH&keywords=" +
      inputText +
      "&apikey=CK866LJ9T8I0VK2N"
    );
  }

  function getCurrentURL(stockSymbol) {
    return (
      serverURL +
      "query?function=TIME_SERIES_DAILY&symbol=" +
      stockSymbol +
      "&apikey=CK866LJ9T8I0VK2N"
    );
  }

  function clickHandler(event) {
    var inputText = event.target.value;

    var forSymbol = "";
    fetch(getStockURL(inputText))
      .then((response) => response.json())
      .then((json) => {
        for (var i = 0; i < json.bestMatches.length; i++) {
          var obj = json.bestMatches[i];
          var options = Object.values(obj)[1]; //names
          forSymbol = Object.values(obj)[0];
          var optionList = document.createElement("option");
          optionList.value = options;
          var element = document.getElementById("nameOfStock");
          element.appendChild(optionList);
        }

        fetch(getCurrentURL(forSymbol))
          .then((response) => response.json())
          .then((json) => {
            var jsonPrice = Object.values(json)[1];
            var jsonPrice1 = Object.values(jsonPrice)[0]["4. close"];
            setCurrent(jsonPrice1);
          });
      });
  }

  function calculate() {
    const x = Number(purchase.value);
    const y = Number(num.value);
    const z = Number(current.value);

    if (purchase.value === "" || num.value === "" || current.value === "") {
      setResult("Please enter all input values");
    } else {
      if (x === 0 || y === 0 || z === 0) {
        setResult("Please enter values greater than zero");
      } else {
        const prevalue = x * y;
        const currvalue = z * y;
        const money = currvalue - prevalue;
        console.log(result);
        const percent = (Math.abs(money) / prevalue) * 100;

        if (result > 0) {
          setResult(
            "Yippee!! You gained profit of Rs." +
              money +
              " and your profit percentage is " +
              percent.toFixed(2) +
              "%  🥳"
          );
        } else {
          if (result < 0) {
            setResult(
              "Oops!! You gained loss of Rs." +
                Math.abs(money) +
                " and your loss percentage is " +
                Math.abs(percent.toFixed(2)) +
                "%  😞"
            );
          } else {
            setResult("No Profit, No Loss.So, don't worry,Be Happy 😉");
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <h1>Stock-Api💸📈</h1>
      <label id="stockname">
        Name of the stock:
        <input
          onChange={clickHandler}
          list="nameOfStock"
          type="text"
          autoComplete="off"
        />{" "}
      </label>
      <datalist id="nameOfStock"></datalist>
      <br />
      <label>
        Purchase price:{" "}
        <input onChange={(e) => setPurchase(e.target.value)} type="number" />
      </label>
      <br />
      <label>
        Number of stock:{" "}
        <input onChange={(e) => setNum(e.target.value)} type="number" />
      </label>
      <br />
      <label>
        Current price:{" "}
        <input
          onChange={(e) => setCurrent(e.target.value)}
          readOnly
          value={current}
        />
      </label>
      <br />
      <button onClick={() => calculate()}>Check</button>
      <div>{result}</div>
    </div>
  );
}
