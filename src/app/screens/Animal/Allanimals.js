import React from "react";
import Card from "../../components/card/card";
import { Row, Col, Space, Typography } from "antd";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./Allanimals.scss";

const { Text, Title } = Typography;

function Allanimals(props) {
  console.log(props);
  const {updateFeaturedAnimal} = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: (props.data.length > 4) ? 4 : props.data.length,
    slidesToScroll: 2,
  };
  return (
    <Slider {...settings}>
      {props.data.map((e) => (
        <div style={{ marginRight: 30 }}>
          <Card style={{ textAlign: "center", marginRight: 30 }} >
            <Space direction="vertical">
              <div
                style={{ width: 200, borderRadius: 100, overflow: "hidden" }}
              >
                <img src={e.image ? e.image : require('../../../assets/images/AnimalProfile/1a.png')} width={200} />
              </div>
                <Title level={4} style={{ marginTop: 5, }} ><Link to={'/businessprofile/detail/1'}>{e.data.name}</Link></Title>
              <Space>
                <b>Animal Category:</b> <Text>{e.categoryId.name}</Text>
              </Space>
              <Space>
                <b className="fs-140">Breed:</b> <Text>{e.data.breed}</Text>
              </Space>
              <br /><br />
              <a onClick={() => updateFeaturedAnimal(false, e._id)}><b>Remove</b></a>
            </Space>
          </Card>
        </div>
      ))}
    </Slider>
  );
  // return (

  // )

  // return(
  //     <>
  //     {props.data.map(name => (
  //      <Cart style={{ width: '100%;', height:"auto",  minWidth:"300px",marginTop:"10px" }} >
  //         <Row>
  //             <Col xs={24} lg={8} className="textAlign-md-box">
  //                 <Space>
  //                 <img src={require(`../../../assets/images/familytree/parent1@2x.png`)} width={'50'} alt="logo" />
  //                     <Space  direction="vertical">
  //     <span className="primary-text" style={{fontSize:"18px"}}><Link to={ (window.location.pathname === '/product') ? '/product/detail' : (window.location.pathname === '/businessprofile') ? '/businessprofile/detail/1' : '/animal/profile'}>{name} {}</Link></span>
  //                         <span className="secondary-text" > Registered date:30th Jan,2020</span>
  //                     </Space>
  //                 </Space>
  //             </Col>

  //             <Col xs={24} lg={4} className="textAlign-md-box">
  //                 <Row>
  //                     <Col xs={12} md={20}>
  //                         <span className="secondary-text" >{window.location.pathname === '/product'? "Product" : "Animal"} Category</span>
  //                     </Col>
  //                     <Col xs={12} md={20}>
  //                         <span className="primary-text" > Dog</span>
  //                     </Col>
  //                 </Row>
  //             </Col>
  //             <Col xs={24} lg={4} className="textAlign-md-box">
  //                  <Row>
  //                     <Col xs={12} md={20}>
  //                         <span className="secondary-text" >Registered by</span>
  //                     </Col>
  //                     <Col xs={12} md={20}>
  //                         <span className="primary-text" > Any name</span>
  //                     </Col>
  //                 </Row>
  //             </Col>

  //             <Col xs={24} lg={4} className="textAlign-md-box">
  //                  <Row>
  //                     <Col xs={12} md={20}>
  //                         <span className="secondary-text" >{window.location.pathname === '/product'? "Stack" : ""} Status</span>
  //                     </Col>
  //                     <Col xs={12} md={20}>
  //                         <span className="primary-text" > Alive</span>
  //                     </Col>
  //                 </Row>
  //             </Col>

  //             <Col xs={24} lg={4} className="textAlign-md-box">
  //                 <Button className="inner-primary-btn">remove</Button>
  //             </Col>
  //         </Row>

  //      </Cart>
  //     ))}
  //     </>
  // )
}

export default Allanimals;
