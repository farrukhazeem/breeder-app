import React, { useEffect, useState, useRef } from "react";
import "./Landing.scss";
import "./bootstrap.min.scss";
// import './slick.min.js';
import { Link } from "react-router-dom";
import {
  message, Form, Space, Row, Col,
} from "antd";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { getSubscriptions } from "../../redux/actions/subscription_action";
import { createFeedback } from "../../redux/actions/feedback_action";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Input from "../../components/input/input";
import InputPhoneNumber from "react-phone-number-input/input";
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function Landing() {
  const [allsubscriptions, setallsubscriptions] = useState([]);
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <RightOutlined />,
    pprevArrow: <LeftOutlined />,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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


  return (
    <div className="landing custom-bootstrap-landing">
      {/* <header> */}
      <div className="" >
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-4 col-xs-12">
            <div className="frame smallframe" >
              <img
                src={require(`../../../assets/images/Logo_Logly2.png`)}
                width={350} className="smallImg" style={{ marginTop: -37 }}
                alt="mobile"
              />
            </div>
          </div>

          <div className="col-md-5 col-xs-0">
            <Row style={{ paddingTop: 25 }} gutter="25">
              <Col xs={0} md={8}>
                <a href="/loglyPetlover" style={{ color: "white" }}>Pet Lovers</a>
              </Col>
              <Col xs={0} md={8}>
                <a href="/loglyBusiness" style={{ color: "white" }}>Businesses</a>
              </Col>
              <Col xs={0} md={8}>
                <a href="/loglyNonprofit" style={{ color: "white" }}>Non-profits</a>
              </Col>
            </Row>
          </div>

          <div className="col-md-3 col-xs-0">
            <div style={{ marginTop: 20 }} className="pull-right">
              <Link to={`/login`} className="smallSignIn"
                className="btn1 smallhide">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
      {/* </header> */}
      <div className="clearfix"></div>

      <section className="home1">
        <div className="frame">
          <img
            src={require(`../../../assets/images/LandingPage/mobile1.png`)}
            alt="mobile" className="mainImg"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-0"></div>

            <div className="col-md-6 col-xs-12">
              <div className="b1">
                <h1>
                  The Ultimate App, Website Platform And Community for Animal Caregivers
                </h1>
                <p>
                  Share Your Love for Animals - Love Logged And Organized!
                </p>
                <div className="center-sm">
                  <Link to={`/register`} className="btn1">Get Started</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>


      <section className="home2" style={{ marginTop: 40 }}>
        <div style={{ paddingBottom: "56.25%", position: "relative" }}>
          <iframe src="https://logly-technology.dotcompal.com/video/embed/yispyf9rd3"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
          </iframe>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="b1">
                <h2 style={{ paddingBottom: 20 }}>
                  <span className="dash1"></span>Our Story
                </h2>
                {/* <h2>
                  Lorem ipsum dolor sit amet consetetur sadipscing elitrsed diam
                  nonumy
                </h2> */}
                <p>
                  We are a team of animal lovers who have built the ultimate app
                  and website platform designed to positively impact the life’s
                  of our dear animals.
                </p>
                <p>
                  Animal lovers and caregivers have been forgotten for too long.
                  The care of our animals was just too informal, unorganized,
                  from the routine care documentations to their daily care.
                </p>
                <p>
                  Now, with the Logly app and community, you can easily set
                  auto-reminders for the animals care, build your loved animals
                  profiles and share tips and loving experiences with other
                  animal lovers and caregivers within a community united by its
                  love for animals!
                </p>
                {/* <a>View Subscription</a> */}
              </div>
            </div>

            <div className="col-md-6">
              <div className="frame">
                <img
                  src={require(`../../../assets/images/LandingPage/dog1.png`)}
                  alt="mobile"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="clearfix"></div>

      <section className="home3">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="b2">
                <h2>
                  <span className="dash1"></span>Our Features
                </h2>
              </div>
            </div>

            <div className="clearfix"></div>

            <div className="col-md-8 col-md-offset-2">
              <div className="row">
                {/* <div> */}
                <div className=" col-md-6 col-sm-12">
                  <div className="b1" style={{ minHeight: 390 }}>
                    <img
                      src={require(`../../../assets/images/LandingPage/home3_1.png`)}
                      alt="image"
                    />
                    <h1>CRM</h1>
                    <p>
                      A dedicated CRM for professional caregivers where you can
                      easily transfer your animal’s ownership to another
                      caregiver. It also takes care of your bookkeeping!
                    </p>
                  </div>
                </div>

                <div className="  col-md-6 col-sm-12">
                  <div className="b1" style={{ minHeight: 390 }}>
                    <img
                      src={require("../../../assets/images/LandingPage/home3_2.png")}
                      alt="image"
                    />
                    <h2>BEAUTIFUL ANIMAL PROFILES </h2>
                    {/* {/* (LOGLYFILES)/} */}
                    <p>
                      Create beautifully designed profiles for your animals with
                      unlimited videos, photos, shares on social media, and a
                      lot more. You can quickly share the profiles with anyone!
                    </p>
                  </div>
                </div>
                {/* </div> */}
                {/* <div> */}
                <div className="  col-md-6 col-sm-12">
                  <div className="b1" style={{ minHeight: 390 }}>
                    <img
                      src={require("../../../assets/images/LandingPage/home3_3.png")}
                      alt="image"
                    />
                    <h2>REPORTS</h2>
                    <p>
                      Measure your animal caregiving activities to make sure
                      you’re taking care of your loved animals in the best way
                      as possible!
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="b1" style={{ minHeight: 390 }}>
                    <img
                      src={require("../../../assets/images/LandingPage/home3_4.png")}
                      alt="image"
                    />
                    <h2>AUTO-REMINDERS</h2>
                    <p>
                      Set auto-reminders so you never miss a caregiving task
                      you’ve set yourself. Our beloved animals rely on your
                      care!
                    </p>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="catImg" style={{ display: "none" }}>
            <img
              src={require("../../../assets/images/LandingPage/cat1.png")}
              alt="image" />
          </div>
        </div>
      </section>


      <div className="clearfix"></div>

      <section className="home4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-24">
              <h2 style={{ paddingBottom: 20 }}>
                <span className="dash1"></span>Our Solutions
              </h2>
              <div>
                <div className="col-md-4 col-xs-12" style={{ marginTop: 15 }}>
                  <div className="b1 ourSol">
                    <h2 style={{ textAlign: "center" }}>For Pet Lovers</h2>
                    <p style={{ textAlign: "center" }}>
                      Created to provide a better world for Animals & Pets by interconnecting the entire Pet Care industry
                    </p>
                    <div className="center-sm" style={{ marginTop: 10 }}>
                      <a href="/loglyPetlover" className="btn1">Learn more</a>
                      {/* <Link to={`/loglyPetlover`} className="btn1">Learn more</Link> */}
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xs-12" style={{ marginTop: 15 }}>
                  <div className="b1 ourSol">
                    <h2 style={{ textAlign: "center" }}>For Businesses</h2>
                    <p style={{ textAlign: "center" }}>
                      Business tools to help explode your pet care business & build incredible trust with your clients
                    </p>
                    <div className="center-sm" style={{ marginTop: 10 }}>
                      <a href="/loglyBusiness" className="btn1">Learn more</a>
                      {/* <Link to={`/loglyBusiness`} className="btn1">Learn more</Link> */}
                    </div>
                  </div>
                </div>


                <div className="col-md-4 col-xs-12" style={{ marginTop: 15 }}>
                  <div className="b1 ourSol">
                    <h2 style={{ textAlign: "center" }}>For Non-profits</h2>
                    <p style={{ textAlign: "center" }}>
                      Premium Business Software provided for Free for all Non-Profit Animal Care Businesses with 501(C)
                    </p>
                    <div className="center-sm" style={{ marginTop: 10 }}>
                      <a href="/loglyNonprofit" className="btn1">Learn more</a>
                      {/* <Link to={`/loglyNonprofit`} className="btn1">Learn more</Link> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <Slider {...settings}>
                {allsubscriptions.map((e) => (
                  <div style={{ padding: 10 }}>
                    <div href="" className="b1 sliderPackage" style={{ width: 400, minHeight: 360 }}>
                      <h4 style={{ fontWeight: 'bold' }}>{e.name}</h4>
                      <h2>
                        ${e.monthlyPrice || e.monthlyPrice === 0 ? `${e.monthlyPrice}` : `${e.lifetimePrice}`}
                        {e.monthlyPrice || e.monthlyPrice === 0 ? <span>/month</span> : <span>/lifetime</span>}
                      </h2>
                      <p>{e.description}</p>
                      <ul>
                        {e.allowedAnimal > 0 && (
                          <li>Allowed Animals {e.allowedAnimal}</li>
                        )}
                        {e.allowedEmp > 0 && (
                          <li>Allowed Team Members {e.allowedEmp}</li>
                        )}
                        {e.allowedProduct > 0 && (
                          <li>Allowed Products {e.allowedProduct}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}

              </Slider> */}
            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>

      <section className="home5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="frame">
                <img
                  src={require("../../../assets/images/LandingPage/mobile2.png")}
                  alt="mobile"
                />
              </div>
            </div>

            <div className="col-md-6">
              <h2 style={{ paddingBottom: 20 }}>
                <span className="dash1"></span>Logly Mobile Apps
              </h2>

              <p>
                Logly Apple and Android apps- Great for Pet Owners, Businesses & Non-Profits. Document Care, Health Records & Share Pet Profiles on the go. Connect family and team members to app.
              </p>

              <div className="col-md-6 col-xs-12">
                <a href="https://apps.apple.com/us/app/logly/id1544265986" className="btn1"
                  target="_blank" >
                  <img src={require("../../../assets/images/LandingPage/app_store.png")}
                  />
                  <span>Get it on</span>
                  <p>App Store</p>
                </a>
              </div>
              <div className="col-md-6 col-xs-12">
                <a href="https://play.google.com/store/apps/details?id=com.livewireapps.LOGLY" className="btn1"
                  target="_blank">
                  <img src={require("../../../assets/images/LandingPage/google_play.png")}
                  />
                  <span>Get it on</span>
                  <p>Play Store</p>
                </a>
              </div>


            </div>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>

      <footer>
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
              {/* <div className="col-md-4 col-md-offset-2">
                <label>First Name: *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                />
                <span className="error"></span>
              </div>

              <div className="col-md-4">
                <label>Last Name: *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                />
                <span className="error"></span>
              </div>

              <div className="col-md-4 col-md-offset-2">
                <label>Email: *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                />
                <span className="error"></span>
              </div>

              <div className="col-md-4">
                <label>Phone: *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                />
                <span className="error"></span>
              </div>

              <div className="col-md-8 col-md-offset-2">
                <label>Message: *</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Message"
                ></textarea>
                <span className="error"></span>
                <input type="submit" className="btn1" vlaue="Submit" />
              </div> */}
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
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </div >
  );
}
