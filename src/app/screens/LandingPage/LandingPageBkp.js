import React, { useEffect, useState } from "react";
import './Landing.scss'
import { Link } from 'react-router-dom'
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { Form, Typography, Row, Col, Space, Input as Input2 } from 'antd';
import Slider from "react-slick";

const { TextArea } = Input;

export default function Landing() {

    useEffect(() => {

    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="landing">

            {/* <Space style={{
                position: "absolute", margin: 50, justifyContent: "space-between",
                width: "85%"
            }}>
                <img style={{ marginLeft: 120 }} src={require(`../../../assets/images/LandingPage/logo.png`)} alt="mobile"></img>

                <Button className="secondary-button">
                    Sign In</Button>

            </Space> */}


            <Space style={{ justifyContent: "space-between", width: "90%", marginTop: 15 }}>
                <div style={{ marginLeft: 130 }}>
                    <div className="frame"><img src={require(`../../../assets/images/LandingPage//logo.png`)} alt="mobile"></img></div>
                </div>
                <div >
                    <Link to={`/login`}
                        className="btn1">Sign In <i className="fa fa-key"></i> </Link>
                </div>

            </Space>

            <div className="clearfix"></div>

            <section className="home1">
                <div className="frame"><img src={require(`../../../assets/images/LandingPage/mobile1.png`)} alt="mobile"></img></div>
                <div className="container">
                    <Row>
                        <Col span={16}></Col>
                        <Col span={8}>
                            <div className="b1">
                                <h1 style={{ fontSize: 40 }}>Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h1>
                                <p >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore.</p>
                                <Link to={`/register`} className="btn1">Get Started ></Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>




            <section className="home2">
                <div className="container" style={{ marginLeft: "auto" }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <div className="b1">
                                <p><span className="dash1"></span>Our Story</p>
                                <h2>Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h2>
                                <p style={{ fontSize: 15 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut laboret dolore magna aliquyam erat, sed diam voluptua.</p>
                                <p style={{ fontSize: 15 }}>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
							kasd gubergren, no</p>
                                <a href="">View Subscription ></a>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="frame"><img src={require(`../../../assets/images/LandingPage/dog1.png`)} alt="mobile"></img></div>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>




            <section className="home3">
                <div className="container" style={{ marginLeft: "400px" }}>
                    <Row>
                        <Col span={24} offset={8}>
                            <div className="b2">
                                <p><span className="dash1"></span>Our Features</p>
                                <h2 >Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h2>
                            </div>
                        </Col>
                        <div className="clearfix"></div>

                        <Col span={24} offset={8}>
                            {/* <Slider {...settings} ></Slider> */}
                            <Row>
                                <Space direction="vertical">
                                    <div className="cardWhite">
                                        <img src={require(`../../../assets/images/LandingPage/home3_1.png`)} alt="image"></img>
                                        <h4>CRM</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                    <div className="cardWhite" style={{ marginTop: 15 }}>
                                        <img src={require("../../../assets/images/LandingPage/home3_2.png")} alt="image"></img>
                                        <h4>Employees</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                </Space>
                                <Space direction="vertical" style={{ marginLeft: 15 }}>
                                    <div className="cardWhite">
                                        <img src={require("../../../assets/images/LandingPage/home3_3.png")} alt="image"></img>
                                        <h4>Reports</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                    <div className="cardWhite" style={{ marginTop: 15 }}>
                                        <img src={require("../../../assets/images/LandingPage/home3_4.png")} alt="image"></img>
                                        <h4>Inventory</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                </Space>
                                <Space direction="vertical" style={{ marginLeft: 15 }}>
                                    <div className="cardWhite">
                                        <img src={require("../../../assets/images/LandingPage/home3_5.png")} alt="image"></img>
                                        <h4>Form</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                    <div className="cardWhite" style={{ marginTop: 15 }}>
                                        <img src={require("../../../assets/images/LandingPage/home3_6.png")} alt="image"></img>
                                        <h4>Animals</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
									tempor invidunt ut laboret dolore magna.</p>
                                    </div>
                                </Space>

                            </Row>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>




            <section class="home4">
                <div class="container-fluid">

                    <p><span className="dash1"></span>Our Story</p>
                    <h2>Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h2>

                    <Row gutter={30} style={{ marginTop: 10 }}>
                        {[1, 2, 3, 4].map(() => (
                            <Col span={6}>
                                <div className="slick2" style={{ marginLeft: 4, marginRight: 4 }}>
                                    <div>
                                        <a href="" className="b1">
                                            <h5>Intro</h5>
                                            <h2>$29 <span>/month</span></h2>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitrsed diam. nonumy.eirmod tempor
									invidunt.</p>
                                            <ul>
                                                <li>Curabitur ullamcorper ultricies</li>
                                                <li>Curabitur ullamcorper ultricies</li>
                                                <li>Curabitur ullamcorper ultricies</li>
                                                <li>Curabitur ullamcorper ultricies</li>
                                                <li>Curabitur ullamcorper ultricies</li>
                                            </ul>
                                        </a>
                                        <div className="choose" style={{ marginLeft: "20%" }}>Choose</div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </div>
            </section>
            <div class="clearfix"></div>



            <section class="home5">
                <div class="container">
                    <Row>
                        <Col span={12}>
                            <div class="frame"><img src={require("../../../assets/images/LandingPage/mobile2.png")} alt="mobile"></img></div>
                        </Col>
                        <Col span={12}>

                            <p><span class="dash1"></span>Our Story</p>
                            <h2>Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
						ut laboret dolore magna aliquyam erat, sed diam voluptua.</p>
                            <ul>
                                <li><a href="" class="btn1"><img src={require("../../../assets/images/LandingPage/google_play.png")}></img><span>Get it on</span>
                                    <p>Google Play</p>
                                </a></li>
                                <li style={{ marginLeft: 10 }}><a href="" class="btn1"><img src={require("../../../assets/images/LandingPage/app_store.png")}></img><span>Get it on</span>
                                    <p>App Store</p>
                                </a></li>
                            </ul>

                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>




            <footer>


                <div className="b1">
                    <p><span className="dash1"></span>Get in Touch</p>
                    <h2>Have an inquiry or feedback for us?</h2>
                </div>

                <div style={{
                    display: "block", marginLeft: "auto",
                    marginRight: "auto", width: "50%"
                }}>
                    <Row style={{ marginTop: 20 }} gutter={30}>
                        <Col span={12} >
                            <Form.Item >
                                <label>First Name: *</label>
                                <Input placeholder="Enter first name"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item >
                                <label>Last Name: *</label>
                                <Input placeholder="Enter last name"></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 20 }} gutter={30}>
                        <Col span={12}>
                            <Form.Item >
                                <label>Email: *</label>
                                <Input placeholder="Enter email"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item>
                                <label>Phone: *</label>
                                <Input placeholder="Enter phone"></Input>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item>
                        <label>Message: *</label>
                        <TextArea
                            row={6} id="textarea"
                            style={{ width: "100%", fontFamily: "Arial", }}
                            placeholder="Enter Message"
                            className="textAlign-sm-marginLeft customInput"
                        />
                    </Form.Item>

                    <div style={{ marginTop: 20, marginLeft: "42%" }}
                    >
                        <input type="submit" class="btn1" vlaue="Submit"></input>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div style={{ marginTop: 40 }}>
                    <p>&copy; Logly. All Rights Reserved. <a href="">Terms of Use</a> <a href="">Privacy Policy</a></p>
                </div>

            </footer>




        </div >
    )
}
