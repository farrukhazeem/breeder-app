import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import { ArrowRightOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import Card from "../../../components/card/card";
import {
  Radio,
  Row,
  Col,
  Typography,
  Space,
  List,
  message,
  Switch,
  Dropdown,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import { deleteSubscription, getSubscriptions } from "../../../redux/actions/subscription_action";
import "./PackageManagement.scss";

const { Title } = Typography;

function PackageManagement() {
  const [tabIndex, setTabIndex] = useState("monthly");

  const packages = [
    {
      _id: 1,
      name: "subscription package 1",
      animals: 10,
      employees: 10,
      products: 100,
      price: 10,
      description: "description is added by name",
    },
    {
      _id: 2,
      name: "subscription package 2",
      animals: 20,
      employees: 20,
      products: 200,
      price: 20,
      description: "description second is added by name",
    },
    {
      _id: 3,
      name: "subscription package 3",
      animals: 30,
      employees: 30,
      products: 300,
      price: 30,
      description: "description third is added by name",
    },
  ];
  const [subscriptionData, setSubscriptionData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(EnableLoader());
    dispatch(getSubscriptions()).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setSubscriptionData(response.payload.data);
      }
    });
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const removePackage = (id) => {
    dispatch(EnableLoader());
    dispatch(deleteSubscription(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getData()
      }
    });

  }

  const menu = (data) => (
    <Menu>
      <Menu.Item key="1">
        <Link to={{ pathname: '/admin/package/edit', state: { data } }}>Edit</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link onClick={(ev) => removePackage(data._id)}>Remove</Link>
      </Menu.Item>
    </Menu>
  );
  const SubscriptionPackageInfo = (data) => {

    return (
      <Card className="" key={data._id}>
        <div style={{ right: 10, position: "absolute" }}>
          <Dropdown overlay={() => menu(data)} trigger={['click']}>
            <MoreOutlined style={{ fontSize: 25 }} />
          </Dropdown>
        </div>

        <div style={{ width: 10, height: 10 }}></div>
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical">
            <img
              style={{ alignSelf: "center", width: data.icon ? 30 : 20, height: data.icon ? 30 : null, borderRadius: data.icon ? 20 : 0 }}
              src={
                data.icon
                  ? data.icon
                  : require(`../../../../assets/images/subscription/Package1@2x.png`)
              }
              alt="Logo"
            />

            <Title level={4}>{data.name}</Title>
            <div className={"fs-130"}>$ {(tabIndex === 'monthly') ? data.monthlyPrice : (tabIndex === 'yearly') ? data.yearlyPrice : data.lifetimePrice}/ {(tabIndex === 'monthly') ? "month" : (tabIndex === 'yearly') ? "year" : "lifetime"}</div>
          </Space>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ lineHeight: "3em" }}>
            <p>
              <ArrowRightOutlined /> {data.allowedAnimal} Animals
            </p>
            <p>
              <ArrowRightOutlined /> {data.allowedProduct} Products
            </p>
            <p>
              <ArrowRightOutlined size={0.1} /> {data.allowedEmp} Employees
            </p>
            <p>
              <ArrowRightOutlined size={0.1} /> {data.description}{" "}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <Row>
        <Col xs={24} md={8} className="">
          <h2 className="primary-text primary-text-heading">
            Package Management
          </h2>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }} className=""></Col>

        <Col xs={24} md={8}>
          <div className="textAlign-md-right textAlign-md-box-layer">
            <Button className="secondary-button">
              <Link to={"/admin/package/create"}>Add a new package</Link>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <div className="setting-radio-btn-switch">
            <Radio.Group
              value={tabIndex}
              onChange={(index) => {
                setTabIndex(index.target.value);
              }}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value={"monthly"}>Monthly</Radio.Button>
              <Radio.Button value={"yearly"}>Yearly</Radio.Button>
              <Radio.Button value={"lifetime"}>Lifetime</Radio.Button>
            </Radio.Group>
          </div>
        </Col>
      </Row>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        className="subscription-list-main"
        dataSource={
          tabIndex === "monthly" ? subscriptionData.filter(e => e.monthlyPrice || e.monthlyPrice === 0) :
            tabIndex === "yearly" ? subscriptionData.filter(e => e.yearlyPrice || e.yearlyPrice === 0) :
              subscriptionData.filter(e => e.lifetimePrice || e.lifetimePrice === 0)
          // subscriptionData
        }
        renderItem={(item) => (
          <List.Item>{SubscriptionPackageInfo(item)}</List.Item>
        )}
      />
    </>
  );
}

export default PackageManagement;
