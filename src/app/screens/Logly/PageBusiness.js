import React, { useEffect, useState, useRef } from "react";
import "../LandingPage/Landing.scss";
import "../LandingPage/bootstrap.min.scss";
// import './slick.min.js';
import { Link } from "react-router-dom";
import {
    message, Form, Space, Row, Col, Radio, List, Rate, Typography, Divider,
} from "antd";
import Card from "../../components/card/card";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getSubscriptions } from "../../redux/actions/subscription_action";
import { createFeedback } from "../../redux/actions/feedback_action";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import Input from "../../components/input/input";
import InputPhoneNumber from "react-phone-number-input/input";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PageBusiness() {
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [allsubscriptions, setallsubscriptions] = useState([]);
    const [tabIndex, setTabIndex] = useState("monthly");
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        getPackages();
    }, []);

    const getPackages = () => {
        dispatch(getSubscriptions()).then((response) => {
            console.log(response);
            if (response.payload.status === 200) {
                setallsubscriptions(response.payload.data);
            } else {
                message.error(response.payload.message);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        dispatch(EnableLoader());
        dispatch(getSubscriptions()).then((response) => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setSubscriptionData(response.payload.data);
            }
        });
    }


    const onFinish = (values) => {
        // console.log(values, "<--")
        dispatch(EnableLoader())
        dispatch(createFeedback(values)).then((response) => {
            dispatch(DisableLoader())
            if (response.payload.status === 200) {
                form.resetFields()
                message.success(response.payload.message);
            }
            else {
                message.error(response.payload.message);
            }
        })
    }

    const limitPhoneNumber = (element) => {
        console.log(element);
        if (
            form.getFieldValue("phone") &&
            form.getFieldValue("phone").length > 11
        ) {
            element.preventDefault();
        }
    };

    const phoneNumberChange = (value) => {
        form.setFieldsValue({ phone: value });
    };

    const petLoverMission = [{ heading: "Our Mission", detail: "To build a community of passionate pet lovers, that care about giving great love to animals entrusted in their care." },
    { heading: "Our Love", detail: "We Love animals and our goal is to create a world where no animal ever feels mistreated or abused by humans entrusted to care for them." },
    { heading: "Our Passion", detail: "For everyone that has felt the love that pets bring to our lives, we built a platform that helps give that love back to them." },
    { heading: "Our Drive", detail: "To build a platform that's easy to use that brings value to pets, pet owners and animal care businesses for the betterment of all pets." },]

    const businessMission = [{ heading: "Our Mission", detail: "To create premium business tools, that large companies utilize at a price that small to medium sized businesses can afford." },
    { heading: "Our Love", detail: "Business organized, clients, invoices, marketing are all taken care of with Logly’s Professional Premium Tools. So now you have more time to love your pets again." },
    { heading: "Our Passion", detail: "Your passion for animals drove you to start your business, don’t let the frustrations of business stop you." },
    { heading: "Our Drive", detail: "Our Premium Business Tools clears lots of roadblocks to help grow, scale and make your business thrive." },]

    const notProfitMission = [{ heading: "Our Mission", detail: "For far too long your tireless efforts have not been seen nor recognized by the masses, We want to change that." },
    { heading: "Our Love", detail: "Love is at the heart of Non-Profits efforts, we want to support all you do by building awareness, raising donations and connected business tools." },
    { heading: "Our Passion", detail: "Drives Non-Profits and we want to help keep that fire going by removing some business frustrations with our Premium Business Tools and services." },
    { heading: "Our Drive", detail: "Partnering with Logly can help propel your Non-Profits to new heights, freeing time, better team communication and helping pets find new homes quicker." },]

    const MISSION = (Mission) => (
        <>
            {Mission.map(e => (
                <Col xs={24} sm={12} style={{ textAlign: "center", marginTop: 15 }}>
                    <Card style={{ width: 80, height: 80, borderRadius: 10, background: "var(--secondary-color)", marginLeft: "auto", marginRight: "auto", }}>
                        <img
                            src={require(`../../../assets/business/dummy.png`)}
                            alt="mobile" className="centerIMage"
                        />
                    </Card>

                    <h3>{e.heading}</h3>
                    <p className="greyTextSub">
                        {e.detail}
                    </p>
                </Col>
            ))
            }
        </>
    )


    const EligibilityCriteria = [{ heading: "Donations", detail: "Logly members will be able to search and location local and national Non Profits and donate directly via the Logly Platform, to help financially support your passion efforts." },
    { heading: "Fostering", detail: "Non Profits can never have enough caring local Animal Lovers that can foster a  pet, Logly members will be able to sign up to be a foster parent for a local Non Profit directly via the Logly Platform." },
    { heading: "Volunteering", detail: "We’re here to help you get tasks done, with the ability for Logly members to search for a Volunteer their time to a Non Profit.  Together we can all grow and help the lives of animals thrive." }]


    const SubscriptionPackageInfo = (data) => {

        return (
            <Card className="" key={data._id}>

                <div style={{ width: 10, height: 10 }}></div>
                <div style={{ textAlign: "center" }}>
                    <Space direction="vertical">
                        <Title level={4} >{data.name}</Title>
                        <div style={{ color: "var(--primary-color)", fontWeight: "bold", fontSize: 17 }}>$ {(tabIndex === 'monthly') ? data.monthlyPrice : (tabIndex === 'yearly') ? data.yearlyPrice : data.lifetimePrice}/ {(tabIndex === 'monthly') ? "month" : (tabIndex === 'yearly') ? "year" : "lifetime"}</div>
                    </Space>
                </div>

                <div style={{ marginTop: 20 }}>
                    <div style={{ lineHeight: "3em" }}>
                        <Row>
                            <Col xs={1}>
                                <span className="dotcircle" ></span>
                            </Col>
                            <Col xs={23}>
                                <span className="greyTextSub" >Allowed Animals {data.allowedAnimal}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <span className="dotcircle" ></span>
                            </Col>
                            <Col xs={23}>
                                <span className="greyTextSub" >Allowed Products {data.allowedProduct}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <span className="dotcircle" ></span>
                            </Col>
                            <Col xs={23}>
                                <span className="greyTextSub" > Allowed Employees {data.allowedEmp} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <span className="dotcircle" ></span>
                            </Col>
                            <Col xs={23}>
                                <span className="greyTextSub" > {data.description}{" "} </span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>
        );
    };

    const [playing, setplaying] = useState(false)
    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        setplaying(true)
        vidRef.current.play();
    }
    const handlePauseVideo = () => {
        setplaying(false)
        vidRef.current.pause();
    }


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <RightOutlined />,
        pprevArrow: <LeftOutlined />,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className="landing custom-bootstrap-landing">
            <section className="home0">
                <Row gutter={20} style={{ alignItems: "center" }}>
                    <Col sm={24} md={10} >
                        <Link to={"/"}>
                            <img src={require(`../../../assets/images/Logo_Logly_colour.png`)}
                                alt="mobile" style={{ width: 200, marginLeft: 50 }} className=""
                            />
                        </Link>
                        <div className="containerImg">
                            <img src={require(`../../../assets/business/fluid.png`)}
                                alt="mobile" style={{ height: 380, width: 520 }} className="containerImgSub"
                            />
                            <div className="centered">
                                <div style={{ marginTop: 15 }}></div>
                                <h2 style={{ color: "black" }}>
                                    <span style={{ color: "var(--primary-color)" }} >LOGLY</span> for
                                    {window.location.pathname === "/loglyBusiness" ? " Business" : window.location.pathname === "/loglyPetlover" ? " Pet Lovers/Owners" : " Non-Profit"}
                                </h2>
                                <div style={{ marginTop: 15 }}></div>
                                {window.location.pathname === "/loglyPetlover" ?
                                    <span className="greyTextSub" >Free for Pet Owners, manage up to 5 Pet Profiles, Document & Share Love for pets. Join our Circle of Love</span>
                                    : window.location.pathname === "/loglyBusiness" ?
                                        <span className="greyTextSub" >We provide Premium Business tools needed to run and scale your business, while saving time, money and building incredible trust with your clients</span>
                                        :
                                        <span className="greyTextSub" >At Logly we support the incredible passion efforts from Non-Profits and for that we provide our Premium Business Tools FREE to Non-Profits with 501(c)</span>
                                }
                                <div style={{ marginTop: 15 }}></div>
                                <div className="center-sm" style={{ marginTop: 5 }}>
                                    <Link to={`/register`} className="btn1">Sign up now</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} md={14} style={{ width: "100%" }}>
                        <div style={{ paddingBottom: "50%", position: "relative" }}>
                            <iframe src=
                                {window.location.pathname === "/loglyPetlover" ?
                                    "https://logly-technology.dotcompal.com/video/embed/8u5cokvabj" :
                                    window.location.pathname === "/loglyBusiness" ?
                                        "https://logly-technology.dotcompal.com/video/embed/isedixtsdt"
                                        :
                                        "https://logly-technology.dotcompal.com/video/embed/ht52i8t778"
                                }
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
                    </Col>
                </Row>
            </section>
            <div className="clearfix"></div>


            <section className="home2" style={{ marginTop: 20 }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-md-5">
                            <div style={{ paddingTop: 30 }}>
                                <p >
                                    <span style={{ color: "var(--primary-color)" }} className="dashHeading">Our Story</span>
                                </p>
                                <h3>
                                    {window.location.pathname === "/loglyPetlover" ?
                                        "Create your Free Logly account today and invite everyone you know with pets to do the same"
                                        : window.location.pathname === "/loglyBusiness" ?
                                            "Turn your Passion into a Thriving Business"
                                            :
                                            "At Logly, we recognize the incredible dedication it takes to run and manage a Non Profit Animal Care Organization."
                                    }
                                </h3>

                                <p style={{ paddingTop: 20 }} className="greyTextSub">
                                    {window.location.pathname === "/loglyPetlover" ?
                                        "Logly ”Circle of Love The best all in one app for pet owners, featuring unlimited pictures and videos for your pets. Record routine care, health records, lost pet amber alert and be connected with a community of vetted trustworthy animal care businesses."
                                        : window.location.pathname === "/loglyBusiness" ?
                                            "Most Animal Care Business owners started because of their love of animals, but as business grows the challenge of running their business gets tougher and tougher."
                                            :
                                            "We want to help the amazing work done by shelters, rescues and others that care for and rehabilitate animals that have been let down by humans entrusted in their care."
                                    }
                                </p>
                                <p style={{ paddingTop: 20 }} className="greyTextSub">
                                    {window.location.pathname === "/loglyPetlover" ?
                                        "Creating a Logly account and building out your pet’s profiles, you will be joining forces with other pet owners and lovers and Collectively we will make a huge difference for millions of animals and pets that depend on us."
                                        : window.location.pathname === "/loglyBusiness" ?
                                            "With Logly’s Premium Business Tools, we save your sanity by providing tools needed to organize, track, build and sell, all while giving clients information so they quickly view your business in a positive light and build trust."
                                            :
                                            "Our Logly Love Foundation mission is to make your efforts and the lives of the animals you care for better. by increasing awareness of your Organization’s passion efforts."
                                    }
                                </p>
                                <p style={{ paddingTop: 20 }} className="greyTextSub">
                                    {window.location.pathname === "/loglyPetlover" ?
                                        "Join Logly and take the pledge to give great Love & Care"
                                        : window.location.pathname === "/loglyBusiness" ?
                                            ""
                                            :
                                            "Your 501(c)(3) Non Profit will have access to Logly’s platform and app, which  allows you to manage, run and scale your organization at absolutely No cost."
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                            <div className="frame">
                                <Row gutter={20}>
                                    {MISSION(window.location.pathname === "/loglyPetlover" ? petLoverMission :
                                        window.location.pathname === "/loglyPetlover" ? businessMission :
                                            notProfitMission
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ marginTop: 30 }}></div>
            <div className="clearfix"></div>

            <section className="home33" >

                <div className="row">
                    <div className="col-xs-12" style={{ textAlign: "center" }}>
                        <span style={{ color: "var(--primary-color)", fontSize: 23 }} className="dashHeading">Our Features</span>
                    </div>
                    <h3 className="col-xs-8 col-xs-offset-2" style={{ textAlign: "center" }}>
                        We are a team of animal lovers who have built the ultimate app
                        and website platform.
                        </h3>
                    <div className="clearfix"></div>
                    <div style={{ marginTop: 20 }}></div>
                    <div className="col-xs-8 col-xs-offset-2" style={{ background: "white", borderRadius: 10, minHeight: 240 }}>
                        <Row gutter={20} >
                            <Col xs={24} md={12} lg={8} style={{ marginTop: 20 }}>
                                <center ><img
                                    src={require("../../../assets//business/activityies.png")}
                                    alt="image" style={{ width: 30, height: 30 }}
                                />
                                </center>
                                <h4 style={{ textAlign: "center" }}>5 Free Pet Profiles</h4>
                                <Space>
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Automatic Unique Animal ID# for each animal</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Sharable Pet Profiles for all your animals</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Unlimited Pics and Videos of each animal</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Ability to Transfer Pet Profile to new owner</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Ability to make a Pet Profile Public or Private</span>
                                </Space>

                            </Col>

                            <Col xs={24} md={12} lg={8} style={{ marginTop: 20 }}>
                                <center><img
                                    src={require("../../../assets/business/free.png")}
                                    alt="image" style={{ width: 30, height: 30 }}
                                />
                                </center>
                                <h4 style={{ textAlign: "center" }}>Activity Management</h4>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Individual Animal Activity Management</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Group Animal Activity Management</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Keep track of all animal Care needs</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Cleaning, Grooming etc.</span>
                                </Space>
                                <div></div>
                                {/* <Space>
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub"></span>
                                </Space> */}
                            </Col>

                            <Col xs={24} md={12} lg={8} style={{ marginTop: 20 }}>
                                <center><img
                                    src={require("../../../assets/business/notifications.png")}
                                    alt="image" style={{ width: 30, height: 30 }}
                                />
                                </center>
                                {window.location.pathname === "/loglyPetlover" ?
                                    "3 Family Members Communication & Notification" :
                                    "5 Family Members Communication & Notification"
                                }
                                <h4 style={{ textAlign: "center" }}>2 Family Members Communication & Notification</h4>
                                <Space>
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Family/Team Member App for assigned family members</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Ability to send messages to family members</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Ability to send messages to Individual family members</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Offline Mobile App Sync</span>
                                </Space>
                                <div></div>
                                <Space className="mgTop5">
                                    <span className="dotcircle"></span>
                                    <span className="greyTextSub">Family/Team Reminders</span>
                                </Space>
                            </Col>
                        </Row>
                        <div style={{ marginTop: 10 }}></div>
                    </div>
                </div>

            </section>


            <div className="clearfix"></div>
            {window.location.pathname === "/loglyBusiness" &&
                <section className="home4" style={{ textAlign: "center" }}>
                    <div className="container-fluid">
                        <div>
                            <span style={{ color: "var(--primary-color)", fontSize: 23 }} className="dashHeading">Pricing</span>
                        </div>
                        <h3 >
                            Amazing Price to fit your needs
                        </h3>
                        <div className="clearfix"></div>
                        <Row>
                            <Col span={24} >
                                <div className="setting-radio-btn-switch-business" style={{ marginTop: 10 }}>
                                    <Radio.Group
                                        value={tabIndex}
                                        onChange={(index) => {
                                            setTabIndex(index.target.value);
                                        }}
                                        style={{ marginBottom: 16 }}
                                    >
                                        <Radio.Button value={"monthly"}>Monthly</Radio.Button>
                                        <Radio.Button value={"yearly"}>Yearly</Radio.Button>
                                        <Radio.Button value={"lifetime"}>Lifetime</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </Col>
                        </Row>
                        <div style={{ marginTop: 20 }}></div>

                        <List style={{ marginTop: 10 }}
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 3,
                                xl: 3,
                                xxl: 3,
                            }}
                            className="subscription-list-main"
                            dataSource={
                                tabIndex === "monthly" ? subscriptionData.filter(e => e.monthlyPrice || e.monthlyPrice === 0) :
                                    tabIndex === "yearly" ? subscriptionData.filter(e => e.yearlyPrice || e.yearlyPrice === 0) :
                                        subscriptionData.filter(e => e.lifetimePrice || e.lifetimePrice === 0)
                                // subscriptionData
                            }
                            renderItem={(item) => (
                                <List.Item>{SubscriptionPackageInfo(item)}</List.Item>
                            )}
                        />

                    </div>
                </section>
            }
            <div className="clearfix"></div>

            {window.location.pathname === "/loglyNonprofit" &&
                <Row style={{ marginBottom: 25 }}>
                    <Col xs={24} md={11} style={{
                        background: "blue", display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        <div style={{ paddingLeft: 80, paddingRight: 80, textAlign: "center" }}>
                            <p>
                                <span style={{ color: "white", fontSize: 45 }} className="dashHeading">Eligibility Criteria</span>
                            </p>
                            <h4 style={{ color: "white", marginTop: 20 }}>
                                Your 501(c)(3) Non Profit Animal Care Organization will have access to Logly’s platform and app, which  allows you to manage, run and scale your organization at absolutely No cost. We will activate your free membership after you upload or email a copy of your 501(c)(3) documents to us at Hello@logly.us
                                </h4>

                        </div>

                    </Col>
                    <Col xs={0} md={1}></Col>
                    <Col xs={24} md={12}>
                        <Row gutter={20} style={{ marginTop: 50, marginBottom: 50 }}>
                            {EligibilityCriteria.map(e => (
                                <Col xs={24} sm={12} style={{ textAlign: "center", marginTop: 15 }}>
                                    <Card style={{ width: 80, height: 80, borderRadius: 10, background: "var(--secondary-color)", marginLeft: "auto", marginRight: "auto", }}>
                                        <img
                                            src={require(`../../../assets/business/dummy.png`)}
                                            alt="mobile" className="centerIMage"
                                        />
                                    </Card>

                                    <h3>{e.heading}</h3>
                                    <p className="greyTextSub">
                                        {e.detail}
                                    </p>
                                </Col>
                            ))
                            }
                        </Row></Col>
                </Row>
            }
            <section className="home4" style={{ textAlign: "center" }}>
                <div className="container-fluid">
                    <div>
                        <span style={{ color: "var(--primary-color)", fontSize: 23 }} className="dashHeading">Testimonals</span>
                    </div>
                    <h3 >
                        What clients say about us
                    </h3>

                    <Slider {...settings}>
                        {["1", "2", "3", "4"].map(e => (
                            <>
                                <Col style={{ marginRight: 30 }}>
                                    <Space className="testimonals1" style={{ margin: "auto", width: "100%" }}>
                                        <Card style={{
                                            display: "flex", width: 180, paddingLeft: 5,
                                            height: "150px", textAlign: "initial",
                                            alignItems: "center", margin: "auto", paddingRight: 30
                                        }}>
                                            <h4>Tim Watts, Washington</h4>
                                            <span className="greyTextSub" style={{ paddingRight: 30 }}>Sunshine Parrots</span>
                                            <Divider></Divider>
                                            <Rate />


                                            <div className="imgAbsRight">
                                                <img src={require(`../../../assets/images/avatar.png`)}
                                                    alt="mobile" style={{ height: 90, width: 90, borderRadius: 10 }}
                                                />
                                            </div>
                                        </Card>
                                        <div style={{ marginLeft: 50 }}>
                                            <span className="greyTextSub">I love, love my Logly app, the ability to create and share my pet’s profile is awesome. I can have pics of him from a puppy until now. I love having all his health records right with me at all times.
                                            </span>
                                        </div>
                                    </Space>

                                    <Space className="testimonals2" direction="vertical" style={{ margin: "auto" }}>
                                        <Card style={{
                                            display: "flex", width: 180, paddingLeft: 5,
                                            height: "150px", textAlign: "initial",
                                            alignItems: "center", margin: "auto"
                                        }}>
                                            <h4>Tim Watts</h4>
                                            <span className="greyTextSub">Sunshine Parrots</span>
                                            <Divider></Divider>
                                            <Rate />


                                            <div className="imgAbsRight">
                                                <img src={require(`../../../assets/images/avatar.png`)}
                                                    alt="mobile" style={{ height: 90, width: 90, borderRadius: 10 }}
                                                />
                                            </div>
                                        </Card>
                                        <div style={{ marginLeft: 50 }}>
                                            <span className="greyTextSub">Creating my Logly account and profile was super easy. I now have all 3 of my pets profile’s created. The activity reminder system is great and will help me remind me when anything is needed for my baby.</span>
                                        </div>
                                    </Space>
                                </Col>
                                <Col md={1}></Col>
                            </>
                        ))}
                    </Slider>
                    <div className="clearfix"></div>
                </div>
            </section>
            <div className="clearfix"></div>

            <footer style={{ marginTop: 10 }}>
                <div className="bottom1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="b1">
                                    <p>
                                        <span className="dash1"></span>Get in Touch
                  </p>
                                    <h2>Have an inquiry or feedback for us?</h2>
                                </div>
                            </div>

                            <div className="clearfix" style={{ marginTop: 30 }}></div>

                            <Form onFinish={onFinish} form={form}>
                                <div className="col-md-4 col-md-offset-2" >
                                    <label style={{ marginTop: 18 }}>First Name: </label>
                                    <Form.Item name='firstname'
                                        rules={[{ required: true, message: 'Please input first name' }]}
                                    >
                                        <input type="text" className="form-control" placeholder="Enter First Name"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-md-4">
                                    <label style={{ marginTop: 18 }}>Last Name: </label>
                                    <Form.Item name='lastname'
                                        rules={[{ required: true, message: 'Please input last name' }]}
                                    >
                                        <input type="text" className="form-control" placeholder="Enter Last Name"
                                        />
                                    </Form.Item>
                                </div>



                                <div className="col-md-4  col-md-offset-2">
                                    <label style={{ marginTop: 18 }}>Email: </label>
                                    <Form.Item name='email' validateFirst="true"
                                        rules={[
                                            { required: true, message: 'Please input email' },
                                            { required: true, type: "email", message: 'Invalid Email!' },]}
                                    >
                                        <input type="text" className="form-control" type="email" placeholder="Enter Email"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-md-4 ">
                                    <label style={{ marginTop: 18 }}>Phone: </label>
                                    <Form.Item name='phone'
                                        rules={[{ required: true, message: 'Please input phone' }]}
                                    >
                                        <Input
                                            onKeyDown={limitPhoneNumber}
                                            hidden
                                            placeholder="Enter Phone number"
                                        />
                                        <InputPhoneNumber
                                            country="US"
                                            value={form.getFieldValue("phone")}
                                            placeholder="Enter Phone number"
                                            className="form-control"
                                            error={"Phone number required"}
                                            onKeyDown={limitPhoneNumber}
                                            onChange={phoneNumberChange}
                                        />
                                        {/* <input type="text" className="form-control" placeholder="Enter Phone number"
                    /> */}
                                    </Form.Item>
                                </div>

                                <div className="col-md-8 col-md-offset-2">
                                    <label style={{ marginTop: 18 }}>Message: </label>
                                    <Form.Item name='message'
                                        rules={[{ required: true, message: 'Please input Message' }]}
                                    >
                                        <textarea className="form-control" placeholder="Enter Message" ></textarea>

                                    </Form.Item>
                                    <input type="submit" className="btn10" vlaue="Submit" />
                                </div>


                            </Form>

                        </div>

                        <div className="clearfix"></div>

                        <div className="col-md-12">
                            <p>
                                &copy; Logly. All Rights Reserved.
                  <Link to={`/terms`} className="footerLink"> Terms of Use  </Link>
                                <Link to={`/policy`} className="footerLink">  Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}
