import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface CandlestickChartProps {
  symbol: string;
  interval?: string;
}
const CandlestickChart = (props: CandlestickChartProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const testWS = new WebSocket(
      `ws://websocket-mock.onrender.com/?symbol=${props.symbol}&interval=${props.interval}`
    );
    testWS.onmessage = (event) => {
      setData(JSON.parse(event.data).data);
    };

    return () => {
      testWS.close();
    };
  }, [props.interval, props.symbol]);
  const chartOptions: ApexOptions = {
    chart: {
      type: "candlestick",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        formatter: function (_, { seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="apexcharts-tooltip">' +
            '<span class="apexcharts-tooltip-title" style="color: #FF5733;">Open: ' +
            w.globals.seriesCandleO[seriesIndex][dataPointIndex] +
            "</span>" +
            '<span class="apexcharts-tooltip-title" style="color: #33FF57;">High: ' +
            w.globals.seriesCandleH[seriesIndex][dataPointIndex] +
            "</span>" +
            '<span class="apexcharts-tooltip-title" style="color: #5733FF;">Low: ' +
            w.globals.seriesCandleL[seriesIndex][dataPointIndex] +
            "</span>" +
            '<span class="apexcharts-tooltip-title" style="color: #33FFFF;">Close: ' +
            w.globals.seriesCandleC[seriesIndex][dataPointIndex] +
            "</span>" +
            "</div>"
          );
        },
      },
    },
  };

  const series = [
    {
      data: data
        ? data?.map((value: any) => ({
            x: new Date(value[0]),
            y: [
              Number(value[1]).toFixed(2),
              Number(value[2]).toFixed(2),
              Number(value[3]).toFixed(2),
              Number(value[4]).toFixed(2),
            ],
          }))
        : [],
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="candlestick"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CandlestickChart;
