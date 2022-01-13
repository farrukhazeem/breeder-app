import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Form,
  Select,
  Typography,
  Radio,
  Modal,
  message,
  Spin,
} from "antd";
import Input from "../../../components/input/input";
import Card from "../../../components/card/card";
import Button from "../../../components/button/button";
import { Link } from "react-router-dom";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import RadioGroup from "../../../components/radio/RadioGroup";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { useDispatch } from "react-redux";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import {
  deleteAnimal,
  getAnimalall,
} from "../../../redux/actions/animal_action";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { getAdminDashboardStatics } from "../../../redux/actions/user_actions";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Title, Text } = Typography;
const { Option } = Select;
const saleStateValues = [

];
export default function Dashboard() {
  const dispatch = useDispatch();
  const [animals, setAnimals] = useState([]);
  const [totalBreeders, setTotalBreeders] = useState({
    total: 0,
    active: 0,
    block: 0
  })
  const [adminDataStatics, setAdminDataStatics] = useState([{ totalCount: "$0", title: "Total sales" },
  { totalCount: "$0", title: "Avg monthly sales" },
  { totalCount: "$0", title: "Total animals" },
  { totalCount: "$0", title: "Total products" }]);
  const getAnimals = () => {
    dispatch(EnableLoader());
    dispatch(getAnimalall()).then((result) => {
      dispatch(DisableLoader());
      console.log(result);
      if (result.payload.status === 200) {
        setAnimals(result.payload.data);
      }
    });
  };
  useEffect(() => {
    getAnimals();
    adminDashboardStatics();
  }, []);


  const adminDashboardStatics = () => {
    dispatch(EnableLoader());
    dispatch(getAdminDashboardStatics()).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        const { totalSale, animalCount, productCount, averageSale, totalBreeders } = response.payload.data;
        setAdminDataStatics([{ totalCount: `$${totalSale}`, title: "Total sales" },
        { totalCount: `$${averageSale}`, title: "Avg monthly sales" },
        { totalCount: `${animalCount}`, title: "Total animals" },
        { totalCount: `${productCount}`, title: "Total products" }])
        setTotalBreeders(totalBreeders)
      }
    });
  }

  const customerData = [
    {
      name: "Name goes here",
      date: "30th Jan ,2020",
      expiry: "30th Feb ,2020",
      location: "Burbank,California",
      status: "Active",
    },
    {
      name: "Name goes here",
      date: "30th Jan ,2020",
      expiry: "30th Feb ,2020",
      location: "Burbank,California",
      status: "Active",
    },
    {
      name: "Name goes here",
      date: "30th Jan ,2020",
      expiry: "30th Feb ,2020",
      location: "Burbank,California",
      status: "Active",
    },
  ];

  const types = ["Alive", "Dead", "Sold", "Borrowed", "Pregnant"];


  const data = [
    { name: "Jan", sale: 40 },
    { name: "Feb", sale: 100 },
    { name: "Mar", sale: 30 },
    { name: "Apr", sale: 90 },
    { name: "May", sale: 50 },
    { name: "Jun", sale: 30 },
    { name: "Jul", sale: 10 },
    { name: "Aug", sale: 30 },
    { name: "Sep", sale: 40 },
    { name: "Oct", sale: 90 },
    { name: "Nov", sale: 50 },
    { name: "Dec", sale: 30 },
  ];

  const renderLineChart = (
    <LineChart
      width={50}
      height={30}
      data={data}
      className="primary-contrast-background"
      style={{ borderRadius: 10, height: 50 }}
    >
      <Line type="monotone" dataKey="sale" dot={false} />
    </LineChart>
  );

  const DeleteAnimal = (id) => {
    const onOkCalled = () => {
      console.log("called ok");
      //deleteCategoriesById(id)
      dispatch(EnableLoader());
      dispatch(deleteAnimal(id)).then((response) => {
        dispatch(DisableLoader());
        console.log(response);
        if (response.payload.status === 200) {
          message.success("Animal Updated Successfully");
          // message.success(response.payload.message);
          //   getAllActivities()
          getAnimals();
        } else {
          message.error(response.payload.message);
        }
      });
    };

    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove animal?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });
  };

  const SaleStateStickers = (data, name) => {
    return (
      <div className="">
        <Row gutter={10}>
          {data.map((e, index) => (
            <Col sm={24} lg={12}>
              <div style={{ padding: 3 }} className="cardSticker">
                <Card>
                  <Row>
                    <Col span={16}>
                      <Space direction="vertical">
                        <span className="secondary-text">{e.title}</span>
                        <span className="primary-text fw-100">
                          {e.totalCount}
                        </span>
                      </Space>
                    </Col>

                    <Col span={6}>{renderLineChart}</Col>
                  </Row>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const [keyword, setKeyword] = useState(null);
  const searchData = (e) => {
    setKeyword(e.target.value);
  }
  const filterData = (animal) => {
    if (!keyword) return animal;
    if (animal.data?.name && !(animal.data?.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
    if (animal.data?.description && !(animal.data?.description.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
    if (!(animal.categoryName.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
    // if (!(animal.addedBy.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
    return null;
  }


  const [statusFilter, setstatusFilter] = useState("All")
  const filterDataStatus = (animal) => {
    if (statusFilter === "All")
      return animal;
    if (statusFilter === "Active") { if (animal && animal.isArchived === false) return animal; }
    else
      if (animal && animal.isArchived === true) { return animal; }

  }

  return (
    <div>
      <h2 className="primary-text primary-text-heading">Dashboard</h2>
      <br />
      <Row>
        <Col span={11}>{SaleStateStickers(adminDataStatics)}</Col>
        <Col span={1}></Col>
        <Col span={12}>
          <Card>
            <div className="primary-text fw-100">Overall breeder status</div>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={16}>
                    <div>
                      <div class="yellow-circle">
                        <span style={{ color: "white" }}>{totalBreeders.total}</span>
                      </div>
                      <div class="red-circle">
                        <span style={{ color: "white" }}>{totalBreeders.block}</span>
                      </div>
                      <div class="green-circle">
                        <span style={{ color: "white" }}>{totalBreeders.active}</span>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical" style={{ marginTop: 20 }}>
                      <Radio checked className="app-radiobx-yellow">
                        Total
                      </Radio>
                      <Radio checked className="app-radiobx-green">
                        Active
                      </Radio>
                      <Radio checked className="app-radiobx-red">
                        Block
                      </Radio>
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col span={4}></Col>
              <Col span={8}>
                <Card
                  style={{ textAlign: "center" }}
                  className="primary-contrast-background"
                >
                  <div className="primary-text fw-100">$108k</div>
                  <div className="secondary-text">subscription reveue</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Input onChange={searchData}
            placeholder="Search for animal"
            className="greybuttonsearch2"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Space>
            {/* <Form.Item name="filters">
              <Input
                placeholder="Filters"
                className="greybuttonsearch2"
                style={{ width: "160px" }}
                suffix={<FilterFilled />}
              />
            </Form.Item> */}

            <Select placeholder="Select Status" defaultValue="All"
              className="customSelect" style={{ minWidth: "150px" }} onChange={(e) => setstatusFilter(e)}>
              {["All", "Active", "Archieved"].map(type => (
                <Option value={type} key={type}>{type}</Option>
              ))}
            </Select>

            {/* <Form.Item name="sort">
              <Select placeholder="Sort by" className="customSelect" style={{ minWidth: "130px" }}>
                {types.map((type) => (
                  <Option value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item> */}
          </Space>
        </Col>
      </Row>

      {/* <div onScroll={(event) => {console.log('scrolling'); console.log(event);}} style={{overflow: 'auto', maxHeight: 500}}> */}

      {
        animals && animals.filter(filterDataStatus).filter(filterData).map((d) => (
          <Card
            className="animal-list-card"
            style={{
              width: "100%;",
              minWidth: "300px",
              marginTop: "10px",
            }}
          >
            <Row>
              <Col xs={24} lg={9}>
                <Space>
                  <img
                    src={
                      d.image
                        ? d.image
                        : require(`../../../../assets/images/familytree/Animal@2x.png`)
                    }
                    style={{ borderRadius: 50, width: 45, height: 45 }}
                    alt="logo"
                  />

                  <Space direction="vertical">
                    <span className="primary-text">
                      <Space>
                        <div>{d.data.name} </div>
                        {d.featured ? (
                          <div
                            style={{
                              //   cursor: "pointer",
                              background: "#42f578",
                              paddingLeft: 8,
                              paddingRight: 8,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: 20,
                            }}
                          >
                            <h4 style={{ fontWeight: "bolder", color: "white" }}>
                              Featured
                          </h4>
                          </div>
                        ) : null}
                      </Space>
                    </span>
                    <span className="secondary-text" style={{ fontSize: 12 }}>
                      {" "}
                    Registered date:{" "}
                      {moment(d.createdAt).format("DD MMM, YYYY")}
                    </span>
                  </Space>
                </Space>
              </Col>
              <Col lg={4}></Col>

              <Col xs={24} lg={5}>
                <Row>
                  <Col xs={12} md={20}>
                    <span className="secondary-text">Animal Category</span>
                  </Col>
                  <Col xs={12} md={20}>
                    <span className="primary-text">{d.categoryName}</span>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} lg={3}>
                <Row>
                  <Col xs={12} md={20}>
                    <span className="secondary-text">Status</span>
                  </Col>
                  <Col xs={12} md={20}>
                    <span className="primary-text">
                      {d.isActive ? "Active" : "Unactive"}
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} lg={3} className="textAlign-md-box">
                <Button
                  className="inner-primary-btn"
                  onClick={() => DeleteAnimal(d._id)}
                >
                  {d.isArchived ?
                    "Activate"
                    :
                    "Archieve"
                  }
                </Button>
              </Col>
            </Row>
          </Card>
        ))
      }
      {/* <Spin indicator={antIcon} />
            </div> */}
    </div >
  );
}
