import React, { useEffect, useState } from "react";
import CardSticker from "../../../components/stickers/PieChartCard";
import {
  Row,
  Col,
  Typography,
  Space,
  Timeline,
  Dropdown,
  Button,
  Menu,
  Empty,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import Card from "../../../components/card/card";
import "./EmployeeProfile.scss";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import { getEmp, userDetail } from "../../../redux/actions/user_actions";
import { allSaleBySeller, getSaleStaticsByUser } from "../../../redux/actions/sales_action";
import moment from 'moment';
const { Title, Text } = Typography;
// function handleButtonClick(e) {
//     console.log('click left button', e);
// }

function handleMenuClick(e) {
  console.log("click", e);
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd item
    </Menu.Item>
  </Menu>
);
function EmployeeProfile(props) {
  console.log(props.match.params.id);

  const [notFoundError, setNotFoundError] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [salesHistoryData, setsalesHistoryData] = useState([]);
  const [saleStats, setSaleStats] = useState({
    myAnimalSoldPercentage: 0,
    myAnimalsSold: 0,
    myTotalAmountReceived: 0,
    myTotalSaleAmount: 0,
    mytotalSale: 0,
    mytotalSalePercentage: 0,
    totalAmountReceived: 0,
    totalAnimalsSold: 0,
    totalSale: 0,
    totalSaleAmount: 0,
    myTotalAmountReceivedPercentage: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(EnableLoader());
      dispatch(getEmp(props.match.params.id)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setEmployee(response.payload.data);
          getSaleStatics(
            response.payload.data._id,
            response.payload.data.breederId
          );
        } else {
          setNotFoundError(true);
        }
      });
      getAllSaleBySeller(props.match.params.id);
    } else {
      setNotFoundError(true);
    }
  }, []);


  const getAllSaleBySeller = (id) => {
    dispatch(EnableLoader());
    dispatch(allSaleBySeller(id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setsalesHistoryData(response.payload.data.map(e => ({...e, orderId: e.saleUniqueId, onDate: moment(e.createdAt).format("DD MMM, YYYY"), soldTo: e.buyerId.name, amount: '$'+e.totalPrice, paymentProcedure: e.paymentProcedure ? 'On installment': 'One time payment'  })))
      } 
    });
  } 

  const getSaleStatics = (id, breederId) => {
    console.log(id);
    console.log(breederId);
    dispatch(getSaleStaticsByUser(id, breederId)).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setSaleStats(response.payload.data);
      }
    });
  };
  const saleStateValues = [
    {
      percentage: 5,
      totalCount: 15,
      title: "Total animal sold",
    },
    {
      percentage: 62,
      totalCount: "$1650",
      title: "Total animal received",
    },
    {
      percentage: 5,
      totalCount: "$450",
      title: "Total sales",
    },
  ];

  // const salesHistoryData = [
  //   {
  //     orderId: "93KI85NG07",
  //     onDate: "3rd June 2020",
  //     soldTo: "Avery Jackson",
  //     amount: "$600",
  //     paymentProcedure: "2 month installment",
  //   },
  //   {
  //     orderId: "93KI85NG07",
  //     onDate: "3rd June 2020",
  //     soldTo: "Avery Jackson",
  //     amount: "$600",
  //     paymentProcedure: "2 month installment",
  //   },
  //   {
  //     orderId: "93KI85NG07",
  //     onDate: "3rd June 2020",
  //     soldTo: "Avery Jackson",
  //     amount: "$600",
  //     paymentProcedure: "One time payment",
  //   },
  // ];

  return employee ? (
    <div>
      <Row gutter={90}>
        <Col lg={12} sm={24}>
          <Title level={2}>Employee Profile</Title>
          <div class="dot active"></div> <Text>Active</Text>
          {Profile(employee)}
          {/* {RecentActivities()} */}
        </Col>
        <Col lg={12} sm={24}>
          {/* <div className="displayDropdown">
            <Text>Showing </Text>
            <Dropdown overlay={menu}>
              <Button
                style={{
                  borderRadius: 8,
                  height: "39px",
                  background: "white",
                  color: "black",
                }}
              >
                All time purchases <DownOutlined />
              </Button>
            </Dropdown>
          </div> */}
          <div>{SaleStateStickers(saleStateValues, saleStats)}</div>
          <div>{SalesHistory(salesHistoryData)}</div>
        </Col>
      </Row>
    </div>
  ) : (
    <div>
      {notFoundError && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <Empty description={"No Emplyee available"} />
        </div>
      )}
    </div>
  );
}

