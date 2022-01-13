import { Col, Divider, Empty, message, Modal, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import { deleteCategory, getCategoriesByType } from '../../../redux/actions/category_action';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function CategoryManagement() {

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    dispatch(EnableLoader());
    dispatch(getCategoriesByType('animalproduct')).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setCategories(response.payload.data);
      } else {
        setCategories(null);
      }
    });
  }


  const removeCategory = (id) => {
    const onOkCalled = () => {
      dispatch(EnableLoader());
      dispatch(deleteCategory(id)).then(response => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          getCategories();
        } else {
          message.error(response.payload.message);
        }
      });
    }


    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to remove category?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });
  }

  return (
    <div style={{}}>
      <Row>
        <Col xs={24} md={8} className="">
          <h2 className="primary-text primary-text-heading">Category Management</h2>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }} className=""></Col>

        <Col xs={24} md={8}>
          <div className="textAlign-md-right textAlign-md-box-layer">
            <Button className="secondary-button">
              <Link to={"/admin/category/main"}>Add a new category</Link>
            </Button>
          </div>
        </Col>
      </Row>
      <br />






      {categories ? (
        <Row gutter={10}>
          <Col span={12}>
            <Card title="Animal Categories">
              {categories.filter(e => e.type === 'animal')[0] ? categories.filter(e => e.type === 'animal').map((d) => (
                <Card
                  className="animal-list-card"
                  style={{
                    width: "100%;",
                    minWidth: "300px",
                    marginTop: "10px",
                  }}
                >
                  <Row>
                    <Col xs={24} md={12}>
                      <Space>
                        <img
                          src={d.icon && d.icon.split("/").pop() !== "null" ? d.icon : require("../../../../assets/images/avatar.png")}
                          width={"40"}
                          style={{ borderRadius: 50, width: 50, height: 50 }}
                          alt="logo"
                        />
                        < Space direction="vertical">
                          <div className="primary-text fw-100">
                            {d.name}
                          </div>
                          <span className="secondary-text" style={{ fontSize: 12 }}>
                            {" "}
                                 Registered date: {moment(d.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </Space>
                      </Space>
                    </Col>



                    <Col sm={24} lg={12}>
                      <div>
                        <Space>
                          <Button className="inner-primary-btn">
                            <Link to={{ pathname: "/admin/category/edit", state: { data: d, type: 'animal' } }}>Edit  </Link>
                          </Button>
                          {/* <Button className="inner-primary-btn" onClick={() => d.published ? updatePublish(d._id, false): updatePublish(d._id, true)}>{d.published ? 'Unpublish': 'Publish'}</Button> */}
                          <Button className="inner-primary-btn" onClick={() => removeCategory(d._id)}>Remove</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )) : (
                  <div style={{ width: "100%", marginTop: 30 }}>
                    <Empty description={"No Animal Category Found!"} />
                  </div>
                )}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Product Categories">
              {categories.filter(e => e.type === 'product')[0] ? categories.filter(e => e.type === 'product').map((d) => (
                <Card
                  className="animal-list-card"
                  style={{
                    width: "100%;",
                    minWidth: "300px",
                    marginTop: "10px",
                  }}
                >
                  <Row>
                    <Col xs={24} md={12}>
                      <Space>
                        <img
                          src={d.icon && d.icon.split("/").pop() !== "null" ? d.icon : require("../../../../assets/images/avatar.png")}
                          width={"40"}
                          style={{ borderRadius: 50, width: 50, height: 50 }}
                          alt="logo"
                        />

                        <Space direction="vertical">
                          <div className="primary-text fw-100">
                            {d.name}
                          </div>
                          <span className="secondary-text" style={{ fontSize: 12 }}>
                            {" "}
                                 Registered date: {moment(d.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </Space>
                      </Space>
                    </Col>



                    <Col sm={24} lg={12}>
                      <div>
                        <Space>
                          <Button className="inner-primary-btn">
                            <Link to={{ pathname: "/admin/category/edit", state: { data: d, type: 'product' } }}>Edit</Link>
                          </Button>
                          {/* <Button className="inner-primary-btn" onClick={() => d.published ? updatePublish(d._id, false): updatePublish(d._id, true)}>{d.published ? 'Unpublish': 'Publish'}</Button> */}
                          <Button className="inner-primary-btn" onClick={() => removeCategory(d._id)}>Remove</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )) : (
                  <div style={{ width: "100%", marginTop: 30 }}>
                    <Empty description={"No Product Category Found!"} />
                  </div>
                )}
            </Card>
          </Col>
        </Row>
      ) : (
          <div style={{ width: "100%", marginTop: 30 }}>
            <Empty description={"No Data Found!"} />
          </div>
        )
      }
    </div >

  )
}
