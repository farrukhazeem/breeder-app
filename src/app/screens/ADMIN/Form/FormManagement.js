import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import { Row, Col, Typography, Space, Empty, message, Divider, Modal, Radio } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import { getAllForms, updateForm, deleteFormAdmin, deleteFormIdRequest } from "../../../redux/actions/form_action";
import moment from 'moment';
import FormRequest from './FormRequest'

const { Title } = Typography;

function FormManagement() {
  const [forms, setForms] = useState([]);

  const [type, setType] = useState('forms');

  const dispatch = useDispatch();

  useEffect(() => {
    getForms();
  }, []);


  const getForms = () => {
    dispatch(EnableLoader());
    dispatch(getAllForms()).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        if (response.payload.data[0]) {
          setForms(response.payload.data);
        } else {
          setForms(null);
        }
      }
    });
  }


  const updatePublish = (id, published) => {
    dispatch(updateForm(id, { published })).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status == 200) {
        message.success(response.payload.editMessage);
        getForms();
      } else {
        message.error(response.payload.message);
      }
    })
  }

  const customerData = [
    {
      name: "Cow",
      date: "30th Jan ,2020",
      status: "Unpublish",
      image: "Cow Form@2x.png",
    },
    {
      name: "Horse",
      date: "30th Jan ,2020",
      status: "Publish",
      image: "Horse Form@2x.png",
    },
    {
      name: "Dog",
      date: "30th Jan ,2020",
      status: "Unpublish",
      image: "Dogs Form@2x.png",
    },
    {
      name: "Goat",
      date: "30th Jan ,2020",
      status: "Publish",
      image: "Goats Form@2x.png",
    },
    {
      name: "Sheep",
      date: "30th Jan ,2020",
      status: "Publish",
      image: "Sheep Form@2x.png",
    },
    {
      name: "Duck",
      date: "30th Jan ,2020",
      status: "Unpublish",
      image: "Ducks Form@2x.png",
    },
  ];

  const removeRequestFormId = (id) => {
    dispatch(deleteFormIdRequest(id)).then(resultResponse => {
      if (resultResponse.payload.status === 200) {
        //message.success(resultResponse.payload.message);
      }
      else {
        message.error(resultResponse.payload.message);
      }
    })
  }

  const removeClick = (categoryId, id) => {
    let category_id;
    category_id = categoryId._id ? categoryId._id : categoryId
    const onOkCalled = () => {
      removeRequestFormId(id)
      dispatch(deleteFormAdmin(category_id, id)).then(resultResponse => {
        dispatch(DisableLoader());
        if (resultResponse.payload.status === 200) {
          message.success(resultResponse.payload.message);
          getForms();
        }
        else {
          message.error(resultResponse.payload.message);
        }
      });
    }

    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });

  }


  return (
    <div style={{}}>
      <Row>
        <Col xs={24} md={8} className="">
          <h2 className="primary-text primary-text-heading">Form Management</h2>
        </Col>

        <Col xs={24} md={8} style={{ textAlign: "center" }} className="">
          <div className="textAlign-md-box-layer setting-radio-btn-switch-two">

            <Radio.Group value={type} onChange={(e) => setType(e.target.value)} >
              <Radio.Button value="forms">Forms</Radio.Button>
              <Radio.Button value="request">Requests</Radio.Button>
            </Radio.Group>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="textAlign-md-right textAlign-md-box-layer">
            <Button className="secondary-button">
              <Link to={"/admin/form/main"}>Add a new form</Link>
            </Button>
          </div>
        </Col>
      </Row>
      <br />

      {type === "forms" ?
        <div>
          {forms ? (
            <div>
              <Divider orientation="left">Animal Forms</Divider>
              {forms.filter(e => e.categoryId.type === 'animal')[0] ? forms.filter(e => e.categoryId.type === 'animal').map((d) => (
                <Card
                  className="animal-list-card"
                  style={{
                    width: "100%;",
                    minWidth: "300px",
                    marginTop: "10px",
                  }}
                >
                  <Row>
                    <Col xs={24} md={8}>
                      <Space>
                        <img
                          src={d.categoryId.icon && d.categoryId.icon.split("/").pop() !== "null" ?
                            d.categoryId.icon : require("../../../../assets/images/avatar.png")}
                          style={{ borderRadius: 50, width: 40, height: 40 }}
                          alt="logo"
                        />

                        <Space direction="vertical">
                          <div className="primary-text fw-100">
                            {d.categoryId.name} Form
                        <img
                              src={
                                d.published &&
                                require(`../../../../assets/images/icons/completed.png`)
                              }
                              width={"17"}
                              style={{
                                borderRadius: 50,
                                marginLeft: 10,
                                marginTop: -3,
                              }}
                            />
                          </div>
                          <span className="secondary-text" style={{ fontSize: 12 }}>
                            {" "}
                        Registered date: {moment(d.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </Space>
                      </Space>
                    </Col>

                    <Col sm={24} lg={8}></Col>

                    <Col sm={24} lg={8}>
                      <div>
                        <Space>
                          <Button className="inner-primary-btn">
                            <Link to={{ pathname: "/admin/form/edit", state: { data: d, type: 'animal' } }}>Edit Form</Link>
                          </Button>
                          <Button className="inner-primary-btn" onClick={() => d.published ? updatePublish(d._id, false) : updatePublish(d._id, true)}>{d.published ? 'Unpublish' : 'Publish'}</Button>
                          <Button className="inner-primary-btn" onClick={() => { removeClick(d.categoryId, d._id) }}>Remove</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )) : (
                  <div style={{ width: "100%", marginTop: 30 }}>
                    <Empty description={"No Animal Form Found!"} />
                  </div>
                )}



              <Divider orientation="left">Product Forms</Divider>
              {forms.filter(e => e.categoryId.type === 'product')[0] ? forms.filter(e => e.categoryId.type === 'product').map((d) => (
                <Card
                  className="animal-list-card"
                  style={{
                    width: "100%;",
                    minWidth: "300px",
                    marginTop: "10px",
                  }}
                >
                  <Row>
                    <Col xs={24} md={8}>
                      <Space>
                        <img
                          src={d.categoryId.icon && d.categoryId.icon.split("/").pop() !== "null" ?
                            d.categoryId.icon : require("../../../../assets/images/avatar.png")}
                          style={{ borderRadius: 50, width: 40, height: 40 }}
                          alt="logo"
                        />

                        <Space direction="vertical">
                          <div className="primary-text fw-100">
                            {d.categoryId.name} Form
                        <img
                              src={
                                d.published &&
                                require(`../../../../assets/images/icons/completed.png`)
                              }
                              width={"17"}
                              style={{
                                borderRadius: 50,
                                marginLeft: 10,
                                marginTop: -3,
                              }}
                            />
                          </div>
                          <span className="secondary-text" style={{ fontSize: 12 }}>
                            {" "}
                        Registered date: {moment(d.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </Space>
                      </Space>
                    </Col>

                    <Col sm={24} lg={8}></Col>

                    <Col sm={24} lg={8}>
                      <div>
                        <Space>
                          <Button className="inner-primary-btn">
                            <Link to={{ pathname: "/admin/form/edit", state: { data: d, type: 'product' } }}>Edit Form</Link>
                          </Button>
                          <Button className="inner-primary-btn" onClick={() => d.published ? updatePublish(d._id, false) : updatePublish(d._id, true)}>{d.published ? 'Unpublish' : 'Publish'}</Button>
                          <Button className="inner-primary-btn" onClick={() => { removeClick(d.categoryId, d._id) }}>Remove</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )) : (
                  <div style={{ width: "100%", marginTop: 30 }}>
                    <Empty description={"No Product Form Found!"} />
                  </div>
                )}

            </div>
          ) : (
              <div style={{ width: "100%", marginTop: 30 }}>
                <Empty description={"No Data Found!"} />
              </div>
            )}

        </div>

        :
        <FormRequest />
      }

    </div>
  );
}

export default FormManagement;
