import React, { useCallback, useEffect, useRef, useState } from "react";
import Cart from "../../../components/card/card";
import {
  Row,
  Col,
  Form,
  Select,
  Space,
  message,
  Modal,
  Typography,
  Divider,
  Upload,
  Dropdown,
  Menu,
} from "antd";
import Button from "../../../components/button/button";
import ImgCrop from "antd-img-crop";
import Card from "../../../components/card/card";
import constants from "../../../config/constants";
import fieldValidation from "../../../validations/fieldValidation";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";

import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import {
  getAnimal,
  getQRCodeOfAnimal,
  updateAnimalData,
  deleteAnimal,
  updateAnimal,
} from "../../../redux/actions/animal_action";
import ImgViewer from "../../../components/ImageViewer";
import Lightbox from "../../../components/ImageViewer/Lightbox";
import { Link } from "react-router-dom";
import Input from "../../../components/input/input";
import { parseZone } from "moment";
import InputNumber from "../../../components/numberInput/NumberInput";
import {
  CheckOutlined,
  UserOutlined,
  EditFilled,
  InboxOutlined,
  DownOutlined,
} from "@ant-design/icons";
import TransferModal from "./TransferModal";
import moment from "moment";
import VideoThumbnail from "simple-react-video-thumbnail";
import ProfileDataEdit from "./ProfileDataEdit";
import { getFormByCategory } from "../../../redux/actions/form_action";
import { baseUrl, webAnimalUrl } from "../../../config/globalConfig";
import ProfileAnimalUpdate from "./ProfileAnimalUpdate";
import FormGenerator from "../FormGenerator";
import { FacebookIcon, FacebookShareButton } from "react-share";
// import { globalConfig } from "antd/lib/modal/confirm";

const { Dragger } = Upload;
const auth = localStorage.getItem("w_auth");

const { Option } = Select;
const names = [
  { name: "Total animals" },
  { name: "Alive" },
  { name: "Sick" },
  { name: "Dead" },
  { name: "Pregnant" },
];

