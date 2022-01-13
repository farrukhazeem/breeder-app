import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown, Form, Select } from "antd";
import SubInventory from "./SubInventory";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { getCategoryInventoryByBreeder } from "../../redux/actions/category_action";

const { Option } = Select;
const animalInventoryTypes = ["Total", "Alive", "Died", "Sold", "Pregnant"];
// const animalInventoryTypes = [{
//     name: 'Alive',
//     value: 100,
// },
// {
//     name: 'Dead',
//     value: 200,
// },
// {
//     name: 'Sold',
//     value: 300,
// },
// {
//     name: 'Borrowed',
//     value: 400,
// },
// {
//     name: 'Pregnant',
//     value: 500,
// }
// ]
const productInventoryType = ["Instock", "Sold", "Expired", "Damaged"];

// const productInventoryType = [{
//     name: 'Sold',
//     value: 1,
// },
// {
//     name: 'Borrowed',
//     value: 1,
// },
// {
//     name: 'Damage',
//     value: 1,
// },
// {
//     name: 'Instock',
//     value: 1,
// }
// ]

const productInventory = [
  {
    category: "Dog Product",
    total: 125,
    sold: 10,
    borrowed: 20,
    damage: 30,
    instock: 40,
    items: [
      {
        name: "Lorem Ispum",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
      {
        name: "Lorem Ispum",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
      {
        name: "Lorem Ispum",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
    ],
  },
  {
    category: "Cats Product",
    total: 125,
    sold: 10,
    borrowed: 20,
    damage: 30,
    instock: 40,
    items: [
      {
        name: "Persian",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
      {
        name: "Bengal",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
      {
        name: "Maine Coon",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
      {
        name: "Siamese",
        total: 12,
        sold: 12,
        borrowed: 1,
        damage: 3,
        instock: 1,
      },
    ],
  },
];

const animalInventory = [
  {
    category: "Dog",
    total: 125,
    alive: 10,
    dead: 20,
    sold: 30,
    borrowed: 40,
    pregnant: 50,
    items: [
      {
        name: "German Shephard",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Poodle",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Bulldog",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Pitbull",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
    ],
  },
  {
    category: "Cats",
    total: 125,
    alive: 10,
    dead: 20,
    sold: 30,
    borrowed: 40,
    pregnant: 50,
    items: [
      {
        name: "Persian",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Bengal",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Maine Coon",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
      {
        name: "Siamese",
        total: 12,
        alive: 12,
        dead: 1,
        sold: 3,
        borrowed: 1,
        pregnant: 3,
      },
    ],
  },
];

const inventories = [
  {
    title: "Animal Inventory",
    type: 'animal',
    data: [],
    types: animalInventoryTypes,
  },
  {
    title: "Product Inventory",
    type: 'product',
    data: [],
    types: productInventoryType,
  },
];

export default function Inventory() {
  const [selectedInventory, setSelectedInventory] = useState({});
  const [allInventory, setAllInventory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const menu = (
    <Menu onChange={(value) => { console.log(value) }}>
      {inventories.map((inventory) => (
        <Menu.Item onClick={() => changeInventory(inventory)}>
          {inventory.title}
        </Menu.Item>
      ))}
      {/* <Menu.Item>
                <Link to={`/`}>
                    Animal Inventory
            </Link>
            </Menu.Item>
            <Menu.Item danger>
                Product Inventory
            </Menu.Item> */}
    </Menu>
  );

  const dispatch = useDispatch();


  const filter = (data) => {
    if (!categoryFilter) return data;
    return data.category.name === categoryFilter;
  }

  const changeInventory = (data) => {
    console.log(data);
    getData(data);
    // setSelectedInventory(data);
  }

  useEffect(() => {
    dispatch(EnableLoader());
    dispatch(getCategoryInventoryByBreeder("animal")).then((response) => {
      console.log("---", response.payload.data)
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setSelectedInventory({ ...inventories[0], data: response.payload.data });
      }
    });
  }, []);


  const getData = (inventory) => {
    dispatch(EnableLoader());
    dispatch(getCategoryInventoryByBreeder(inventory.type)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setSelectedInventory({ ...inventory, data: response.payload.data });
      }
    });
  }

  return (
    <div>
      <Row>
        <Col xs={24} lg={8} className="textAlign-sm-box">
          <Dropdown overlay={menu}>
            <Link className="primary-text" onClick={(e) => e.preventDefault()}>
              <h2 className="primary-text primary-text-heading">
                {selectedInventory.title} <CaretDownOutlined />
              </h2>
            </Link>
          </Dropdown>
        </Col>

        <Col xs={24} lg={8} className="textAlign-sm-box">
          <h2 className="primary-text primary-text-heading">
            {selectedInventory.data ? selectedInventory.data.reduce((acc, cv) => acc + cv.total, 0) : 0} <span className="secondary-text">{selectedInventory.type === 'animal' ? 'Animals' : 'Products'}</span>
          </h2>
        </Col>

        <Col xs={24} lg={8} style={{ marginTop: "10px" }}>
          <Row className="textAlign-sm-box">
            <Col xs={24} lg={10}></Col>
            <Col xs={24} lg={4} className="inv_customTextAligned">
              <span className="primary-text">Showing</span>
            </Col>
            <Col xs={24} lg={10} className="inv_customDropDown">
              <Form.Item name="animal">
                <Select
                  defaultValue="All categories"
                  placeholder="Select category"
                  className="customSelect"
                  onChange={(e) => { console.log(e); setCategoryFilter(e) }}
                >
                  <Option value={''}>All categories</Option>
                  {selectedInventory.data && selectedInventory.data.map(e => (<Option value={e.category.name}>{e.category.name}</Option>))}
                </Select>
              </Form.Item>
            </Col>

            {/* <Col xs={24} lg={10} className="inv_customDropDown">
              <Form.Item name="status">
                <Select
                  defaultValue="All Statuses"
                  placeholder="Select status"
                  className="customSelect"
                >
                  {selectedInventory.types && selectedInventory.types.map((val) => (
                    <Option value={val}>{val}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
        </Col>
      </Row>

      <div>
        <SubInventory
          data={selectedInventory.data ? selectedInventory.data.filter(filter) : []}
          types={selectedInventory.types}
        />
      </div>
    </div>
  );
}
