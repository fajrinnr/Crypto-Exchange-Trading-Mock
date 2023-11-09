import { Radio, Select } from "antd";

interface HeaderChartProps {
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
  setIntervalLocal: React.Dispatch<React.SetStateAction<string>>;
  symbol: string;
  interval: string;
}

export default function HeaderChart(props: HeaderChartProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Select
        defaultValue={props.symbol}
        style={{ width: 120 }}
        onChange={props.setSymbol}
        options={[
          { value: "ETH", label: "ETH" },
          { value: "BTC", label: "BTC" },
          { value: "DOGE", label: "DOGE" },
        ]}
      />
      <Radio.Group
        defaultValue={props.interval}
        buttonStyle="solid"
        onChange={(e) => props.setIntervalLocal(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <Radio.Button value="1m">1m</Radio.Button>
        <Radio.Button value="15m">15m</Radio.Button>
        <Radio.Button value="1h">1H</Radio.Button>
        <Radio.Button value="4h">4H</Radio.Button>
        <Radio.Button value="1d">1D</Radio.Button>
        <Radio.Button value="1w">1W</Radio.Button>
      </Radio.Group>
    </div>
  );
}
