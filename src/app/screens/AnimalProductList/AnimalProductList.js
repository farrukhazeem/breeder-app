import React from "react";
import Card from "../../components/card/card";
import { Row, Col, Space, Typography, message, Modal } from "antd";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { deleteAnimal } from "../../redux/actions/animal_action";
import { deleteProduct } from "../../redux/actions/product_action";
// import "./Allanimals.scss";
import moment from "moment";
const { Text, Title } = Typography;

function AnimalProductList(props) {
  console.log(props, "<--props");
  const dispatch = useDispatch();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  //   return (
  //     <Slider {...settings}>
  //       {props.data.map((e) => (
  //         <div style={{ marginRight: 30 }}>
  //           <Card style={{ textAlign: "center", marginRight: 30 }} >
  //             <Space direction="vertical">
  //               <div
  //                 style={{ width: 200, borderRadius: 100, overflow: "hidden" }}
  //               >
  //                 <img src={e.image} width={200} />
  //               </div>
  //               <Title level={4} style={{marginTop: 5,}}><Link to={'/businessprofile/detail/1'}>Animal ID here</Link></Title>
  //               <Text>Animal Category: {e.category}</Text>
  //               <Text>Breed: Lorem ipsum</Text>
  //             </Space>
  //           </Card>
  //         </div>
  //       ))}
  //     </Slider>
  //   );
  // return (

  // )

  const isAnimal = () => {
    if (props.isPackageChange) {
      if (props.itemtype === "animal") {
        return true;
      } else {
        return false;
      }
    } else {
      if (window.location.pathname === "/animal") {
        return true;
      } else {
        return false;
      }
    }
  };
  const isProduct = () => {
    if (props.isPackageChange) {
      if (props.itemtype === "product") {
        return true;
      } else {
        return false;
      }
    } else {
      if (window.location.pathname === "/product") {
        return true;
      } else {
        return false;
      }
    }
  };

  const removeItem = (item) => {
    const DeleteAnimal = () => {
      console.log(item);
      // dispatch(EnableLoader())
      console.log("removing animals... ");
      dispatch(deleteAnimal(item._id)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          props.refreshData();
          message.success(response.payload.message);
        }
      });
    };

    const DeleteProduct = () => {
      console.log("in product");
      console.log(item);
      dispatch(EnableLoader());
      dispatch(deleteProduct(item._id)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          props.refreshData();
          message.success(response.payload.message);
        }
      });
    };

    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: isAnimal() ? DeleteAnimal : DeleteProduct,
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
                {d.image ? (
                  <img
                    src={d.image}
                    style={{ width: 60, height: 60, borderRadius: 40 }}
                    alt="logo"
                  />
                ) : (
                    <img
                      src={window.location.pathname === "/product" ?
                        require(`../../../assets/images/familytree/Product@2x.png`)
                        :
                        require(`../../../assets/images/familytree/Animal@2x.png`)}
                      width={"50"}
                      alt="logo"
                    />
                  )}

                <Space direction="vertical">
                  <span
                    className="primary-text"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    <Link
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
                    >
                      {/* {window.location.pathname === "/product"
                        ? "Product"
                        : "Animal"}{" "} */}
                      {d.data?.name}   ({d._id?.substring(0, 6)})
                    </Link>
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
                    {window.location.pathname === "/product"
                      ? "Product"
                      : "Animal"}{" "}
                    Category
                  </span>
                </Col>
                <Col xs={12} md={20}>
                  <span className="primary-text">{d.categoryName}</span>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={4}>
              <Row>
                <Col xs={12} md={20}>
                  <span className="secondary-text">Registered by</span>
                </Col>
                <Col xs={12} md={20}>
                  <span className="primary-text">{d.addedBy.name}</span>
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={2}>
              <Row>
                <Col xs={12} md={20}>
                  <span className="secondary-text">
                    {window.location.pathname === "/product" ? "Stock" : ""}{" "}
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
            </Col>

            <Col xs={24} lg={6} className="textAlign-md-box">
              {d.isArchived ? (
                <Typography.Title level={3} style={{ marginTop: 4 }} className="primary-text">Archived</Typography.Title>
              ) : (
                  <Space>
                    <Button className="inner-primary-btn">
                      <Link
                        to={
                          window.location.pathname === "/product"
                            ? { pathname: "/product/detail", state: { id: d._id } }
                            : window.location.pathname === "/businessprofile"
                              ? "/businessprofile/detail/1"
                              : props.itemtype && props.itemtype === "product" ?
                                { pathname: "/product/detail", state: { id: d._id } }
                                :
                                { pathname: "/animal/profile", state: { id: d._id } }
                        }
                        className="primary-text"
                      >
                        View Profile
                  </Link>
                    </Button>
                    <Button
                      className="inner-primary-btn"
                      onClick={() => removeItem(d)}
                    >
                      Archive
                </Button>
                  </Space>
                )}

            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}

export default AnimalProductList;