const statuses = [
  "1st image@2x.png",
  "2nd image@2x.png",
  "3rd image@2x.png",
  "4th image@2x.png",
  "5th image@2x.png",
  "6th image@2x.png",
];
const data = {
  Quantity: 10,
  Sex: "male",
  Age: 12,
  Breed: "Pitbull",
  Height: "20cm",
  Color: "green",
  Weight: "20 kgs",
  Status: "alive",
};
function Profilepage(props) {
  console.log(props);
  const currUser = JSON.parse(localStorage.getItem("user"));
  const myRef = useRef();
  const [BreedTraitModalForm] = Form.useForm();
  const [QRCodeModal, setQRCodeModal] = useState(false);
  const [TransferCodeModal, setTransferCodeModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isViewerOpenGallery, setIsViewerOpenGallery] = useState(false);
  const [quantityError, setQuantityError] = useState(null);
  const [editSelectedIndex, setEditSelectedIndex] = useState(null);
  const [selectedIndexData, setSelectedIndexData] = useState({});
  const [visibleUploadingModal, setvisibleUploadingModal] = useState(false);
  const [uploadingType, setUploadingType] = useState(null);
  const [breedTraitModalVisible, setBreedTraitModalVisible] = useState(false);
  const [animal, setAnimal] = useState(null);
  const [currentImageGallery, setCurrentImageGallery] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);
  const [shareLinkModal, setShareLinkModal] = useState(false);
  const form = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    refreshData(props.data._id);
  }, []);

  const getFormByCategoryId = (id) => {
    dispatch(EnableLoader());
    dispatch(getFormByCategory(id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setCurrentForm(response.payload.data);
      }
    });
  };

  const removeItem = () => {
    const onOkCancel = () => {
      dispatch(EnableLoader());
      dispatch(deleteAnimal(props.data._id)).then((response) => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.history.push("/animal");
        } else {
          message.error(response.payload.message);
        }
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
  };

  const statusChange = (status) => {
    console.log(status);
    dispatch(EnableLoader());
    dispatch(updateAnimalData(status, props.data._id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
      }
    });
  };

  const clickQRCode = () => {
    // dispatch(EnableLoader());
    // dispatch(getQRCodeOfAnimal(props.data._id)).then(response => {
    //     dispatch(DisableLoader());

    //     console.log(response)
    // });
    setQRCodeModal(true);
  };

  const clicksetTransferCodeModal = () => {
    setTransferCodeModal(true);
  };

  const onClickShareLinkModal = () => {
    setShareLinkModal(true);
  };

  const quantityChange = (_, value) => {
    console.log(value);
    if (
      !(
        parseInt(value.aliveQuantity) ===
        parseInt(value.healthyQuantity) +
        parseInt(value.sickQuantity) +
        parseInt(value.pregnantQuantity)
      )
    ) {
      setQuantityError(
        "Invalid Quantity! Alive and Inventory by health should be equal"
      );
    } else {
      setQuantityError(null);
    }
  };

  const submitQuantityValues = (value) => {
    if (quantityError) return false;
    dispatch(EnableLoader());
    dispatch(updateAnimalData(value, props.data._id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        // setAnimal({
        //   ...animal,
        //   aliveQuantity: response.payload.data.aliveQuantity,
        //   deadQuantity: response.payload.data.deadQuantity,
        //   healthyQuantity: response.payload.data.healthyQuantity,
        //   sickQuantity: response.payload.data.sickQuantity,
        //   pregnantQuantity: response.payload.data.pregnantQuantity,
        // });
        refreshData(animal._id);
        setQuantityModal(false);
      }
    });
  };

  const updateData = (data) => {
    if (quantityError) return false;
    dispatch(EnableLoader());
    dispatch(
      updateAnimalData({ data: { ...animal.data, ...data } }, props.data._id)
    ).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        window.location.reload()
        seteditModal(false);
        message.success(response.payload.message);
        setEditSelectedIndex(null);
        setSelectedIndexData({});
        refreshData(props.data._id);
      }
    });
  };

  const updateFeaturedAnimal = (featured) => {
    dispatch(EnableLoader());
    dispatch(updateAnimalData({ featured }, props.data._id)).then(
      (response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.refreshData();
          refreshData(props.data._id);
        }
      }
    );
  };

  const updatePrivateAnimal = (featured) => {
    dispatch(EnableLoader());
    dispatch(updateAnimalData({ isPrivate: featured }, props.data._id)).then(
      (response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.refreshData();
          refreshData(props.data._id);
        }
      }
    );
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

  const handleChangeImg = (e) => {
    var formData = new FormData();
    formData.append("data", JSON.stringify(animal.data));
    formData.append("file", e.target.files[0], e.target.files[0].name);
    dispatch(EnableLoader());
    dispatch(updateAnimal(formData, props.data._id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        setEditSelectedIndex(null);
        setSelectedIndexData({});
        //props.refreshData();
        window.location.reload();
        refreshData(props.data._id);
      }
    });
  };

  const handleOk = () => {
    setUploadingType(null);
    setvisibleUploadingModal(false);
  };
  const handleCancel = () => {
    setUploadingType(null);
    setvisibleUploadingModal(false);
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    action: `${baseUrl}/animal/gallery/upload`,
    headers: {
      auth,
    },
    data: {
      id: props.data._id,
    },

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
    //talha removed
    // console.log(data);
    // if (Object.keys(data)[0] === "breed") {
    //   setAnimal({ ...animal, data: { ...animal.data, breed: data.breed } });
    // }
  };

  const onFinishBreedTraitModal = (data) => {
    updateData(data);
    setBreedTraitModalVisible(false);

    // onChangeData={(ev) => setSelectedIndexData({[key]: ev})} value={value} onSaveData={() =>  }
  };
  const [editModal, seteditModal] = useState(false);

  const copyLink = (link) => {
    console.log(link);
    copy(link.toString());
    message.success("Link Copied");
    // console.log(myRef.current);
    // console.log(myRef.current.props.value);
    // console.log(document.queryCommandSupported('copy'));

    // const result = document.execCommand('copy');
    // console.log(result);
    // // const range = document.createRange();
    // // range.selectNode(myRef);
    // // window.getSelection().addRange(range);
    // // try {
    // //   // Now that we've selected the anchor text, execute the copy command
    // //   const successful = document.execCommand('copy');
    // //   const msg = successful ? 'successful' : 'unsuccessful';
    // //   console.log('Copy email command was ' + msg);
    // // } catch(err) {
    // //   console.log('Oops, unable to copy');
    // // }

    // // // Remove the selections - NOTE: Should use
    // // // removeRange(range) when it is supported
    // // window.getSelection().removeAllRanges();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => removeItem()}>
        Archive Animal
      </Menu.Item>
      <Menu.Item key="2" onClick={clickQRCode}>
        QR Code
      </Menu.Item>
      <Menu.Item key="3" onClick={clicksetTransferCodeModal}>
        Transfer
      </Menu.Item>
      <Menu.Item key="3" onClick={onClickShareLinkModal}>
        Share Link
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isViewerOpenGallery ? (
        <Lightbox
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
                .map((i) => ({
                  url: i.filename,
                  type: i.type.split("/")[0] === "video" ? "video" : "photo",
                }))
              : []
            // props.data.gallery.map((i) => ({url: i.filename, type: i.type==='video' ?  'video' : 'photo'}))
          }
          startIndex={currentImageGallery}
          onCloseCallback={closeImageViewerGallery}
        />
      ) : (
          <div>
            <Row gutter={30}>
              <Col xs={10}>
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
                      <img
                        onClick={() =>
                          openImageViewer(
                            props.data.image
                              ? props.data.image
                              : require("../../../../assets/images/familytree/Animal@2x.png")
                          )
                        }
                        src={
                          props.data.image
                            ? props.data.image
                            : require("../../../../assets/images/familytree/Animal@2x.png")
                        }
                        style={{ width: 60, height: 60, borderRadius: 40 }}
                        alt="logo"
                      />

                      <Form.Item
                        className="animal-input-custom"
                      //  rules={[{ required: true, message: "Please enter image!" }]}
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "28px",
                            right: "17px",
                          }}
                        >
                          <a
                            className="primary-text"
                            style={{ cursor: "pointer" }}
                          >
                            <EditFilled />
                          </a>
                          <Input
                            id="image"
                            type="file"
                            onChange={(e) => handleChangeImg(e)}
                          ></Input>
                        </span>
                      </Form.Item>

                      <Space direction="vertical">
                        <h2
                          className="primary-text "
                          style={{ fontSize: 17, fontWeight: "bold" }}
                        >
                          {animal && animal.data.name}
                        </h2>
                        {/* <b className="secondary-text">Pablo</b> */}
                      </Space>
                      {animal && animal.featured ? (
                        <div
                          onClick={() => updateFeaturedAnimal(false)}
                          style={{
                            cursor: "pointer",
                            background: "#42f578",
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingTop: 2,
                            paddingBottom: 2,
                            borderRadius: 20,
                          }}
                        >
                          <h4 style={{ fontWeight: "bolder", color: "white" }}>
                            Featured
                        </h4>
                        </div>
                      ) : (
                          <div
                            onClick={() => updateFeaturedAnimal(true)}
                            style={{
                              cursor: "pointer",
                              paddingLeft: 8,
                              paddingRight: 8,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: 20,
                              borderColor: "#4a4a4a",
                              borderWidth: 1,
                              border: "solid",
                            }}
                          >
                            <h4 style={{ fontWeight: "bolder" }}>Featured</h4>
                          </div>
                        )}

                      {animal && animal.isPrivate ? (
                        <div
                          onClick={() => updatePrivateAnimal(false)}
                          style={{
                            cursor: "pointer",
                            background: "#42f578",
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingTop: 2,
                            paddingBottom: 2,
                            borderRadius: 20,
                          }}
                        >
                          <h4 style={{ fontWeight: "bolder", color: "white" }}>
                            Private
                        </h4>
                        </div>
                      ) : (
                          <div
                            onClick={() => updatePrivateAnimal(true)}
                            style={{
                              cursor: "pointer",
                              paddingLeft: 8,
                              paddingRight: 8,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: 20,
                              borderColor: "#4a4a4a",
                              borderWidth: 1,
                              border: "solid",
                            }}
                          >
                            <h4 style={{ fontWeight: "bolder" }}>Public</h4>
                          </div>
                        )}
                    </Space>
                    <div
                      onClick={() => seteditModal(true)}
                      className={"primary-color"}
                      style={{ fontSize: 23, float: "right" }}
                    >
                      <EditFilled />
                    </div>
                  </div>
                  {/* 
              <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                <Col
                  xs={24}
                  lg={12}
                  style={{ marginTop: "10px" }}
                  className="secondary-text fs-120"
                >
                  Status
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    initialValue={props.data.status}
                    name="status"
                    rules={[{ required: true, message: "Please select status" }]}
                  >
                    <Select
                      style={{ width: "70%" }}
                      defaultValue={props.data.status}
                      onChange={(status) => statusChange({ status: status })}
                      placeholder="Select status"
                      className="customSelect"
                    >
                      {constants.status.map((status) => (
                        <Option value={status}>{status}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
  
              <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                <Col
                  xs={24}
                  lg={12}
                  style={{ marginTop: "10px" }}
                  className="secondary-text fs-120"
                >
                  Health Status
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    initialValue={props.data.healthStatus}
                    name="status"
                    rules={[{ required: true, message: "Please select status" }]}
                  >
                    <Select
                      style={{ width: "70%" }}
                      onChange={(status) =>
                        statusChange({ healthStatus: status })
                      }
                      defaultValue={props.data.healthStatus}
                      placeholder="Select status"
                      className="customSelect"
                    >
                      {constants.healthStatus.map((status) => (
                        <Option value={status}>{status}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                <Col
                  xs={24}
                  lg={12}
                  style={{ marginTop: "10px" }}
                  className="secondary-text fs-120"
                >
                  Inventory Status
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    initialValue={props.data.inventoryStatus}
                    name="status"
                    rules={[{ required: true, message: "Please select status" }]}
                  >
                    <Select
                      style={{ width: "70%" }}
                      defaultValue={props.data.inventoryStatus}
                      onChange={(status) =>
                        statusChange({ inventoryStatus: status })
                      }
                      placeholder="Select state"
                      className="customSelect"
                    >
                      {constants.inventoryStatus.map((status) => (
                        <Option value={status}>{status}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row> */}

                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={12}
                      // style={{ marginTop: "10px" }}
                      className="secondary-text fs-120"
                    >
                      Quantity
                  </Col>
                    <Col xs={12} className="primary-text fs-120">
                      <Form.Item
                        initialValue={props.data.inventoryStatus}
                        name="status"
                        rules={[
                          { required: true, message: "Please select status" },
                        ]}
                      >
                        <Link onClick={() => setQuantityModal(true)}>
                          All Quantities
                      </Link>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Modal
                    style={{ minWidth: "800px" }}
                    visible={editModal}
                    footer={null}
                    closable={false}
                    centered={true}
                  >
                    <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
                      Edit Animal
                  </h1>
                    <ProfileAnimalUpdate
                      animal={animal}
                      formStructure={currentForm}
                      seteditModal={seteditModal}
                      updateData={(data) => updateData(data)}
                    />
                  </Modal>

                  {animal &&
                    Object.entries(animal.data).map(
                      ([key, value], index) =>
                        key !== "file" &&
                        key !== "animals" &&
                        key !== "breed" &&
                        key !== "quantity" &&
                        key !== "traits" && value && (
                          <Row style={{ marginTop: "15px" }}>
                            <Col xs={12} className="secondary-text fs-120">
                              {fieldValidation.titleCase(key)}
                            </Col>
                            <Col xs={12} className="primary-text fs-120">
                              {/* <Input
                            value={value}
                            defaultValue={value}
                            onChange={(ev) => setSelectedIndexData({ [key]: ev.target.value })}
                            suffix={
                              <CheckOutlined className="site-form-item-icon" onClick={(ev) => updateData(selectedIndexData)} />
                            }
                            hidden={!(editSelectedIndex === index)}
                            // placeholder={"Enter Quantity"}
                          /> */}

                              {/* 
<Form.Item
                          initialValue={value}
                        
                          hidden={!(editSelectedIndex === index)}
                          name={key}
                          rules={[
                            {
                              required: true,
                              message: "Please enter the value",
                            },
                          ]}
                        >
             <Input
                value={value}
                defaultValue={value}
                onChange={(ev) => {console.log(ev.target.value); setSelectedIndexData({ [key]: ev.target.value })}}
                suffix={
                  <CheckOutlined className="site-form-item-icon" onClick={(ev) => updateData(selectedIndexData)} />
                }
                // placeholder={"Enter Quantity"}
                />
            </Form.Item> */}

                              {/* hidden={!(editSelectedIndex === index)} */}
                              <ProfileDataEdit
                                form={currentForm}
                                hidden={!(editSelectedIndex === index)}
                                key={key}
                                attribute={key}
                                data={animal}
                                onChangeData={(ev) =>
                                  setSelectedIndexData({ [key]: ev })
                                }
                                value={value}
                                onSaveData={() => updateData(selectedIndexData)}
                              />

                              <Typography.Text
                                hidden={editSelectedIndex === index}
                              >
                                {(key.includes("date") || key == "DOB" || key == "dob" || (isNaN(parseFloat(value)) && moment(value).isValid())) ? moment(value).format("DD MMM, YYYY") : key === "time" ? moment(value).format("hh mm, s") : value}
                                {/* {key === 'sex' ? value : value} */}
                              </Typography.Text>
                            </Col>
                          </Row>
                        )
                    )}
                </Cart>

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
                    <div>
                      <Typography.Text className="secondary-text fs-120">
                        Breed:{" "}
                      </Typography.Text>
                      <Space>
                        {animal &&
                          animal.data.breed &&
                          (typeof animal.data.breed === "string" ? (
                            <div
                              className="primary-background"
                              style={{
                                borderRadius: 20,
                                padding: 3,
                                color: "white",
                                paddingLeft: 10,
                                paddingRight: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => setBreedTraitModalVisible(true)}
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
                                    color: "white",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setBreedTraitModalVisible(true)}
                                >
                                  {e}
                                </div>
                              ))
                            ))}
                      </Space>
                    </div>
                    <div>
                      {animal?.data?.traits ?
                        <Typography.Text className="secondary-text fs-120">
                          Traits:{" "}
                        </Typography.Text>
                        :
                        null}
                      <Space>
                        {animal &&
                          animal.data.traits &&
                          (typeof animal.data.traits === "string" ? (
                            <div
                              className="primary-background "
                              style={{
                                borderRadius: 20,
                                padding: 3,
                                color: "white",
                                paddingLeft: 10,
                                paddingRight: 10,
                                cursor: "pointer",
                                marginTop: 10,
                              }}
                              onClick={() => setBreedTraitModalVisible(true)}
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
                                    color: "white",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    cursor: "pointer",
                                    marginTop: 10,
                                  }}
                                  onClick={() => setBreedTraitModalVisible(true)}
                                >
                                  {e}
                                </div>
                              ))
                            ))}
                      </Space>
                    </div>
                  </div>
                </Cart>
              </Col>

              <Col xs={14}>
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
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button className="secondary-button">
                        Options <DownOutlined />
                      </Button>
                    </Dropdown>
                    {/* <Button className="secondary-button" onClick={clicksetTransferCodeModal}>
                      Transfer
                </Button>
                    <Button className="secondary-button" onClick={clickQRCode}>
                      QR Code
                </Button>
                    <Button className="secondary-button" onClick={() => removeItem()}>Archive Animal</Button> */}
                  </Space>
                </div>
                <h3 className="primary-text">
                  {" "}
                  <b className="primary-text-heading">Recent From Gallery</b>
                </h3>

                <Row gutter={10} justify="start">
                  {props.data.gallery &&
                    props.data.gallery
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .slice(0, 6)
                      .map((image, index) => (
                        <Col style={{ marginTop: "15px" }}>
                          {image.type.split("/")[0] === "video" && (
                            <div
                              onClick={() => openImageViewerGallery(index)}
                              style={{
                                overflow: "hidden",
                                width: 180,
                                height: 180,
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                backgroundColor: "#e9bcb7",
                                backgroundImage:
                                  "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)",
                              }}
                            >
                              <VideoThumbnail
                                videoUrl={image.filename}
                                snapshotAt={10}
                              />
                            </div>
                          )}
                          {image.type.split("/")[0] === "image" && (
                            <img
                              onClick={() => openImageViewerGallery(index)}
                              src={image.filename}
                              style={{ width: 180, height: 180 }}
                              alt="logo"
                            />
                          )}
                        </Col>
                      ))}
                </Row>
              </Col>
            </Row>

            <TransferModal
              animal={animal}
              refreshData={() => {
                console.log("getting data ");
                props.refreshData(props.data._id);
              }}
              setvisible={setTransferCodeModal}
              visible={TransferCodeModal}
            />

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

            {/* Share Link Modal */}
            <Modal
              visible={shareLinkModal}
              footer={null}
              // closable={false}
              onCancel={() => setShareLinkModal(false)}
              centered={true}
              width={545}
            // style={{width: 545}}
            >
              <div style={{ paddingRight: "20px" }}>
                <div
                  style={{ marginTop: 10, textAlign: "left", marginBottom: 20 }}
                >
                  <p>Link</p>
                  <Space>
                    <Input
                      ref={myRef}
                      style={{ width: 390 }}
                      disabled={true}
                      value={`${webAnimalUrl}${props.data._id}`}
                    />
                    <Button
                      onClick={() => copyLink(`${webAnimalUrl}${props.data._id}`)}
                    >
                      Copy Link
                  </Button>
                  </Space>
                </div>
                <FacebookShareButton
                  accessKey={
                    currUser.socialConnects &&
                    currUser.socialConnects.facebook.accessToken
                  }
                  url={`${webAnimalUrl}${props.data._id}`}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
            </Modal>

            <Modal
              visible={quantityModal}
              footer={null}
              closable={false}
              centered={true}
            >
              <div style={{ padding: "20px" }}>
                <Form
                  // form={form}
                  onFinish={submitQuantityValues}
                  onValuesChange={quantityChange}
                  initialValues={props.data}
                >
                  <Typography.Title level={3} strong>
                    {"Animal Quantities by Status"}
                  </Typography.Title>

                  {quantityError && (
                    <label>
                      <p
                        style={{
                          color: "#ff0000bf",
                          fontSize: "0.7rem",
                          border: "1px solid",
                          padding: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                        {quantityError}
                      </p>
                    </label>
                  )}

                  <Divider orientation="left" style={{ marginTop: 40 }}>
                    Total inventory
                </Divider>
                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={24}
                      lg={12}
                      style={{ marginTop: "10px", textAlign: "left" }}
                      className="secondary-text"
                    >
                      Alive
                  </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        initialValue={props.data.aliveQuantity}
                        name="aliveQuantity"
                        rules={[
                          {
                            required: true,
                            message: "Please enter alive quantity",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder={"Enter Quantity"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={24}
                      lg={12}
                      style={{ marginTop: "10px", textAlign: "left" }}
                      className="secondary-text fs-120"
                    >
                      Dead
                  </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        initialValue={props.data.deadQuantity}
                        name="deadQuantity"
                        rules={[
                          {
                            required: true,
                            message: "Please enter dead quantity",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder={"Enter Quantity"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left" style={{ marginTop: 40 }}>
                    Inventory by health
                </Divider>

                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={24}
                      lg={12}
                      style={{ marginTop: "10px", textAlign: "left" }}
                      className="secondary-text fs-120"
                    >
                      Healthy
                  </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        initialValue={props.data.healthyQuantity}
                        name="healthyQuantity"
                        rules={[
                          {
                            required: true,
                            message: "Please enter health quantity",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder={"Enter Quantity"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={24}
                      lg={12}
                      style={{ marginTop: "10px", textAlign: "left" }}
                      className="secondary-text fs-120"
                    >
                      Sick
                  </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        initialValue={props.data.sickQuantity}
                        name="sickQuantity"
                        rules={[
                          {
                            required: true,
                            message: "Please enter sick quantity",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder={"Enter Quantity"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-25px", marginTop: 25 }}>
                    <Col
                      xs={24}
                      lg={12}
                      style={{ marginTop: "10px", textAlign: "left" }}
                      className="secondary-text fs-120"
                    >
                      Pregnant
                  </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        initialValue={props.data.pregnantQuantity}
                        name="pregnantQuantity"
                        rules={[
                          {
                            required: true,
                            message: "Please enter pregnant quantity",
                          },
                        ]}
                      >
                        <InputNumber min={0} placeholder={"Enter Quantity"} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left" style={{ marginTop: 40 }}></Divider>

                  <Space style={{ marginTop: 10 }}>
                    <Button className="secondary-button" htmlType="submit">
                      Save
                  </Button>
                    <Button
                      className="secondary-button"
                      onClick={() => setQuantityModal(false)}
                    >
                      Cancel
                  </Button>
                  </Space>
                </Form>
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

      <Modal
        visible={breedTraitModalVisible}
        footer={null}
        closable={false}
        centered

      // onOk={handleOk}
      // onCancel={() => setBreedTraitModalVisible(false)}
      >
        <div>
          <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
            Update Breed and Traits
          </h3>
          <Form
            onFinish={onFinishBreedTraitModal}
            form={BreedTraitModalForm}
            initialValues={animal && animal.data}
            onValuesChange={onChangeBreedTraitModal}
          >
            <Form.Item
              name="breed"
              label="Breed"
              rules={[{ required: true, message: "Please select breed" }]}
            >
              <Select
                style={{ width: "70%" }}
                mode="multiple"
                // onChange={(status) => statusChange({ status: status })}
                placeholder="Select Breed"
                className="customSelect"
              >
                {currentForm &&
                  currentForm.categoryId.breeds.map((breed) => (
                    <Option value={breed.name}>{breed.name}</Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Trait"
              name="traits"
              rules={[{ required: true, message: "Please select trait" }]}
            >
              <Select
                style={{ width: "70%" }}
                mode="multiple"
                // onChange={(status) => statusChange({ status: status })}
                placeholder="Select Trait"
                className="customSelect"
              >
                {currentForm &&
                  currentForm.categoryId.traits
                    .filter((e) => animal.data.breed.includes(e.breed))
                    .map((breed) => (
                      <Option value={breed.name}>{breed.name}</Option>
                    ))}
              </Select>
            </Form.Item>
            <Space>
              <Button
                className="secondary-button"
                onClick={() => setBreedTraitModalVisible(false)}
              >
                Discard
              </Button>
              <Button className="secondary-button" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>

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
                  style={{ backgroundColor: "lightgray", cursor: "pointer" }}
                  onClick={() => setUploadingType("image")}
                >
                  <Typography.Title level={4}>Upload Image</Typography.Title>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  style={{ backgroundColor: "lightgray", cursor: "pointer" }}
                  onClick={() => setUploadingType("video")}
                >
                  <Typography.Title level={4}>Upload Video</Typography.Title>
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
    </>
  );
}

export default Profilepage;
