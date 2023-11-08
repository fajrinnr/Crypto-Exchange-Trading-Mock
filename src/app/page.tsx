"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import api from "../config/api";
import OrderBook from "@/components/Charts/OrderBook";
import dynamic from "next/dynamic";
import HeaderChart from "@/components/Charts/Header";
import "antd/dist/antd";

const DynamicCandlestickChart = dynamic(
  () => import("../components/Charts/CandleStick"),
  {
    ssr: false,
  }
);
export default function Home() {
  const [data3, setData3] = useState<any>(null);
  const [symbol, setSymbol] = useState<any>("btcusdt");
  const [interval, setIntervalLocal] = useState<any>("1d");

  useEffect(() => {
    api
      .get(`/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`)
      .then((data) => {
        setData3(data.data);
      });
  }, [interval, symbol]);

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
          <DynamicCandlestickChart data={data3} />
        </div>
        <OrderBook symbol={symbol} />
      </div>
    </>
  );
}