const Profile = (data) => {
  return (
    <div className="profile-block">
      <Title level={4}>{data.name}</Title>
      <Row>
        <Col span={4}>
          <Space direction="vertical">
            <Text>Email:</Text>
            <Text>Phone:</Text>
            <Text>Address:</Text>
            <Text>State:</Text>
            <Text>City:</Text>
          </Space>
        </Col>
        <Col span={20}>
          <Space direction="vertical">
            <Text strong>{data.email}</Text>
            <Text strong>{data.phone}</Text>
            <Text strong>{data.address}</Text>
            <Text strong>{data.state}</Text>
            <Text strong>{data.city}</Text>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const RecentActivities = () => {
  return (
    <div className="profile-block">
      <Title level={4} style={{ marginBottom: 0 }}>
        Recent Activities
      </Title>
      <Timeline className="activities">
        <Timeline.Item>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Text strong className="activityDate">
              27th Apr 2020, 8:30am
            </Text>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Text strong className="activityDate">
              27th Apr 2020, 8:30am
            </Text>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Text strong className="activityDate">
              27th Apr 2020, 8:30am
            </Text>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Text strong className="activityDate">
              27th Apr 2020, 8:30am
            </Text>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

const SaleStateStickers = (data, saleStats) => {
  return (
    <div className="">
      <div className="secondary-text fs-160" style={{ marginBottom: 0 }}>
        Sales Stats
      </div>
      <Row>
        {/* {data.map(e => )} */}
        <Col sm={24} lg={8} xl={8}>
          <div style={{ padding: 3 }} className="cardSticker">
            <CardSticker
              style={{ minHeight: "110px" }}
              totalCount={saleStats.myAnimalsSold}
              percentage={saleStats.myAnimalSoldPercentage}
              titleText={"Total Animals Sold"}
            ></CardSticker>
          </div>
        </Col>
        <Col sm={24} lg={8} xl={8}>
          <div style={{ padding: 3 }} className="cardSticker">
            <CardSticker
              style={{ minHeight: "110px" }}
              totalCount={'$' + saleStats.myTotalAmountReceived}
              percentage={saleStats.myTotalAmountReceivedPercentage}
              titleText={"Total Amount Received"}
            ></CardSticker>
          </div>
        </Col>
        <Col sm={24} lg={8} xl={8}>
          <div style={{ padding: 3 }} className="cardSticker">
            <CardSticker
              style={{ minHeight: "110px" }}
              totalCount={'$' + saleStats.myTotalSaleAmount}
              percentage={saleStats.mytotalSalePercentage}
              titleText={"Total Sales Amount"}
            ></CardSticker>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const SalesHistory = (data) => {
  return (
    <div className="profile-block">
      <Title level={4} style={{ marginBottom: 0 }}>
        Sales History
      </Title>
      {data.map((e) => SaleHistoryCard(e))}
    </div>
  );
};

const SaleHistoryCard = (data) => {
  return (
    <Card className="sale-history-card">
      <Row>
        <Col span={12}>
          <Text strong>{data.orderId}</Text>
          <p>On: {data.onDate}</p>
          <p>Sold to: {data.soldTo}</p>
        </Col>
        <Col span={12} className="col-payment">
          <Text strong>{data.amount}</Text>
          <Text className="small-para"> ({data.paymentProcedure})</Text>
        </Col>
      </Row>
    </Card>
  );
};
export default EmployeeProfile;
