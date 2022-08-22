import React, { useState, useEffect } from "react";
import Coin from "./Coin/Coin";
import crypto from "./crypto.module.css";
import coin from "./Coin/coin.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Crypto = ({ showSidebar, setShowSidebar }) => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const getCoins = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    setCoins(data);
  };
  useEffect(() => {
    getCoins();
  }, []);
  useEffect(() => {
    coins && console.log(coins);
  }, [coins]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredCoins);

  useEffect(() => {}, []);

  return (
    <div className={crypto.app}>
      {!showSidebar && (
        <button onClick={() => setShowSidebar(true)} className={crypto.sideBtn}>
          <GiHamburgerMenu />
        </button>
      )}
      <div className={crypto.search}>
        <h1 className={crypto.text}>
          <span style={{ color: "#3D8AC7" }}>S</span>earch a{" "}
          <span style={{ color: "#3D8AC7" }}>C</span>urrency
        </h1>
        <form>
          <input
            type="text"
            id="coin"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className={crypto.input}
          />
        </form>
      </div>
      <div className={coin.container}>
        <div className={coin.row}>
          <div className={coin.coin}>
            <h1 style={{ fontSize: "24px" }}>Currency</h1>
            <p
              className={coin.symbol}
              title="symbol"
              style={{ marginLeft: "27px" }}
            >
              Symbol
            </p>
          </div>
          <div className={coin.data}>
            <p className={coin.price} title="price">
              Price
            </p>
            <p className={coin.volume} title="Volume on the Market">
              Volume on Market
            </p>
            <p
              className={`${coin.percent}`}
              title="price change percentage in 24h"
            >
              Price Change
            </p>
          </div>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};

export default Crypto;
