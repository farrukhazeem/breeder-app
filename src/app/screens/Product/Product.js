import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Select, Space, Empty } from "antd";
import Input from "../../components/input/input";
// import Allanimals from '../Animal/Allanimals';
import AnimalProductList from "../AnimalProductList/AnimalProductList";
import Button from "../../components/button/button";
import { SearchOutlined } from "@ant-design/icons";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { getProduct } from "../../redux/actions/product_action";
import { useDispatch } from "react-redux";
import moment from 'moment'
import { getFormsByBreederAndCategoryType } from "../../redux/actions/form_action";

const { Search } = Input;

const { Option } = Select;
const names = ["All Statuses", "In Stock", "Out of stock"
  // "Sold", "Damaged", "Expired",

];

function Product() {
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currStock, setCurrStock] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(EnableLoader());
    dispatch(getProduct()).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setProduct(response.payload.data);
      }
    });
    dispatch(getFormsByBreederAndCategoryType('product')).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setDataLoaded(true);
        setCategories(response.payload.data ? response.payload.data.map(e => e.categoryId) : null);
      }
    });
  }, []);

  const filterSearch = (value) => {
    if (!filter) return value;
    if (
      value.categoryName.toLowerCase().search(filter.toLowerCase()) > -1 ||
      value.data.name.toLowerCase().search(filter.toLowerCase()) > -1 ||
      value.status.toLowerCase().search(filter.toLowerCase()) > -1
    ) {
      return value;
    } else {
      return null;
    }
  };
  const filterKeyPress = (ev) => {
    console.log(ev);
    setFilter(ev.target.value);

  };
  const refreshData = () => {
    dispatch(EnableLoader());
    dispatch(getProduct()).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setProduct(response.payload.data);
      }
    });

  };

  const stockSearch = (value) => {
    if (!currStock || currStock === 'All Statuses') return value;
    if (currStock === 'In Stock') return value.goodConditionQuantity > 0 ? value : null;
    if (currStock === 'Out of stock') return value.goodConditionQuantity <= 0 ? value : null;
    return null;
  }
  return (
    <div>
      <Row>
        <Col xs={24} md={14} className="textAlign-sm-box">
          <h2 className="primary-text primary-text-heading">
            Product Management
          </h2>
        </Col>
        <Col xs={24} md={10} className="textAlign-sm-right textAlign-sm-box">
          <Input
            onChange={filterKeyPress}
            placeholder="Search product"
            className="greybuttonsearch"
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col xs={0} xl={12}></Col>
        <Col
          xs={24}
          xl={12}
          className="textAlign-sm-box"
          style={{ textAlign: "right" }}
        >
          <Space>
            <span className="primary-text hide-sm-box ">Showing</span>

            <Form.Item name="status">
              <Select
                defaultValue="All Statuses"
                style={{ marginTop: "24px" }}
                placeholder="Select status"
                className="customSelect"
                onChange={(value) => setCurrStock(value)}
              >
                {names.map((name) => (
                  <Option value={name}>{name}</Option>
                ))}
              </Select>
            </Form.Item>
            <div className="textAlign-sm-box">
              <Link to={"/product/register"}>
                <Button disabled={!categories[0] ? true : false} className="secondary-button">
                  Register new Product
                </Button>
              </Link>
            </div>
          </Space>
        </Col>
      </Row>
      <AnimalProductList
        data={product ? product.filter(filterSearch).filter(stockSearch) : []}
        refreshData={refreshData}
      />


      {dataLoaded && !categories[0] && (<div style={{ width: '100%', marginTop: 30 }}><Empty description={'No Product Form Added'} /></div>)}


    </div>
  );
}

export default Product;
