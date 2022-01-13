import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Modal,
  Select,
  Switch,
  DatePicker,
  Empty,
  message,
} from "antd";
import Card from "../../../../components/card/card";
import Button from "../../../../components/button/button";
import Input from "../../../../components/input/input";
import "./OrderDetail.scss";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../../redux/actions/loader_action";
import {
  changePaidStatus,
  getSaleById,
} from "../../../../redux/actions/sales_action";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;
const monthNames = [
  {
    abbreviation: "Jan",
    name: "January",
  },
  {
    abbreviation: "Feb",
    name: "February",
  },
  {
    abbreviation: "Mar",
    name: "March",
  },
  {
    abbreviation: "Apr",
    name: "April",
  },
  {
    abbreviation: "May",
    name: "May",
  },
  {
    abbreviation: "Jun",
    name: "June",
  },
  {
    abbreviation: "Jul",
    name: "July",
  },
  {
    abbreviation: "Aug",
    name: "August",
  },
  {
    abbreviation: "Sep",
    name: "September",
  },
  {
    abbreviation: "Oct",
    name: "October",
  },
  {
    abbreviation: "Nov",
    name: "November",
  },
  {
    abbreviation: "Dec",
    name: "December",
  },
];

const humanize = (number) => {
  if (number % 100 >= 11 && number % 100 <= 13) return number + "th";

  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
  }

  return number + "th";
};

