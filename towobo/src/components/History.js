import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Table } from "antd";
import { ACTIVE_CHAIN, APP_NAME, CHAIN_OPTIONS } from "../util/constants";
import { getTransactions } from "../util/covalent";
import { capitalize, col } from "../util";

const { Option } = Select;

const COLUMNS = [
  //   col("tx_hash"),
  //   col("from_address"),
  col("to_address"),
  col("value"),
  col("gas_spent"),
  col(
    "block_signed_at",
    (row) =>
      `${new Date(row).toLocaleDateString()} ${new Date(
        row
      ).toLocaleTimeString()}`
  ),
];

function History(props) {
  const [address, setAddress] = useState(
    "Enter Contract Address"
  );
  const [chainId, setChainId] = useState(ACTIVE_CHAIN.id + "");
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setData(undefined)
  }, [chainId])

  const fetchHistory = async () => {
    if (!address || !chainId) {
      alert("Address and chainId are required");
      return;
    }

    setLoading(true);
    try {
      const res = await getTransactions(chainId, address);
      setData(res.data.data.items);
    } catch (e) {
      console.error(e);
      alert("error getting signdata" + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>
        View all Signature request 
              </p>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        prefix="Address"
      ></Input>
      <br />
      <p></p>
      <Select
        defaultValue={chainId}
        style={{ width: 120 }}
        onChange={(v) => setChainId(v)}
      >
        {Object.keys(CHAIN_OPTIONS).map((cId, i) => {
          return (
            <Option key={i} value={cId}>
              {capitalize(CHAIN_OPTIONS[cId].name)}
            </Option>
          );
        })}
      </Select>
      &nbsp;
      <Button onClick={fetchHistory} disabled={loading} loading={loading}>
        View Past requests
      </Button>
      <br />
      <hr />
      {data && (
        <div>
          <h1>Transaction History</h1>
          <Table
            dataSource={data}
            columns={COLUMNS}
            className="pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log("event", event.target.value);
                  window.open(
                    `${CHAIN_OPTIONS[chainId].url}tx/${record.tx_hash}`,
                    "_blank"
                  );
                },
                onDoubleClick: (event) => {},
                onContextMenu: (event) => {}, 
                onMouseEnter: (event) => {}, 
                onMouseLeave: (event) => {}, 
              };
            }}
          />
          ;
        </div>
      )}
    </div>
  );
}

History.propTypes = {};

export default History;
