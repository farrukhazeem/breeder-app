import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Divider,
  Avatar,
  message,
  Form,
  Typography,
} from "antd";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { Link } from 'react-router-dom'
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import moment from "moment";
import EditModal from "./EditModal";
//import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action';
import { useDispatch } from "react-redux";
import {
  editDetail,
  userDetail,
} from "../../redux/actions/user_actions";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { getSale } from "../../redux/actions/sales_action";
import { getAllForms } from "../../redux/actions/form_action";
import Modal from "antd/lib/modal/Modal";
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'
import { baseImageURL } from '../../config/globalConfig'

const { Title } = Typography;


export default function Aboutus(props) {
  const dispatch = useDispatch();
  const [modalvisible, setmodalvisible] = useState(false);
  const [userinfo, setuserinfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [sales, setSales] = useState([]);
  const [modalSocialLinksVisible, setmodalSocialLinksVisible] = useState(false);
  const [socialLinkType, setsocialLinkType] = useState(null);
  const [socialLinkValue, setsocialLinkValue] = useState(null);

  const ChangeModal = () => {
    setmodalvisible(!modalvisible);
  };

  useEffect(() => {
    // dispatch(userDetail()).then(response => {
    //     console.log(response);
    //     if (response.payload.status === 200) {
    //         setuserinfo(response.payload.data)
    //     }
    // })
    getData();
    getforms();
    // getCategories();
    getSalesData();
  }, []);

  const getData = () => {
    dispatch(userDetail()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setuserinfo(response.payload.data);
      }
    });
  };

  const getforms = () => {
    dispatch(getAllForms()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        // setuserinfo(response.payload.data)
        setCategories(response.payload.data);
      }
    });
  };
  // const getCategories = () => {
  //   dispatch(getCategoriesByType("animal")).then((response) => {
  //     console.log(response);
  //     if (response.payload.status === 200) {
  //       setCategories(response.payload.data);
  //     }
  //   });
  // };


  const getSalesData = () => {
    dispatch(getSale("recentlySold")).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setSales(
          response.payload.data && response.payload.data[0]
            ? response.payload.data.map((e) => e.animals).flat(1)
            : []
        );
        console.log(response.payload.data.map((e) => e.animals).flat(1));
        //   console.log(GetUniqueSaleAnimals(response.payload.data.map(e => e.animals).flat(1)));
      }
    });
  };

  // const onDeleteDealCategory = (id) => {
  //   dispatch(EnableLoader());
  //   dispatch(deleteDealCategory(id)).then((response) => {
  //     dispatch(DisableLoader());
  //     console.log(response);
  //     if (response.payload.status === 200) {
  //       getData();
  //       message.success(response.payload.message);
  //     }
  //   });
  // };

  const socialLinkClicked = (type) => {
    setsocialLinkType(type);
    setmodalSocialLinksVisible(true);
  };

  // const categoryValueChange = (value) => {
  //   console.log(value);
  //   dispatch(EnableLoader());
  //   dispatch(addDealCategory({ dealCategories: [value] })).then((response) => {
  //     dispatch(DisableLoader());
  //     console.log(response);
  //     if (response.payload.status === 200) {
  //       getData();
  //       //   getCategories();
  //       message.success(response.payload.message);
  //     }
  //   });
  // };

  const onFinishSocialLink = (values) => {
    console.log(values.link);
    dispatch(EnableLoader());
    console.log({ socialLinks: userinfo.socialLinks ? { ...userinfo.socialLinks, [socialLinkType]: values.link } : { socialLinks: { [socialLinkType]: values.link } } });
    dispatch(editDetail({ socialLinks: { ...userinfo.socialLinks, [socialLinkType]: values.link } })).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        setmodalSocialLinksVisible(false);
      }
    })
  };
  const onCancelLinkModal = () => {
    setmodalSocialLinksVisible(false);
    setsocialLinkValue(null);
    setsocialLinkType(null);
  };
  return (
    <>
      <Row>
        <Col span={12} xs={24} md={12} className="textAlign-sm-box">
          <h2 className="primary-text primary-text-heading textAlign-sm-box">
            {userinfo.businessName}
          </h2>
        </Col>
        <Col
          span={12}
          xs={24}
          md={12}
          className="textAlign-md-box textAlign-sm-right"
        >
          <div className="">
            <Button className="secondary-button" onClick={ChangeModal}>
              <img
                style={{ marginLeft: "-10px" }}
                width={"30"}
                src={require("../../../assets/images/edit.png")}
                alt="edit"
              />
              Edit Profile
            </Button>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "7px" }}></div>
      <Row>
        <Col xs={24} md={12} className="textAlign-sm-box">
          <Row>
            <Col xs={12}>
              <span className="secondary-text">Contact Person</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.name}</span>
            </Col>
          </Row>

          <div style={{ marginTop: "7px" }}></div>
          <Row>
            <Col xs={12}>
              <span className="secondary-text">Contact Number</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.phone}</span>
            </Col>
          </Row>

          <div style={{ marginTop: "7px" }}></div>
          <Row>
            <Col xs={12}>
              <span className="secondary-text">Email</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.email}</span>
            </Col>
          </Row>

          {getUserFromLocalStorage() !== "Individual" &&
            <>
              <div style={{ marginTop: "7px" }}></div>
              <Row>
                <Col xs={12}>
                  <span className="secondary-text">Website</span>
                </Col>
                <Col xs={12}>
                  <span className="primary-text">
                    {userinfo.website ? userinfo.website : "No Website"}
                  </span>
                </Col>
              </Row>
            </>
          }

          <div style={{ marginTop: "7px" }}></div>

          <Row>
            <Col xs={12}>
              <span className="secondary-text">Date Joined</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">
                {moment(userinfo.createdAt).format("DD MMM, YYYY (HH:mm:ss)")}
              </span>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={12} className="textAlign-sm-box">
          {/* <div style={{ marginTop: "7px" }}></div>
                    <Row>
                        <Col xs={12}>
                            <span className="secondary-text">No of animals</span>
                        </Col>
                        <Col xs={12}>
                            <span className="primary-text">{userinfo.noOfAnimals}</span>
                        </Col>
                    </Row>

                    <div style={{ marginTop: "7px" }}></div>
                    <Row>
                        <Col xs={12}>
                            <span className="secondary-text">No of employees</span>
                        </Col>
                        <Col xs={12}>
                            <span className="primary-text">{userinfo.noOfEmployees}</span>
                        </Col>
                    </Row> */}

          {/* <div style={{ marginTop: "7px" }}></div> */}
          <Row>
            <Col xs={12}>
              <span className="secondary-text">City</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.city}</span>
            </Col>
          </Row>

          <div style={{ marginTop: "7px" }}></div>
          <Row>
            <Col xs={12}>
              <span className="secondary-text">State</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.state}</span>
            </Col>
          </Row>

          <div style={{ marginTop: "7px" }}></div>
          <Row>
            <Col xs={12}>
              <span className="secondary-text">Care Giver ID</span>
            </Col>
            <Col xs={12}>
              <span className="primary-text">{userinfo.uid}</span>
            </Col>
          </Row>

          {getUserFromLocalStorage() !== "Individual" &&
            <>
              <div style={{ marginTop: "7px" }}></div>
              <Row>
                <Col xs={12}>
                  <span className="secondary-text">Year Founded</span>
                </Col>
                <Col xs={12}>
                  <span className="primary-text">
                    {userinfo.founded ? userinfo.founded : "No value"}
                  </span>
                </Col>
              </Row>
            </>
          }



        </Col>
      </Row>

      <Divider />

      <Row>
        <Col xs={24} md={12} className="textAlign-sm-box">
          <span className="primary-text fs-130">About us</span>
          <div className="primary-text" style={{ width: "90%" }}>
            {userinfo.description}
          </div>
          <br /> <br /> <br />
          <Col xs={24} md={12} className="textAlign-sm-box">
            <span className="primary-text fs-130">Connect With us</span>
            <div className="primary-text">
              <Space className="textAlign-sm-box">
                {/* <Avatar size={45} icon={<WhatsAppOutlined />} /> */}
                <Avatar
                  size={45}
                  icon={<FacebookOutlined />}
                  onClick={() => socialLinkClicked("facebook")}
                />
                <Avatar
                  size={45}
                  icon={<TwitterOutlined />}
                  onClick={() => socialLinkClicked("twitter")}
                />
                <Avatar
                  size={45}
                  icon={<LinkedinOutlined />}
                  onClick={() => socialLinkClicked("linkedin")}
                />
                <Avatar
                  size={45}
                  icon={<InstagramOutlined />}
                  onClick={() => socialLinkClicked("instagram")}
                />
              </Space>
            </div>
          </Col>
        </Col>

        <Col xs={24} md={12} className="textAlign-sm-box">
          <span className="primary-text fs-130">Animals we love</span>
          {/* <Row className="textAlign-sm-box">
            <Select
              style={{ width: "100%" }}
              allowClear
              showSearch
              className=" customSelect"
              onChange={categoryValueChange}
            >
              {categories.map((e) => (
                <Select.Option value={e._id}>{e.name}</Select.Option>
              ))}
            </Select>
          </Row> */}
          <Row className="textAlign-sm-box">
            {categories.map((category) => (
              <Col style={{ margin: "10px" }}>
                <Button className="padding-button-design">
                  {category.categoryId.name}
                  {/* <CloseOutlined
                      onClick={() => onDeleteDealCategory(category._id)}
                    /> */}
                </Button>
              </Col>
            ))}
          </Row>
          <br />
          {getUserFromLocalStorage() !== "Individual" &&
            <>
              <span className="primary-text fs-130">Recently sold animals</span>
              <Row className="textAlign-sm-box">
                {sales.map((sale) => (
                  <Col style={{ margin: "10px" }} className="textAlign-sm-box">
                    <Link to={`/animalProfile/${sale.animalId?._id}`} className="primary-text fs-150 ">
                      <Space direction="vertical" className="textAlign-sm-box">
                        <img
                          src={
                            sale.animalId.image ? `${baseImageURL}${sale.animalId.image}`
                              : require(`../../../assets/images/familytree/Animal@2x.png`)}
                          style={{ width: 50, height: 50, borderRadius: 30 }}
                          alt="logo"
                        />
                        {sale.animalId && sale.animalId.data.name}
                      </Space>
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          }
        </Col>
      </Row>

      <EditModal
        modalvisible={modalvisible}
        ChangeModal={ChangeModal}
        userinfo={userinfo}
      />

      <Modal visible={modalSocialLinksVisible} footer={null} closable={false}>
        <Form onFinish={onFinishSocialLink} layout={"vertical"}>
          <Title level={3} strong>
            Connect With us
          </Title>

          <Form.Item
            name="link"
            label={"Link"}
            rules={[
              {
                required: true,
                message: "Please input link",
              },
            ]}
          >
            <Input
              placeholder="Enter Link"
            />
          </Form.Item>

          <Space>
            <Button
              className="secondary-button"
              onClick={() => onCancelLinkModal()}
            >
              Cancel
            </Button>
            <Button className="secondary-button" htmlType="submit">
              Save Link
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
