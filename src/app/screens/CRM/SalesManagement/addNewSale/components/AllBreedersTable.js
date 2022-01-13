import { Table } from "antd";

import React, { useEffect, useState } from "react";
import Input from "../../../../../components/input/input";

const pagination = { position: "bottom" };

export default function AllBreedersTable(props) {
  const columns = [
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "1",
    },
    {
      title: "State",
      width: 100,
      dataIndex: "state",
      key: "2",
    },
    {
      title: "City",
      width: 100,
      dataIndex: "city",
      key: "3",
    },
    {
      title: "Phone",
      width: 100,
      dataIndex: "phone",
      key: "4",
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "5",
    },
    {
      title: "Action",
      width: 50,
      key: "6",
      render: (e) =>
        e._id === props.selectedBreeder?._id ? (
          <a>Selected</a>
        ) : (
          <a onClick={() => props.onSelectBreeder(e)}>Select</a>
        ),
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");

  const title = () => (
    <Input onChange={(e) => setSearchKeyword(e.target.value)} />
  );
  const [tableConfig, setTableConfig] = useState({
    bordered: true,
    loading: false,
    pagination,
    size: "default",
    title,
    scroll: { y: 240 },
    tableLayout: undefined,
    top: "none",
    bottom: "bottomRight",
    yScroll: true,
  });

  //   Debouncing...
  useEffect(() => {
    console.log("search keyword updated");
    const timer = setTimeout(() => {
        console.log('searching');
        props.getBreedersForCustomer(searchKeyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const searchFilter = (e) => {
    if (!searchKeyword) return e;

    if (
      !(
        e.name
          .toLowerCase()
          .search(
            searchKeyword.toLowerCase().replace(String.fromCharCode(92), "")
          ) === -1
      )
    )
      return e;
    if (
      !(
        e.city
          .toLowerCase()
          .search(
            searchKeyword.toLowerCase().replace(String.fromCharCode(92), "")
          ) === -1
      )
    )
      return e;
    if (
      !(
        e.state
          .toLowerCase()
          .search(
            searchKeyword.toLowerCase().replace(String.fromCharCode(92), "")
          ) === -1
      )
    )
      return e;
    if (
      !(
        e.email
          .toLowerCase()
          .search(
            searchKeyword.toLowerCase().replace(String.fromCharCode(92), "")
          ) === -1
      )
    )
      return e;
    if (
      !(
        e.phone
          .toLowerCase()
          .search(
            searchKeyword.toLowerCase().replace(String.fromCharCode(92), "")
          ) === -1
      )
    )
      return e;
    return null;
  };

  return (
    <div>
      <Table
        {...tableConfig}
        pagination={{ position: [tableConfig.top, tableConfig.bottom] }}
        columns={columns}
        dataSource={
          props.breeders[0] ? props.breeders.filter(searchFilter) : null
        }
      />
    </div>
  );
}
