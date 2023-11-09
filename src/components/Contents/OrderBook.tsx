import { useState, useEffect } from "react";
import { Radio, Table } from "antd";
import styles from "./chart.module.css";
import styled from "styled-components";
import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";

const colorText = {
  buy: "green",
  ask: "red",
};

interface StyledSpanProps {
  type?: "buy" | "ask";
}

interface OrderBookProps {
  symbol: string;
  interval?: string;
}

export default function OrderBook(props: OrderBookProps) {
  const [active, setActive] = useState<"all" | "buy" | "sell">("all");
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const testWS = new WebSocket(
      `ws://websocket-mock.onrender.com/?symbol=${props.symbol}&interval=${props.interval}`
    );
    testWS.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => {
      testWS.close();
    };
  }, [props.interval, props.symbol]);

  const RendererComponent = () => (
    <>
      {(active === "all" || active === "sell") && (
        <StyledTable
          dataSource={
            active === "all"
              ? data?.a?.slice(0, 9)?.sort((a: any, b: any) => b[0] - a[0])
              : data?.a?.slice(0, 15)
          }
          columns={TableConfigurationCol("ask")}
          pagination={false}
          rowKey={(_, i) => i as number}
          rowClassName={"custom-table-row"}
          loading={!data}
        />
      )}
      {active === "all" && (
        <span style={{ margin: "5px 0" }}>
          {Number(data?.p || 0).toFixed(2)}
        </span>
      )}
      {(active === "all" || active === "buy") && (
        <StyledTable
          dataSource={
            active === "buy" ? data?.b?.slice(0, 15) : data?.b?.slice(0, 9)
          }
          columns={TableConfigurationCol("buy")}
          pagination={false}
          showHeader={active === "buy" ? true : false}
          rowKey={(_, i) => i as number}
          rowClassName={"custom-table-row"}
          loading={!data}
        />
      )}
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles["title"]}>
        <span>Order Book</span>
      </div>
      <Radio.Group
        defaultValue="all"
        buttonStyle="solid"
        onChange={(e) => setActive(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <StyledRadioButton value="all">All</StyledRadioButton>
        <StyledRadioButton value="buy">Buy</StyledRadioButton>
        <StyledRadioButton value="sell">Sell</StyledRadioButton>
      </Radio.Group>
      {!data ? (
        <span style={{ color: "white", fontSize: "18px", width: "400px" }}>
          Loading...
        </span>
      ) : (
        RendererComponent()
      )}
    </div>
  );
}

const TableConfigurationCol = (type: "ask" | "buy"): ColumnsType<AnyObject> => [
  {
    title: "Price",
    key: "price",
    render: (data: any) => (
      <StyledSpan type={type}>{Number(data[0]).toFixed(2)}</StyledSpan>
    ),
    width: 150,
    align: "left",
  },
  {
    title: "Amount",
    key: "amount",
    render: (data: any) => Number(data[1]).toFixed(4),
    width: 150,
    align: "left",
  },
  {
    title: "Total",
    key: "total",
    render: (data: any) => (Number(data[1]) * Number(data[0])).toFixed(5),
    width: 100,
    align: "right",
  },
];

const StyledSpan = styled.span<StyledSpanProps>`
  word-wrap: break-word;
  word-break: break-word;
  color: ${({ type }) => (type ? colorText[type] : "6px")};
`;

const StyledRadioButton = styled(Radio.Button)`
  border: 1px solid #2c3038;
  background-color: black;
  color: #73767d;
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: unset !important;
    color: white !important;
  }

  .ant-table-tbody .ant-table-cell {
    padding: 1px !important;
    border: 0;
  }

  tr:hover {
    td {
      background: black !important;
      opacity: 0.7;
    }
    background-color: gray;
  }

  .ant-table-thead .ant-table-cell {
    padding: 1px !important;
    background: unset;
    color: white;
    border: 0;
  }

  .ant-table-thead .ant-table-cell::before {
    background-color: unset !important;
  }
`;
