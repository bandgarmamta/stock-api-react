import "./styles.css";
import { useState } from "react";

export default function App() {
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
