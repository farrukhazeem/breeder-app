import React, { useState, useCallback } from "react";
import { Row, Col, Carousel, Radio, Avatar, Typography, Space } from "antd";
import "./AnimalProfile.scss";
import Card from "../../../components/card/card";
import Slider from "react-slick";
import ImageViewer from "react-simple-image-viewer";

const { Text, Title } = Typography;

const images = [
  require("../../../../assets/images/gallaryNew/1@2x.png"),
  require("../../../../assets/images/gallaryNew/2@2x.png"),
  require("../../../../assets/images/gallaryNew/3@2x.png"),
  require("../../../../assets/images/gallaryNew/4@2x.png"),
  require("../../../../assets/images/gallaryNew/5@2x.png"),
  require("../../../../assets/images/gallaryNew/6@2x.png"),
  require("../../../../assets/images/gallaryNew/7@2x.png"),
];

const animalProfileAttr = {
  profile: "profile",
  familyTree: "familyTree",
};

function Profile() {
  return (
    <div className="profile-main">
      <Space className="profile-space" direction={"vertical"}>
        <div className="profile-item">
          <Text className="secondary-text">Quanity</Text>
          <Text>100</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Sex</Text>
          <Text>Male</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Age</Text>
          <Text>1 y/o</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Breed</Text>
          <Text>Pitbull</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Height</Text>
          <Text>50cm</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Weight</Text>
          <Text>20 Kgs</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Color</Text>
          <Text>Brown</Text>
        </div>
        <div className="profile-item">
          <Text className="secondary-text">Price</Text>
          <Text>$99.99</Text>
        </div>
      </Space>
    </div>
  );
}

function FamilyTree() {
  return (
    <div style={{ textAlign: "left" }}>
      <Space direction="vertical" style={{ marginTop: 5 }}>
        <div style={{ marginTop: 10 }}>
          <Space>
            <Avatar
              size="large"
              src={require("../../../../assets/images/familytree/Child1@2x.png")}
            />
            <Space direction="vertical">
              <Text>Animal ID goes here</Text>
              <Text className="secondary-text">Father</Text>
            </Space>
          </Space>
        </div>
        <div style={{ marginTop: 10 }}>
          <Space>
            <Avatar
              size="large"
              src={require("../../../../assets/images/familytree/Child2@2x.png")}
            />
            <Space direction="vertical">
              <Text>Animal ID goes here</Text>
              <Text className="secondary-text">Father</Text>
            </Space>
          </Space>
        </div>
        <div style={{ marginTop: 10 }}>
          <Space>
            <Avatar
              size="large"
              src={require("../../../../assets/images/familytree/Animal@2x.png")}
            />
            <Space direction="vertical">
              <Text>Animal ID goes here</Text>
              <Text className="secondary-text">Father</Text>
            </Space>
          </Space>
        </div>
      </Space>
    </div>
  );
}

// const closeImageViewer = () => {
//   setCurrentImage(0);
//   setIsViewerOpen(false);
// };

function AnimalProfile() {
  const [tabIndex, setTabIndex] = useState(animalProfileAttr.profile);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  return (
    <div className="animal-profile-body">
      <Row className="animal-row">
        <Col span={9} className="info">
          <div>
            <div className="setting-radio-btn-switch-businessprofile">
              <Radio.Group
                value={tabIndex}
                onChange={(index) => {
                  setTabIndex(index.target.value);
                }}
                style={{ marginBottom: 16 }}
              >
                <Radio.Button value={animalProfileAttr.profile}>
                  Profile
                </Radio.Button>
                <Radio.Button value={animalProfileAttr.familyTree}>
                  Family Tree
                </Radio.Button>
              </Radio.Group>
            </div>

            <div className="animal-profile-info-body">
              {/* {tabIndex === settingAttrs.paymentInfo && <PaymentInfo />}
                            {tabIndex === settingAttrs.socialMedia && socialMediaRenderer()}
                            {tabIndex === settingAttrs.notification && notificaitonRenderer()}
                            {tabIndex === settingAttrs.businessInfo && <BusinessInfoRrenderer />} */}
              <Card className="info-card">
                <div className="avatar-image">
                  <img
                    src={require("../../../../assets/images/gallery/1st image@2x.png")}
                    alt="logo"
                  />
                </div>
                <Title level={3} style={{ marginTop: 10, marginBottom: 0 }}>
                  Animal ID
                </Title>
                <Title
                  level={4}
                  style={{ marginTop: 0, marginBottom: 0 }}
                  className="secondary-text"
                >
                  Pablo
                </Title>

                <div>
                  {tabIndex === animalProfileAttr.profile && <Profile />}
                  {tabIndex === animalProfileAttr.familyTree && <FamilyTree />}
                </div>
              </Card>
            </div>
          </div>
        </Col>

        <Col
          span={15}
          className="gallary"
          style={{
            marginRight: -38,

            overflow: "hidden",
          }}
        >
          {/* <Carousel>
                        <div>
                            <img src={require('../../../../assets/images/gallery/1st image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/2nd image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/3rd image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/4th_image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/5th image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/6th image@2x.png')} width={'70'} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../../../assets/images/gallery/7th image@2x.png')} width={'70'} alt="logo" />
                        </div>
                    </Carousel> */}

          <Slider {...settings} className="carousel-slider">
            {images.map((image, index) => (
              <div class="image-container">
                <img
                  src={image}
                  onClick={() => openImageViewer(index)}
                  alt="logo"
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        />
      )}
    </div>
  );
}

export default AnimalProfile;
