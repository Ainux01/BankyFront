import React from "react";
import coin from "./coin.module.css";
const Coin = ({ image, name, symbol, price, volume, priceChange }) => {
  return (
    <div className={coin.container}>
      <div className={coin.row}>
        <div className={coin.coin}>
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className={coin.symbol} title="symbol">
            {symbol}
          </p>
        </div>
        <div className={coin.data}>
          <p className={coin.price} title="price">
            ${price}
          </p>
          <p className={coin.volume} title="Volume on the Market">
            ${volume.toLocaleString()}
          </p>
          {priceChange > 0 ? (
            <p
              className={`${coin.percent} ${coin.green}`}
              title="price change percentage in 24h"
            >
              {priceChange}%
            </p>
          ) : (
            <p
              className={`${coin.percent} ${coin.red}`}
              title="price change percentage in 24h"
            >
              {priceChange}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;
