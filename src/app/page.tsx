"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import OrderBook from "@/components/Contents/OrderBook";
import dynamic from "next/dynamic";
import HeaderChart from "@/components/Contents/Header";
import "antd/dist/antd";

const DynamicCandlestickChart = dynamic(
  () => import("../components/Contents/CandleStick"),
  {
    ssr: false,
  }
);
export default function Home() {
  const [symbol, setSymbol] = useState<any>("BTC");
  const [interval, setIntervalLocal] = useState<any>("1d");

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <HeaderChart
            setSymbol={setSymbol}
            symbol={symbol}
            interval={interval}
            setIntervalLocal={setIntervalLocal}
          />
          <DynamicCandlestickChart symbol={symbol} interval={interval} />
        </div>
        <OrderBook symbol={symbol} interval={interval} />
      </div>
    </>
  );
}
