import React, { useCallback, useEffect, useState } from "react";
import Cart from "../../../components/card/card";
import {
  Row,
  Col,
  Form,
  Space,
  Modal,
  Typography,
} from "antd";
import Button from "../../../components/button/button";
import fieldValidation from "../../../validations/fieldValidation";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import {
  getAnimal,
} from "../../../redux/actions/animal_action";
import ImgViewer from "../../../components/ImageViewer";
import Lightbox from "../../../components/ImageViewer/Lightbox";
import moment from 'moment'
import VideoThumbnail from 'simple-react-video-thumbnail'
import { getFormByCategory } from "../../../redux/actions/form_action";
import './profile.scss'

const auth = localStorage.getItem("w_auth");

function Profilepage(props) {
  const [QRCodeModal, setQRCodeModal] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isViewerOpenGallery, setIsViewerOpenGallery] = useState(false);
  const [editSelectedIndex, setEditSelectedIndex] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [currentImageGallery, setCurrentImageGallery] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);
  const dispatch = useDispatch();



  useEffect(() => {
    refreshData(props.data._id);
  }, []);


  const getFormByCategoryId = (id) => {
    dispatch(EnableLoader());
    dispatch(getFormByCategory(id)).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setCurrentForm(response.payload.data);
      }
    })
  }




  const refreshData = (id) => {
    dispatch(EnableLoader());
    dispatch(getAnimal(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        getFormByCategoryId(response.payload.data.categoryId._id);
        setAnimal(response.payload.data);
      }
    });
  }


  const clickQRCode = () => {
    // dispatch(EnableLoader());
    // dispatch(getQRCodeOfAnimal(props.data._id)).then(response => {
    //     dispatch(DisableLoader());

    //     console.log(response)
    // });
    setQRCodeModal(true);
  };



  const openImageViewer = useCallback((image) => {
    setCurrentImage(image);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const openImageViewerGallery = useCallback((image) => {
    console.log(
      props.data.gallery
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
        .map((i) => i.filename)
    );
    console.log(image);
    setCurrentImageGallery(image);
    setIsViewerOpenGallery(true);
  }, []);

  const closeImageViewerGallery = () => {
    setCurrentImageGallery(0);
    setIsViewerOpenGallery(false);
  };



  const onPreview = async (file) => {
    console.log(file);
    console.log("onPreview");
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onChangeBreedTraitModal = (data) => {
    console.log(data);
    if (Object.keys(data)[0] === 'breed') {
      setAnimal({ ...animal, data: { ...animal.data, breed: data.breed } });
    }
  }


  return (
    <>
      {isViewerOpenGallery ? (
        <Lightbox className="Lightbox"
          // src={
          //   props.data.gallery
          //     ? props.data.gallery
          //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          //       .slice(0, 6)
          //       .map((i) => i.filename)
          //     : []
          // }
          // currentIndex={currentImageGallery}
          // onClose={closeImageViewerGallery}


          data={
            props.data.gallery
              ? props.data.gallery
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6)
                .map((i) => ({ url: i.filename, type: i.type.split('/')[0] === 'video' ? 'video' : 'photo' }))
              : []
            // props.data.gallery.map((i) => ({url: i.filename, type: i.type==='video' ?  'video' : 'photo'}))
          }
          startIndex={currentImageGallery}
          onCloseCallback={closeImageViewerGallery}
        />
      ) : (
          <div >
            <h2 className="heading-top smallCenter PrimaryWhiteSmall">Pet Profile</h2>
            <Row gutter={30} style={{ marginTop: 30 }}>
              <Col xs={24} md={10}>
                <Cart
                  style={{
                    width: "100%;",
                    height: "auto",
                    margin: "10px",
                    maxWidth: "450px",
                    minWidth: "300px",
                  }}
                  className="marginSmall0"
                >
                  <div>
                    {/* <div class="inner"><h2 className="primary-text"> <b className="primary-text-heading">Animal Id</b></h2>
                              <div class="second"><b className="secondary-text">Pablo</b></div>
                              </div> */}


                    <div style={{ textAlign: "center" }}>
                      <img
                        onClick={() =>
                          openImageViewer(props.data.image ? props.data.image : require("../../../../assets/images/familytree/Animal@2x.png"))
                        }
                        src={props.data.image ? props.data.image : require("../../../../assets/images/familytree/Animal@2x.png")} style={{ width: 80, height: 80, borderRadius: 40, position: "absolute", marginTop: -50, marginLeft: -38 }}
                        alt="logo"
                      />
                    </div>
                  </div>


                  <div style={{ marginTop: 50 }}>
                    <Row>
                      <Typography.Text className="primary-text fws-120" style={{ fontSize: 25 }}> {animal?.data?.name}</Typography.Text>

                      {animal && animal.data && animal.data.gender ?
                        animal.data.gender.constructor === Array ?
                          <img
                            src={animal.data.gender[0].toLowerCase() === "male" ?
                              require("../../../../assets/images/familytree/Animal@2x.png")
                              : require("../../../../assets/images/familytree/Animal@2x.png")
                            }
                            style={{ width: 20, height: 20, marginLeft: 10 }}
                            alt="logo"
                          />
                          :
                          <img
                            src={animal.data.gender.toLowerCase() === "male" ?
                              require("../../../../assets/images/familytree/Animal@2x.png")
                              : require("../../../../assets/images/familytree/Animal@2x.png")
                            }
                            style={{ width: 20, height: 20, marginLeft: 10, marginTop: -10 }}
                            alt="logo"
                          />
                        : null}


                      {animal && animal.data && animal.data.sex ?
                        animal.data.sex.constructor === Array ?
                          <img
                            src={animal.data.sex[0].toLowerCase() === "male" ?
                              require("../../../../assets/images/familytree/male.png")
                              : require("../../../../assets/images/familytree/female.jpg")
                            }
                            style={{ width: 20, height: 20, marginLeft: 10, marginTop: 3 }}
                            alt="logo"
                          />
                          :
                          <img
                            src={animal.data.sex.toLowerCase() === "male" ?
                              require("../../../../assets/images/familytree/male.png")
                              : require("../../../../assets/images/familytree/female.jpg")
                            }
                            style={{ width: 20, height: 20, marginLeft: 10, marginTop: 3 }}
                            alt="logo"
                          />
                        : null}
                    </Row>

                    <div></div>
                    {animal && animal.data && animal.data.breed ?
                      animal.data.breed.constructor === Array ? animal.data.breed[0] : animal.data.breed
                      : null}
                  </div>


                  <Row style={{ marginTop: "15px" }}>
                    <Col xs={12} className="primary-text fs-120 fws-120">
                      Animal ID
                    </Col>
                    <Col xs={12} className="primary-text fs-120">
                      <Typography.Text> {animal && animal._id.substr(0, 6)}</Typography.Text>
                    </Col>
                  </Row>

                  {animal && Object.entries(animal.data).map(
                    ([key, value], index) =>
                      key !== "file" &&
                      key !== "animals" &&
                      key !== "breed" &&
                      key !== "traits" && value && (
                        <Row style={{ marginTop: "15px" }}>
                          <Col xs={12} className="primary-text fs-120 fws-120">
                            {fieldValidation.titleCase(key)}
                          </Col>
                          <Col xs={12} className="primary-text fs-120">
                            <Typography.Text hidden={(editSelectedIndex === index)}>{(key.includes("date") || key == "DOB" || key == "dob" || (isNaN(parseFloat(value)) && moment(value).isValid())) ? moment(value).format("DD MMM, YYYY") : key === "time" ? moment(value).format("hh mm, s") : value}</Typography.Text>
                          </Col>
                        </Row>
                      )
                  )}


                  <div style={{ marginTop: 20 }}>

                    <Row>
                      <Col xs={12}>
                        <Typography.Text className="primary-text fs-120 fws-120">Breed </Typography.Text>
                      </Col>

                      <div>
                        {animal && animal.data.breed && (typeof animal.data.breed === "string" ? (
                          <div
                            className="primary-background"
                            style={{
                              borderRadius: 20,
                              padding: 3,
                              color: 'white',
                              paddingLeft: 10,
                              paddingRight: 10,
                              cursor: 'pointer',

                            }}
                          >
                            {animal.data.breed}
                          </div>
                        ) : (
                            animal.data.breed.map((e) => (
                              <div
                                className="primary-background"
                                style={{
                                  borderRadius: 20,
                                  padding: 3,
                                  color: 'white',
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  cursor: 'pointer'
                                }}
                              >
                                {e}
                              </div>
                            ))
                          ))}
                      </div>

                    </Row>


                    <div>
                      {animal?.data?.traits ?
                        <Typography.Text className="primary-text fs-120 fws-120">Traits: </Typography.Text>
                        :
                        null}
                      <Space>
                        {animal && animal.data.traits && (typeof animal.data.traits === "string" ? (
                          <div
                            className="primary-background "
                            style={{
                              borderRadius: 20,
                              padding: 3,
                              color: 'white',
                              paddingLeft: 10,
                              paddingRight: 10,
                              cursor: 'pointer',
                              marginTop: 10
                            }}
                          >
                            {animal.data.traits}
                          </div>
                        ) : (
                            animal.data.traits.map((e) => (
                              <div
                                className="primary-background"
                                style={{
                                  borderRadius: 20,
                                  padding: 3,
                                  color: 'white',
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  cursor: 'pointer',
                                  marginTop: 10
                                }}
                              >
                                {e}
                              </div>
                            ))
                          ))}
                      </Space>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 25 }}>
                      <Space>
                        <Button className="secondary-button" onClick={clickQRCode}>
                          QR Code
                        </Button>
                      </Space>
                    </div>

                  </div>

                </Cart>

                <div style={{
                  background: "white", height: 30,
                  width: "100%", position: "absolute", marginTop: -15
                }} className="bigDisplay"></div>

              </Col>

              <Col xs={24} md={14}>
                <div className="smallhide">
                  <div style={{ float: "right" }}>
                    <Space>
                      {/* <Button className="secondary-button" onClick={clickQRCode}>
                        QR Code
                </Button> */}

                    </Space>
                  </div>

                  <h3 className="primary-text">
                    {" "}
                    <b className="primary-text-heading">Recent From Gallery</b>
                  </h3>

                  <Row gutter={10} >
                    {props.data.gallery &&
                      props.data.gallery
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((image, index) => (
                          <Col style={{ marginTop: "15px" }}>
                            {image.type.split("/")[0] === "video" && (
                              <div onClick={() => openImageViewerGallery(index)} style={{ overflow: 'hidden', width: 180, height: 180, alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: "#e9bcb7", backgroundImage: 'linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)' }}>
                                <VideoThumbnail videoUrl={image.filename} snapshotAt={10} />
                              </div>
                            )}
                            {image.type.split("/")[0] === "image" && (<img
                              onClick={() => openImageViewerGallery(index)}
                              src={image.filename}
                              style={{ width: 180, height: 180, borderRadius: 20 }}
                              alt="logo"
                            />)}

                          </Col>
                        ))}
                  </Row>
                </div>
              </Col>

            </Row>


            {/* QRCode modal... */}
            <Modal
              visible={QRCodeModal}
              footer={null}
              closable={false}
              centered={true}
            >
              <div style={{ paddingRight: "20px" }}>
                <Typography.Title level={3} strong>
                  {"QR Code"}
                </Typography.Title>

                <img width={300} src={props.data.qrcodepath} />
                <br />
                <Space>
                  <Button
                    className="secondary-button"
                    onClick={() => setQRCodeModal(false)}
                  >
                    Close
              </Button>
                </Space>
              </div>
            </Modal>


            {isViewerOpen && (
              <ImgViewer
                src={[currentImage]}
                //   currentIndex={  }
                onClose={closeImageViewer}
              />
            )}


          </div>


        )}



    </>

  );
}

export default Profilepage;