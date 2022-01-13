import React from "react";
import Card from "../../components/card/card";
import { Row, Col, Space, Typography, message, Modal } from "antd";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
// import "./Allanimals.scss";
import moment from "moment";
import { removeEmp } from "../../redux/actions/user_actions";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

function EmployeeDisplayList(props) {
  console.log(props);
  const dispatch = useDispatch();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };



  const removeItem = (id) => {
    console.log("removing empmloyee", id);
    const onOkCalled = () => {
      console.log("ok called");
      dispatch(EnableLoader());
      dispatch(removeEmp(id)).then((response) => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          props.refreshData();
        } else {
          message.error(response.payload.message);
        }
      });
    };

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to remove employee?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });
  };

  return (
    <>
      {props.data.map((d) => (
        <Card
          style={{
            width: "100%;",
            height: "auto",
            minWidth: "300px",
            marginTop: "10px",
          }}
        >
          <Row>
            <Col xs={24} lg={8}>
              <Space>

                <img

                  src={
                    !d.image
                      ? require("../../../assets/images/emp/men2.png")
                      : d.image
                  }
                  width={"50"}
                  alt="logo"
                />


                <Space direction="vertical">
                  <span
                    className="primary-text"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {/* <Link
                      to={
                        window.location.pathname === "/product"
                          ? {
                              pathname: "/product/detail",
                              state: { id: d._id },
                            }
                          : window.location.pathname === "/businessprofile"
                          ? "/businessprofile/detail/1"
                          : {
                              pathname: "/animal/profile",
                              state: { id: d._id },
                            }
                      }
                      className="primary-color"
                    > */}
                    {/* {window.location.pathname === "/product"
                        ? "Product"
                        : "Animal"}{" "} */}
                    {d.name}
                    {/* </Link> */}
                  </span>
                  <span className="secondary-text">
                    {" "}
                    Registered date:{" "}
                    {moment(d.createdAt).format("DD MMM, YYYY")}
                  </span>
                </Space>
              </Space>
            </Col>

            <Col xs={24} lg={4}>
              <Row>
                <Col xs={12} md={20}>
                  <span className="secondary-text">
                    Email
                  </span>
                </Col>
                <Col xs={12} md={20}>
                  <span className="primary-text">{d.email}</span>
                </Col>
              </Row>
            </Col>
            {/* <Col xs={24} lg={4}>
              <Row>
                <Col xs={12} md={20}>
                  <span className="secondary-text">Registered by</span>
                </Col>
                <Col xs={12} md={20}>
                  <span className="primary-text">{d.addedBy.name}</span>
                </Col>
              </Row>
            </Col> */}

            {/* <Col xs={24} lg={2}>
              <Row>
                <Col xs={12} md={20}>
                  <span className="secondary-text">
                    Status
                  </span>
                </Col>
                <Col xs={12} md={20}>
                  <span className="primary-text">
                    {window.location.pathname === "/product"
                      ? d.goodConditionQuantity > 0
                        ? "In Stock"
                        : "Out of Stock"
                      : d.status}
                  </span>
                </Col>
              </Row>
            </Col> */}

            <Col xs={24} lg={6} className="textAlign-md-box">
              <Space>
                {/* <Button className="inner-primary-btn">
                  <Link
                    to={
                      window.location.pathname === "/product"
                        ? { pathname: "/product/detail", state: { id: d._id } }
                        : window.location.pathname === "/businessprofile"
                        ? "/businessprofile/detail/1"
                        : { pathname: "/animal/profile", state: { id: d._id } }
                    }
                    className="primary-text"
                  >
                    View Profile
                  </Link>
                </Button> */}
                <Button
                  className="inner-primary-btn"
                  onClick={() => removeItem(d._id)}
                >
                  Archive
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}

export default EmployeeDisplayList;
