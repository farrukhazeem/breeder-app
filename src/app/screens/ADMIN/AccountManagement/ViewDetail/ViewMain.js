import React, { useEffect, useState } from "react";
import Cart from "../../../../components/card/card";
import { Row, Col, Form, Space, Tabs } from "antd";
import Button from "../../../../components/button/button";
import {
  MailOutlined,
  PhoneOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import SalesOverview from "./SalesOverview";
import A_P_E_detail from "./A_P_E_detail";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../../redux/actions/loader_action";
import {
  getUserDetailById,
  userDetail,
} from "../../../../redux/actions/user_actions";
import moment from "moment";
import { getSaleStaticsByUser } from "../../../../redux/actions/sales_action";

const { TabPane } = Tabs;

export default function ViewMain(props) {
  console.log(props.location.state.id);
  const [data, setData] = useState(null);
  const [animalCount, setAnimalCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [refreshData, setrefreshData] = useState(null);
  const [animalStatics, setAnimalStatics] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    getData(props.location.state.id);
  }, [refreshData]);

  const getData = (id) => {
    console.log('gettting data ======> ');
    dispatch(EnableLoader());
    dispatch(getUserDetailById(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setData(response.payload.data);
        setAnimalCount(response.payload.data.animals.reduce((acc, cv) => acc + parseInt(cv.aliveQuantity), 0));
        setProductCount(response.payload.data.products.length);
        setEmployeeCount(response.payload.data.employees.length);
      }
    });

    dispatch(getSaleStaticsByUser(id, id, 'admin')).then(response => {
      if (response.payload.status === 200) {
        setAnimalStatics(response.payload.data);
      }
    });
  };
  const onFinish = (values) => {
    console.log(values);
  };


  return data ? (
    <div>
      <Form onFinish={onFinish}>
        <span className="primary-text primary-text-heading ">Account Detail</span>
        <Row>
          <Col span={8}>
            <Cart
              style={{
                width: "90%;",
                height: "auto",
                margin: "10px",
                maxWidth: "800px",
                minWidth: "300px",
              }}
              className="primary-contrast-background"
            >
              <span className="primary-text primary-text-heading ">
                {data.name}
              </span>
              <Button className="inner-primary-btn-green">
                {data.activeSubscription?.subscriptionId?.name}
                {/* {" Package"} */}
              </Button>
              <br />
              <Space direction="horizontal">
                <Space direction="vertical">
                  <div className="secondary-text"> Subscription Date</div>
                  <div className="primary-text">
                    {" "}
                    {moment(data.activeSubscription?.fromDate).format(
                      "DD MMM, YYYY"
                    )}
                  </div>
                </Space>

                <Space direction="vertical" style={{ marginLeft: 20 }}>
                  <div className="secondary-text"> Expiry</div>
                  <div className="primary-text">
                    {" "}
                    {moment(data.activeSubscription?.toDate).format(
                      "DD MMM, YYYY"
                    )}
                  </div>
                </Space>
              </Space>

              <div>
                <br />
                <Space direction="horizontal">
                  <MailOutlined />
                  <div className="primary-text"> {data.email}</div>
                </Space>
                <br />
                <Space direction="horizontal">
                  <PhoneOutlined />
                  <div className="primary-text"> {data.phone}</div>
                </Space>
                <br />
                <Space direction="horizontal">
                  <DatabaseOutlined />
                  <div className="primary-text"> {data.uid}</div>
                </Space>

                <br />
                <Space direction="horizontal">
                  <DatabaseOutlined />
                  <div className="primary-text">
                    {" "}
                    {data.city}, {data.state}
                  </div>
                </Space>
              </div>

              <div>
                <br />
                <span className="primary-text primary-text-heading ">
                  Quick overview
                </span>
                <div style={{ marginTop: 10 }}></div>
                <Space direction="horizontal">
                  <Space direction="vertical">
                    <DatabaseOutlined />
                    <div className="secondary-text"> Animals</div>
                    <div className="primary-text fw-100"> {animalCount}</div>
                  </Space>

                  <Space direction="vertical" style={{ marginLeft: 25 }}>
                    <DatabaseOutlined />
                    <div className="secondary-text"> Products</div>
                    <div className="primary-text fw-100"> {productCount}</div>
                  </Space>

                  <Space direction="vertical" style={{ marginLeft: 25 }}>
                    <DatabaseOutlined />
                    <div className="secondary-text"> Employees</div>
                    <div className="primary-text fw-100"> {employeeCount}</div>
                  </Space>
                </Space>
              </div>
            </Cart>
          </Col>
          <Col span={1}></Col>
          <Col span={15} style={{ marginTop: -25 }}>
            <Tabs>
              <TabPane tab="Sales Overview" key="1">
                <SalesOverview animalStatics={animalStatics} breeder={data} />
              </TabPane>
              <TabPane tab="Animals" key="2">
                <A_P_E_detail name="Animal" data={data.animals} setrefreshData={(val) => setrefreshData(val)} />
              </TabPane>
              <TabPane tab="Products" key="3">
                <A_P_E_detail name="Product" data={data.products} setrefreshData={(val) => setrefreshData(val)} />
              </TabPane>
              <TabPane tab="Employees" key="4">
                <A_P_E_detail name="Employee" data={data.employees} setrefreshData={(val) => setrefreshData(val)} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Form>
    </div>
  ) : null;
}
