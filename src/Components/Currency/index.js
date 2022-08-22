import React, { useState, useEffect } from "react";
import currency from "./currency.module.css";

var myHeaders = new Headers();
myHeaders.append("apikey", "iXpbAAPQMnTX7sc8TeiqrS6xVnRAs8V9");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

const Index = () => {
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState(["EUR", "GBP", "MAD"]);

  const getData = (currency) => {
    fetch(
      `https://v1.nocodeapi.com/amine010101/cx/FNsWHYQDnbArBcfV/rates?source=${currency}&target=USD`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCurrencies((prev) => [...prev, result]);
      })
      .catch((error) => console.log("error", error));
  };
  const getCurrencyData = () => {};
  useEffect(() => {
    // getCurrencyData();
    countries.forEach((country) => {
      //getData(country);
      setCountries((countries) =>
        countries.filter((countryd) => countryd === country)
      );
    });
  }, []);
  useEffect(() => {
    console.log(currencies);
  }, [currencies]);
  return (
    <section className={currency.section}>
      <div className="align_center">
        <h2>Currency</h2>
      </div>
      <ul className={currency.card}>
        {currencies?.map((currency, index) => {
          const { source, rates } = currency;

          if (index < 3) {
            return (
              <li className={currency.item} key={index}>
                <img
                  src={require(`../../icones/${source}.png`)}
                  alt="logo"
                  className="logox"
                />
                <h4>{source}</h4>
                <h4>{rates.USD} $</h4>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
};

export default Index;