function OrderDetail(props) {
  const [installmentModalVisible, setinstallmentModalVisible] = useState(false);
  const [animal, setAnimal] = useState(null);
  // const [isStateAvailable, setIsStateAvailable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData(props.location.state.id);
  }, []);

  const getData = (id) => {
    dispatch(EnableLoader());
    dispatch(getSaleById(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        // message.success(response.payload.message);
        setAnimal(response.payload.data);
      }
    });
  };
  console.log(props.location.state.id);
  const markAsPaidStatus = (id) => {
    dispatch(EnableLoader());
    dispatch(changePaidStatus(id, true)).then((response) => {
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getData(id);
      }
    });
  };
  // const weekMenu  = (
  //     <Menu>
  //         <Menu.Item>Monday</Menu.Item>
  //     </Menu>
  // )

  const InstallmentRenderer = (installmentData) => {
    // return installmentData ? (
    //   <div>
    //     <div className="installment-main">
    //       <Text strong>1st Installment</Text>
    //       <Card className="installment-item secondary-background-grey">
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Installment Date
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>20th April, 2020</Text>
    //           </Col>
    //         </Row>
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Installment Amount
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>$20</Text>
    //           </Col>
    //         </Row>
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Status
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>Cleared</Text>
    //           </Col>
    //         </Row>
    //       </Card>
    //     </div>

    //     <div className="installment-main">
    //       <Text strong>2nd Installment</Text>
    //       <Card className="installment-item secondary-background-grey">
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Installment Date
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>3rd April, 2020</Text>
    //           </Col>
    //         </Row>
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Installment Amount
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>$30</Text>
    //           </Col>
    //         </Row>
    //         <Row className="installment-item-value">
    //           <Col span={12}>
    //             <Text className="secondary-text" strong>
    //               Status
    //             </Text>
    //           </Col>
    //           <Col span={12} className="text-align-right">
    //             <Text strong>Due</Text>
    //           </Col>
    //         </Row>

    //         <Button
    //           className="btn-edit"
    //           onClick={() => setinstallmentModalVisible(true)}
    //           block
    //         >
    //           <EditOutlined /> Edit
    //         </Button>
    //       </Card>
    //     </div>
    //   </div>

    // ) : (<>
    //    <div style={{ width: "100%", marginTop: 30 }}>
    //         <Empty description={"No Installment!"} />
    //     </div>
    // </>);

    return installmentData ? (
      installmentData.map((installment, index) => (
        <div className="installment-main">
          <Text strong>{humanize(index + 1)} Installment</Text>
          <Card className="installment-item secondary-background-grey">
            <Row className="installment-item-value">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Installment Date
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>
                  {moment(installment.date).format("DD MMM, YYYY")}
                </Text>
              </Col>
            </Row>
            <Row className="installment-item-value">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Installment Amount
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>${installment.amount}</Text>
              </Col>
            </Row>
            <Row className="installment-item-value">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Status
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>{installment.isPaid ? "Cleared" : "Due"}</Text>
              </Col>
            </Row>
          </Card>
        </div>
      ))
    ) : (
        <>
          <div style={{ width: "100%", marginTop: 30 }}>
            <Empty description={"No Installment!"} />
          </div>
        </>
      );
  };

  const editInstallmentModal = () => {
    return (
      <div className="edit-installment-modal-main">
        <Modal
          title="Edit Installment"
          closable={false}
          centered={true}
          footer={null}
          visible={installmentModalVisible}
          className="edit-installment-modal"
        >
          <div>
            <Title level={3} strong>
              Edit Installment
            </Title>
            <div style={{ width: "100%", textAlign: "left" }}>
              <div>
                <Text>Installment Date</Text>
              </div>
              <div style={{ width: "100%" }}>
                <DatePicker
                  className="customInput primary-text"
                  style={{ width: "inherit" }}
                />
              </div>
              {/* <div>
                                <Space direction="vertical" className='week-switcher' >
                                    <Text strong>Mon</Text>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}

                                        className="switch-btn"
                                    />
                                </Space>
                            </div> */}
              <div className="amount-text-box">
                <Text>Installment Amount</Text>
                <Input />
              </div>
            </div>
            <div className="actionbuttons">
              <Space>
                <Button
                  className="secondary-button"
                  onClick={() => setinstallmentModalVisible(false)}
                >
                  Send Invoice
                </Button>
                <Button
                  className="secondary-button"
                  onClick={() => setinstallmentModalVisible(false)}
                >
                  Save
                </Button>
              </Space>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  return animal ? (
    <div className="order-detail-main">
      <h2 className="primary-text primary-text-heading">Sales details</h2>
      <Row gutter={100}>
        <Col span={8}>
          <div className="order-info">
            <Row className="order-info-item">
              <Col span={24}>
                <img
                  src={animal.buyerId.image ? animal.buyerId.image : require(`../../../../../assets/images/Business@2x.png`)}
                  style={{ borderRadius: "80px", marginTop: "-10px" }}
                  style={{ width: 120, height: 120 }}
                  alt="logo"
                />
              </Col>
            </Row>
            <Row className="order-info-item">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Order Id
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>{animal.saleUniqueId}</Text>
              </Col>
            </Row>
            <Row className="order-info-item">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Sold on
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>
                  {moment(animal.createdAt).format("DD MMM, YYYY")}
                </Text>
              </Col>
            </Row>
            <Row className="order-info-item">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Sold to
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>{animal.buyerId.name}</Text>
              </Col>
            </Row>
            <Row className="order-info-item">
              <Col span={12}>
                <Text className="secondary-text" strong>
                  Status
                </Text>
              </Col>
              <Col span={12} className="text-align-right">
                <Text strong>{animal.isPaid ? "Paid" : "Unpaid"}</Text>
              </Col>
            </Row>
            {/* {((!animal.isPaid && !animal.isInstallment) ||
              (!animal.isPaid &&
                animal.isInstallment &&
                !animal.installmentData.filter(
                  (e) => e.isPaid === false
                )[0])) && (
              <Row className="order-info-item" style={{ marginTop: 20 }}>
                <Col span={24} className="text-align-right">
                  <Button
                    block
                    className="primary-button"
                    onClick={() => markAsPaidStatus(animal._id)}
                  >
                    Mark as paid
                  </Button>
                </Col>
              </Row>
            )} */}
          </div>
        </Col>
        <Col span={8} className="order-summary-info">
          <Title level={4}>Order Summary</Title>
          {animal.animals[0] && <Divider orientation="left">Animal</Divider>}
          {animal.animals.map((animalData) => (
            <Row className="item">
              <Col span={20}>
                <Space style={{ width: "100%" }}>
                  <img
                    style={{ width: 45, height: 45, borderRadius: 30 }}
                    src={animalData.animalId.image ? animalData.animalId.image : require("../../../../../assets/images/gallery/2nd image@2x.png")}
                  />
                  <Space direction="vertical">
                    <Text strong>{animalData.animalId.data.name}</Text>
                    {/* <Text className="secondary-text" strong>1111-01-01232312</Text> */}
                  </Space>
                </Space>
              </Col>
              <Col span={4} className="amount-col">
                <Text strong>
                  ${animalData.animalId.data.price} x {animalData.quantity}
                </Text>
              </Col>
            </Row>
          ))}


          {animal.products[0] && <Divider orientation="left">Product</Divider>}
          {animal.products.map((productData) => (
            <Row className="item">
              <Col span={20}>
                <Space style={{ width: "100%" }}>
                  <img
                    style={{ width: 45, height: 45, borderRadius: 30 }}
                    src={productData.productId.image ? productData.productId.image : require("../../../../../assets/images/gallery/2nd image@2x.png")}
                  />
                  <Space direction="vertical">
                    <Text strong>{productData.productId.data.name}</Text>
                    {/* <Text className="secondary-text" strong>1111-01-01232312</Text> */}
                  </Space>
                </Space>
              </Col>
              <Col span={4} className="amount-col">
                <Text strong>
                  ${productData.productId.data.price} x {productData.quantity}
                </Text>
              </Col>
            </Row>
          ))}

          <Divider />
          <Row>
            <Col span={12} className="flex-middle">
              <Text strong className="secondary-text">
                Discount
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>${animal.discount}</Text>
            </Col>
          </Row>
          <Divider />

          <Row>
            <Col span={12} className="flex-middle">
              <Text strong className="secondary-text">
                Tax
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>{animal.tax} %</Text>
            </Col>
          </Row>
          <Divider />

          <Row>
            <Col span={12} className="flex-middle">
              <Text strong className="secondary-text">
                Total Amount
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={3} style={{ marginBottom: 0 }}>
                {/* ${animal.price + animal.price * (animal.tax / 100)} */}$
                {animal.totalPrice}
              </Title>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12} className="flex-middle">
              <Text strong className="secondary-text">
                Down Payment
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>${animal.downpayment}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={8} className="installment-info">
          <Title level={4}>Installment Summary</Title>
          {InstallmentRenderer(animal.installmentData)}
        </Col>
      </Row>
      {editInstallmentModal()}
    </div>
  ) : (
      <>
        <div style={{ width: "100%", marginTop: 30 }}>
          <Empty description={"No Order Found"} />
        </div>
      </>
    );
}

export default OrderDetail;
