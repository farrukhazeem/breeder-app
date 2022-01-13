import React, { useEffect, useState } from "react";
import './Landing.scss'
import { Link } from 'react-router-dom'
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { Form, Typography, Row, Col, Space, Input as Input2, message } from 'antd';
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { getSubscriptions } from "../../redux/actions/subscription_action";

const { TextArea } = Input;

export default function Landing() {
    const [allsubscriptions, setallsubscriptions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getPackages();
    }, [])




    const getPackages = () => {
        dispatch(getSubscriptions()).then(response => {
            console.log(response);
            if (response.payload.status === 200) {
                setallsubscriptions(response.payload.data)
            }
            else {
                message.error(response.payload.message)
            }
        });
    }
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


            {/* 
The ultimate app, website platform and community for Animal Caregivers
Share your love for animals - Love Logged and Organized!

Our story
We are a team of animal lovers who have built the ultimate app and website platform designed to positively impact the life’s of our dear animals.

Animal lovers and caregivers have been forgotten for too long. The care of our animals was just too informal, unorganized, from the routine care documentations to their daily care.

Now, with the Logly app and community, you can easily set auto-reminders for the animals care, build your loved animals profiles and share tips and loving experiences with other animal lovers and caregivers within a community united by its love for animals!

Get started

Our features

Reports
Measure your animal caregiving activities to make sure you’re taking care of your loved animals in the best way as possible!

Auto-Reminders
Set auto-reminders so you never miss a caregiving task you’ve set yourself. Our beloved animals rely on your care!

Beautiful animal profiles (LoglyFiles)
Create beautifully designed profiles for your animals with unlimited videos, photos, shares on social media, and a lot more. You can quickly share the profiles with anyone!

CRM
A dedicated CRM for professional caregivers where you can easily transfer your animal’s ownership to another caregiver. It also takes care of your bookkeeping!


Our Mission
The only and biggest platform exclusive for caregivers and animal lovers
This is the place where all the animal lovers and caregivers will share their love and affection for their animals in one place with likeminded caregivers!

 */}



            <Space style={{ justifyContent: "space-between", width: "90%", marginTop: 15 }}>
                <div style={{ marginLeft: 130 }}>
                    <div className="frame"><img src={require(`../../../assets/images/Logo_Logly2.png`)} width={250} alt="mobile"></img></div>
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
                                <h1 style={{ fontSize: 40 }}>The ultimate app, website platform and community for Animal Caregivers</h1>
                                <p >Share your love for animals - Love Logged and Organized!</p>
                                <Link to={`/register`} className="btn1">Get Started</Link>
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
                                <p className="top-heading"><span className="dash1"></span>Our Story</p>
                                <p>We are a team of animal lovers who have built the ultimate app and website platform designed to positively impact the life’s of our dear animals.</p>
                                <p style={{ fontSize: 15 }}>Animal lovers and caregivers have been forgotten for too long. The care of our animals was just too informal, unorganized, from the routine care documentations to their daily care.</p>
                                <p style={{ fontSize: 15 }}>Now, with the Logly app and community, you can easily set auto-reminders for the animals care, build your loved animals profiles and share tips and loving experiences with other animal lovers and caregivers within a community united by its love for animals!</p>
                                {/* <a href="">View Subscription</a> */}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="frame"><img src={require(`../../../assets/images/LandingPage/dog1.png`)} alt="mobile"></img></div>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>


            <section className="home3" style={{ padding: '154px 0px' }}>
                <div className="container" style={{ marginLeft: "400px" }}>
                    <Row>
                        <Col span={6}>
                            <div className="b2">
                                {/* <p><span className="dash1"></span>Our Mission</p> */}
                                {/* <h2 >Following are our features.</h2> */}
                            </div>
                        </Col>


                        <Col span={18}>
                            <div className="b1">
                                <p className="top-heading"><span className="dash1"></span>Our Mission</p>
                                <p>The only and biggest platform exclusive for caregivers and animal lovers.</p>
                                <p style={{ fontSize: 15 }}>This is the place where all the animal lovers and caregivers will share their love and affection for their animals in one place with likeminded caregivers!</p>
                                {/* <a href="">View Subscription</a> */}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix" style={{ height: 10 }}></div>
            <section className="home8">
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <div className="b2">
                                <p className="top-heading"><span className="dash1"></span>Our Features</p>
                                {/* <h2 >Following are our features.</h2> */}
                            </div>
                        </Col>
                        <div className="clearfix"></div>

                        <Col span={24} >
                            {/* <Slider {...settings} ></Slider> */}
                            <Row style={{ justifyContent: 'center' }}>
                                <Space direction="horizontal">
                                    <div className="cardWhite">
                                        <img src={require(`../../../assets/images/LandingPage/home3_1.png`)} alt="image"></img>
                                        <h6>CRM</h6>
                                        <p>A dedicated CRM for professional caregivers where you can easily transfer your animal’s ownership to another caregiver. It also takes care of your bookkeeping!</p>
                                    </div>
                                    <div className="cardWhite" style={{ marginTop: 15 }}>
                                        <img src={require("../../../assets/images/LandingPage/home3_2.png")} alt="image"></img>
                                        <h6>Beautiful animal profiles (LoglyFiles)</h6>
                                        <p>Create beautifully designed profiles for your animals with unlimited videos, photos, shares on social media, and a lot more. You can quickly share the profiles with anyone!</p>
                                    </div>
                                    <div className="cardWhite">
                                        <img src={require("../../../assets/images/LandingPage/home3_3.png")} alt="image"></img>
                                        <h6>Reports</h6>
                                        <p>Measure your animal caregiving activities to make sure you’re taking care of your loved animals in the best way as possible!</p>
                                    </div>
                                    <div className="cardWhite" style={{ marginTop: 15 }}>
                                        <img src={require("../../../assets/images/LandingPage/home3_4.png")} alt="image"></img>
                                        <h6>Auto-Reminders</h6>
                                        <p>Set auto-reminders so you never miss a caregiving task you’ve set yourself. Our beloved animals rely on your care!</p>
                                    </div>
                                </Space>
                                {/* <Space direction="vertical" style={{ marginLeft: 15 }}>
                                   
                                </Space> */}
                                {/* <Space direction="vertical" style={{ marginLeft: 15 }}>
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
                                </Space> */}

                            </Row>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="clearfix"></div>




            <section class="home4">
                <div class="container-fluid">

                    <p className="top-heading" style={{ width: 240 }}><span className="dash1"></span>Our Packages</p>
                    {/* <h2>Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam nonumy</h2> */}

                    <Row gutter={30} style={{ marginTop: 10, justifyContent: 'center' }}>
                        {allsubscriptions.map((e) => (
                            <Col span={6}>
                                <div className="slick2" style={{ marginLeft: 4, marginRight: 4 }}>
                                    <div>
                                        <a href="" className="b1">
                                            <h5>{e.name}</h5>
                                            <h2>${e.monthlyPrice} <span>/month</span></h2>
                                            <p>{e.description}</p>
                                            <ul>
                                                {(e.allowedAnimal > 0) && <li>Allowed Animals {e.allowedAnimal}</li>}
                                                {(e.allowedEmp > 0) && <li>Allowed Team Members {e.allowedEmp}</li>}
                                                {(e.allowedProduct > 0) && <li>Allowed Products {e.allowedProduct}</li>}
                                            </ul>
                                        </a>
                                        {/* <div className="choose" style={{ marginLeft: "20%" }}>Choose</div> */}
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

                            <p className="top-heading"><span class="dash1"></span>Our Story</p>
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
                    <p className="top-heading" style={{ width: 225 }}><span className="dash1" ></span>Get in Touch</p>
                    <h4>Have an inquiry or feedback for us?</h4>
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
                    <Row style={{ marginTop: 20 }}>
                        <Col span={24}>
                            <Form.Item>
                                <label>Message: *</label>
                                <TextArea
                                    row={6} id="textarea"
                                    style={{ width: "100%", fontFamily: "Arial", }}
                                    placeholder="Enter Message"
                                    className=" customInput"
                                />
                            </Form.Item>
                        </Col>

                    </Row>


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
