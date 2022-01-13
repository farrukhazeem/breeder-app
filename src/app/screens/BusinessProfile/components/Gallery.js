import React, { useCallback, useState } from "react";
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import Slider from "react-slick";

import {
  Space,
  Row,
  Col,
  Checkbox,
  Modal,
  Upload,
  message,
  Empty,
  Typography,
} from "antd";
import moment from "moment";
import Cookies from "universal-cookie";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import { baseUrl } from "../../../config/globalConfig";
import ImgViewer from "../../../components/ImageViewer/Lightbox";
import ImgCrop from "antd-img-crop";
import { deleteUserGalleryImages } from "../../../redux/actions/user_actions";
import ReactPlayer from "react-player";
import VideoThumbnail from "simple-react-video-thumbnail";

const auth = localStorage.getItem("w_auth");
const { Dragger } = Upload;

function Gallery(props) {
  const dispatch = useDispatch();

  const [visibleUploadingModal, setvisibleUploadingModal] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [uploadingType, setUploadingType] = useState(null);
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  // const [allImages, setAllImages] = useState(
  //   props.data.gallery.map((i) => i.filename)
  // );

  const draggerProps = {
    name: "file",
    multiple: true,
    action: `${baseUrl}/user/gallery/upload`,
    headers: {
      auth,
    },
    data: {
      id: props.data._id,
    },

    // accept: "application/pdf",
    onChange(info) {
      console.log("dragger option inside file");
      const { status } = info.file;
      console.log(info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setvisibleUploadingModal(false);
        setUploadingType(null);
        props.refreshData(props.data._id);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },

    beforeUpload(file) {
      if (uploadingType === "video") {
        const valid = file.type.split("/")[0] === "video";
        if (!valid) {
          message.error("Only video is allowed!");
          return false;
        } else {
          return true;
        }
      } else if (uploadingType === "image") {
        const valid = file.type.split("/")[0] === "image";
        if (!valid) {
          message.error("Only video is allowed!");
          return false;
        } else {
          return true;
        }
      }

      // console.log(file);
    },
  };

  const handleOk = () => {
    setUploadingType(null);
    setvisibleUploadingModal(false);
  };
  const handleCancel = () => {
    setUploadingType(null);
    setvisibleUploadingModal(false);
  };

  const onChange = (event, data) => {
    if (event.target.checked) {
      setDeleteList([...deleteList, ...[data._id]]);
    } else {
      setDeleteList(deleteList.filter((e) => !(e === data._id)));
    }
  };

  const imagess = [
    "1st image@2x.png",
    "2nd image@2x.png",
    "3rd image@2x.png",
    "4th_image@2x.png",
    "5th image@2x.png",
    "6th image@2x.png",
    "7th image@2x.png",
    "8th image@2x.png",
    "9th image@2x.png",
  ];

  const clickDelete = () => {
    console.log(deleteList);
    const onOkCancel = () => {
      dispatch(EnableLoader());
      dispatch(
        deleteUserGalleryImages({
          id: props.data._id,
          galleryImages: deleteList,
        })
      ).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        setDeleteList([]);
        props.refreshData(props.data._id);
      });
    };

    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCancel,
    });
  };

  const openImageViewer = useCallback((image) => {
    // setAllImages(props.data.gallery.map((i) => i.filename));
    // console.log(props.data.gallery.map((i) => i.filename));
    // console.log(allImages);
    setCurrentImage(image);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
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
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <>
      {isViewerOpen ? (
        <div>
          <ImgViewer
            data={props.data.gallery.map((i) => ({
              url: i.filename,
              type: i.type.split("/")[0] === "video" ? "video" : "photo",
            }))}
            startIndex={currentImage}
            onCloseCallback={closeImageViewer}
          />
        </div>
      ) : (
          <div>
            <div style={{ float: "right" }}>
              <Space>
                <Button
                  className="inner-white-btn"
                  onClick={() => setvisibleUploadingModal(true)}
                >
                  <img
                    src={require(`../../../../assets/images/gallery/Upload@2x.png`)}
                    width={"20"}
                    alt="logo"
                  />
                </Button>

                {props.data.gallery[0] && deleteList[0] && (
                  <Button className="inner-white-btn" onClick={clickDelete}>
                    <img
                      src={require(`../../../../assets/images/gallery/Delete@2x.png`)}
                      width={"20"}
                      alt="logo"
                    />
                  </Button>
                )}
              </Space>
            </div>
            <h2 className="heading-top">Gallery</h2>
            <br />

            {props.data.gallery ? (
              <div>
                {/* <Row> */}
                <Slider {...settings} swipeEvent={() => setIsSwiping(true)} onSwipe={(ev) => setIsSwiping(false)} >
                  {props.data.gallery.map((i, index) => (
                    // <Col
                    //   xs={24}
                    //   sm={12}
                    //   lg={8}
                    //   xl={6}
                    //   xxl={4}
                    //   style={{ marginTop: "20px" }}
                    //   className="textAlign-md-box"
                    // >
                    <div>
                      {i.type.split("/")[0] === "video" && (
                        <div style={{}}>
                          {/* <img
                                 onClick={() => openImageViewer(index)}
                                 src={i.filename}
                                 width={"210"}
                                 alt="logo"
                               /> */}
                          {/* <ReactPlayer playsinline light={i.filename} controls={true} url={i.filename} /> */}
                          {/* onClick={(e) => {e.stopPropagation(); setSelectedVideoUrl(i.filename); setIsVideoViewerOpen(true);}} */}

                          <div
                            onClick={() => !isSwiping && openImageViewer(index)}
                            style={{
                              overflow: "hidden",
                              width: 210,
                              height: 210,
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              backgroundColor: "#e9bcb7",
                              backgroundImage:
                                "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)",
                            }}
                          >
                            <VideoThumbnail
                              style={{ pointerEvents: "none" }}
                              videoUrl={i.filename}
                              snapshotAt={10}
                            />
                            {/* <ReactPlayer playsinline url={i.filename} light={true} controls={true}/> */}
                          </div>

                          <div className="">
                            <Checkbox
                              onChange={(e) => onChange(e, i)}
                              checked={deleteList.includes(i._id)}
                              style={{}}
                              className="secondary-text"
                            >
                              Uploaded on:{" "}
                              {moment(i.createdAt).format("DD MMM, YYYY")}
                            </Checkbox>
                            {/* <div
                           className="secondary-text"
                           style={{ marginLeft: "24px" }}
                         >
                         
                         </div> */}
                          </div>
                        </div>
                      )}

                      {i.type.split("/")[0] === "image" && (
                        <div style={{}}>
                          <img
                            onClick={() => !isSwiping && openImageViewer(index)}
                            src={i.filename}
                            width={"210"}
                            height={"210"}
                            alt="logo"
                          />

                          <div className="">
                            <Checkbox
                              onChange={(e) => onChange(e, i)}
                              checked={deleteList.includes(i._id)}
                              style={{}}
                              className="secondary-text"
                            >
                              Uploaded on:{" "}
                              {moment(i.createdAt).format("DD MMM, YYYY")}
                            </Checkbox>
                            {/* <div
                                             className="secondary-text"
                                             style={{ marginLeft: "24px" }}
                                           >
                                           
                                           </div> */}
                          </div>
                        </div>
                      )}
                      {/* </Col> */}
                    </div>
                  ))}
                </Slider>
                {/* </Row> */}
              </div>
            ) : (
                <div style={{ width: "100%", marginTop: 30 }}>
                  <Empty description={"No Data Found!"} />
                </div>
              )}

            <Modal
              title="Basic Modal"
              visible={visibleUploadingModal}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div style={{ marginTop: 20 }}>
                {!uploadingType && (
                  <Row gutter={20}>
                    <Col span={12}>
                      <Card
                        style={{
                          backgroundColor: "lightgray",
                          cursor: "pointer",
                        }}
                        onClick={() => setUploadingType("image")}
                      >
                        <Typography.Title level={4}>Upload Image</Typography.Title>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card
                        style={{
                          backgroundColor: "lightgray",
                          cursor: "pointer",
                        }}
                        onClick={() => setUploadingType("video")}
                      >
                        <Typography.Title level={4}>
                          Upload Video
                      </Typography.Title>
                      </Card>
                    </Col>
                  </Row>
                )}

                {uploadingType === "image" && (
                  <ImgCrop
                    rotate
                  // beforeCrop={(file) => {
                  //   console.log(file);
                  //     if(file.type.split("/")[0] === "image") {
                  //       return true;
                  //     } else {
                  //       return false;
                  //     }
                  //   }}
                  >
                    <Dragger
                      showUploadList={false}
                      onPreview={onPreview}
                      {...draggerProps}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                      <p className="ant-upload-hint">
                        Support for uploading Images only
                    </p>
                    </Dragger>
                  </ImgCrop>
                )}

                {uploadingType === "video" && (
                  <Dragger onPreview={onPreview} {...draggerProps} accept="*">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                  </p>
                    <p className="ant-upload-hint">
                      Support for uploading Videos only
                  </p>
                  </Dragger>
                )}
              </div>
            </Modal>

            {/* {isViewerOpen && (
          <ImgViewer
            src={props.data.gallery.map((i) => i.filename)}
            currentIndex={currentImage}
            onClose={closeImageViewer}
          />
        )} */}

            <Modal
              title="Basic Modal"
              width={685}
              visible={isVideoViewerOpen}
              onCancel={() => {
                setIsVideoViewerOpen(false);
                setSelectedVideoUrl(null);
              }}
            >
              <ReactPlayer
                playsinline
                url={selectedVideoUrl}
                muted={false}
                controls={true}
              />
            </Modal>
          </div>
        )}
    </>
  );
}

export default Gallery;
