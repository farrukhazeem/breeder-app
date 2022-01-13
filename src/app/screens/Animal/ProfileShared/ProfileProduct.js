import React, { useEffect, useState } from "react";
import { Layout, Space, Row, Col, Typography } from "antd";
import { useDispatch } from "react-redux";
import Button from "../../../components/button/button";
import moment from 'moment'
import { Link } from "react-router-dom";
import {
    EnableLoader,
    DisableLoader,
} from "../../../redux/actions/loader_action";
import Cart from "../../../components/card/card";
import { getProductByIdShare } from "../../../redux/actions/product_action";
import fieldValidation from "../../../validations/fieldValidation";

function ProfileProduct(props) {
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        refreshData(window.location.pathname.split("/").pop());
    }, []);

    const refreshData = (id) => {
        dispatch(EnableLoader());
        dispatch(getProductByIdShare(id)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                console.log(response.payload.data, "<--")
                setProduct(response.payload.data);
            }
        });
    };

    return (
        <Layout theme="light" style={{ minHeight: '100vh', background: "white" }}>
            <div className={"publicProfileHeader"}>
                <div style={{ float: "left" }}>
                    <img
                        src={require("../../../../assets/images/Logo_Logly.png")}
                        width={190}
                    />
                </div>
                <div style={{ float: "right" }} className='dv-link'>
                    <Space>
                        {localStorage.getItem("w_auth") ? (
                            <Link to={'/dashboard'} className={"right-link"}>Dashboard</Link>
                        ) : (
                                <Link to={'/login'} className={"right-link"}>Login</Link>
                            )}
                    </Space>
                </div>
            </div>
            <div style={{ marginTop: 30 }}></div>
            <h2 className="heading" style={{ fontSize: 20, marginLeft: 15 }}>Product Detail</h2>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <Row gutter={40}>

                    <Col xs={24} md={12}>
                        <Cart
                            style={{
                                width: "90%;",
                                height: "auto",
                                margin: "10px",
                                maxWidth: "450px",
                                minWidth: "300px",
                            }}
                            className=""
                        >
                            <div>
                                {/* <div class="inner"><h2 className="primary-text"> <b className="primary-text-heading">Animal Id</b></h2>
                              <div class="second"><b className="secondary-text">Pablo</b></div>
                              </div> */}
                                <Space>


                                    <Space direction="vertical">
                                        <h2 className="primary-text " style={{ fontSize: 17, fontWeight: "bold" }}>
                                            {product && product.data.name}
                                        </h2>
                                        {/* <b className="secondary-text">Pablo</b> */}
                                    </Space>

                                </Space>
                            </div>
                            {product && Object.entries(product.data).map(
                                ([key, value], index) =>
                                    key !== "file" &&
                                    key !== "products" &&
                                    key !== "breed" &&
                                    key !== "traits" && (
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col xs={12} className="primary-text fs-120">
                                                {fieldValidation.titleCase(key)}
                                            </Col>
                                            <Col xs={12} className="primary-text fs-120">
                                                <Typography.Text >{(key.includes("date") || key == "DOB" || key == "dob" || (isNaN(parseFloat(value)) && moment(value).isValid())) ? moment(value).format("DD MMM, YYYY") : key === "time" ? moment(value).format("hh mm, s") : value}</Typography.Text>
                                            </Col>
                                        </Row>
                                    )
                            )}
                        </Cart>
                    </Col>


                    <Col xs={24} md={12}>
                        {product?.image && (
                            <a href={product.image} target="_blank">
                                <img
                                    className="textAlign-sm-box"
                                    style={{ width: 400, height: 300 }}
                                    src={product.image}
                                    alt="Logo"
                                />
                            </a>

                        )}
                        <Row gutter={10}>
                            {product?.gallery &&
                                product.gallery.map((image) => (
                                    <Col xs={24} md={12} style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                                        <br />
                                        <div >
                                            <a href={image.filename} target="_blank">
                                                <img
                                                    className="textAlign-sm-box"
                                                    style={{ width: 200, height: 180 }}
                                                    src={image.filename}
                                                    alt="Logo"
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </Col>


                </Row>
                {/* <ImageDragger {...{ multiple: true, data: { action: `${baseUrl}/product/gallery/upload`, name: 'file', body: { id: product._id } }, visible: visibleUploadingModal, onSuccess: onGalleryUploadSuccess, close: () => setvisibleUploadingModal(false) }} /> */}

            </div>
        </Layout>
    );
}

export default ProfileProduct;
