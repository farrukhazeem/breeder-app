import React, { useCallback, useState } from "react";
import { Row, Col, Space, Modal, Upload, message, Form, Input } from "antd";
import { FilePdfFilled } from "@ant-design/icons";
import moment from "moment";
import Card from "../../../components/card/card";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import { InboxOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import FileDownload from "js-file-download";
import PDFViewer from "pdf-viewer-reactjs";
import ImgViewer from "../../../components/ImageViewer";

import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import {
  deleteHealthRecordOfAnimal,
  getHealthRecord, addHealthRecordOfAnimal
} from "../../../redux/actions/animal_action";
import { baseUrl } from "../../../config/globalConfig";
const cookies = new Cookies();
const auth = cookies.get("w_auth");

const { Dragger } = Upload;
const names = ["Total", "Alive", "Sick"];
function HealthRecord(props) {
  const [form] = Form.useForm();
  const [visibleUploadingModal, setVisibleUploadingModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [visibleViewRecordModal, setVisibleViewRecordModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const dispatch = useDispatch();
  const uploadHealthRecord = () => {
    setVisibleUploadingModal(true);
  };
  const handleOk = () => {
    setVisibleUploadingModal(false);
  };
  const handleCancel = () => {
    setVisibleUploadingModal(false);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const openImageViewer = useCallback((image) => {
    setCurrentImage(image);
    setIsViewerOpen(true);
  }, []);

  const draggerProps = {
    name: "file",
    multiple: false,
    action: `${baseUrl}/animal/healthrecord/upload`,
    headers: {
      auth,
    },
    data: {
      id: props.data._id,
    },

    beforeUpload(file) {
      const valid =
        file.type === "application/pdf" || file.type.split("/")[0] === "image";
      if (!valid) {
        message.error("Only PDF and images are allowed!");
        return false;
      } else {
        return true;
      }
      // console.log(file);
    },
    onChange(info) {
      const { status } = info.file;
      console.log(info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setVisibleUploadingModal(false);
        props.refreshData(props.data._id);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const removeRecord = (recordId) => {

    const onOkCancel = () => {
      dispatch(EnableLoader());
      dispatch(deleteHealthRecordOfAnimal(props.data._id, recordId)).then(
        (response) => {
          dispatch(DisableLoader());
          console.log(response);
          if (response.payload.status === 200) {
            message.success(response.payload.message);
            props.refreshData(props.data._id);
          } else {
            message.error(response.payload.message);
          }
        }
      );
    }

    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCancel
    });

  };

  // const updateData = (id) => {
  //   dispatch(EnableLoader());

  //   dispatch(getHealthRecord(id)).then(response => {
  //     dispatch(DisableLoader());
  //     console.log(response);
  //     if(response.payload.status === 200) {

  //     }
  //   });
  // }

  // const fileChange = (event) => {
  //   console.log('file change event');
  //   console.log(event);
  // }
  const downloadFileData = (file, type) => {
    // console.log('called');
    // FileDownload(file, 'file.pdf')
    setSelectedDocument(file);
    if (type === "application/pdf") {
      setVisibleViewRecordModal(true);
    } else if (type.split("/")[0] === "image") {
      openImageViewer(file);
    }
  };


  const [image, setimage] = useState({});
  const [finishClicked, setFinishClicked] = useState(false);
  const handleChange = (event) => {
    setimage({ file: event.target.files[0] });
  };

  const onFinish = (values) => {
    console.log(values)
    if (!image.file) {
      return message.error("Kindly select document");
    }
    let formdata = new FormData();
    formdata.append("id", props.data._id);
    if (image.file) {
      formdata.append("file", image.file, image.file.name);
    }
    for (var key in values) {
      formdata.append(key, values[key]);
    }

    dispatch(addHealthRecordOfAnimal(formdata)).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        form.resetFields(); setVisibleUploadingModal(false);
        message.success(response.payload.message);
        props.refreshData(props.data._id);
      } else {
        message.error(response.payload.message);
      }
    });

  }

  return (
    <div>
      <div style={{ float: "right" }}>
        <Button onClick={uploadHealthRecord}>Upload Document</Button>
      </div>
      <br />
      <h2 className="heading-top"> Health Records</h2>

      {props.data.healthRecord
        ? props.data.healthRecord.map((record) => (
          <Card style={{ marginTop: "10px" }}>
            <Row>
              <Col xs={24} lg={4} className="textAlign-md-box">
                <Space>
                  <img
                    class="imgleft"
                    width={30}
                    height={50}
                    style={{ marginTop: "auto" }}
                    src={
                      !(
                        record.filename.substring(
                          record.filename.lastIndexOf(".") + 1,
                          record.filename.length
                        ) === "pdf"
                      )
                        ? record.filename
                        : require(`../../../../assets/images/PDF@2x.png`)
                    }
                    alt="logo"
                  />
                  <b>
                    {record.fileNamed ?
                      record.fileNamed
                      :
                      record.filename
                        .substring(
                          record.filename.lastIndexOf("/") + 1,
                          record.filename.length
                        )
                        .split("-")[1].substring(0, 17)
                    }
                  </b>
                </Space>
              </Col>

              <Col
                xs={24}
                lg={8}
                className="textAlign-md-box"
                style={{ marginTop: "-10px" }}
              >
                <Space direction="vertical">
                  <div>
                    <div className="secondary-text fs-120">Note: </div>
                    <div className="primary-text fs-80">
                      <b style={{ wordBreak: "break-all" }}>{record.note}</b>
                    </div>
                  </div>
                </Space>
              </Col>

              <Col
                xs={24}
                lg={4}
                className="textAlign-md-box"
                style={{ marginTop: "-10px" }}
              >
                <Space direction="vertical">
                  <div className="secondary-text fs-120">
                    Uploaded On:
                      <div className="primary-text fs-80">
                      {" "}
                      <b className="primary-text fs-80">{moment(record.createdAt).format(
                        "DD MMM, YYYY   HH:mm:ss"
                      )}
                      </b>
                    </div>
                  </div>
                </Space>
              </Col>

              <Col
                xs={24}
                lg={4}
                className="textAlign-md-box"
                style={{ marginTop: "-10px" }}
              >
                <Space direction="vertical">
                  <div className="secondary-text fs-120">Uploaded by: </div>
                  <div className="primary-text fs-80">
                    {" "}
                    <b>{record.addedBy.name}</b>
                  </div>
                </Space>
              </Col>

              <Col
                xs={24}
                md={4}
                className="textAlign-md-box textAlign-md-right"
              >
                <Space>
                  <a className="secondary-text" target="_blank" href={record.filename} >View</a>

                  {/* <Link
                    onClick={() =>
                      downloadFileData(record.filename, record.type)
                    }
                    className="secondary-text"
                  >
                    Download


                  </Link> */}
                  <div className="secondary-text">|</div>
                  <Link
                    onClick={() => removeRecord(record._id)}
                    className="secondary-text"
                  >
                    Remove
                    </Link>
                </Space>
              </Col>
            </Row>
          </Card>
        ))
        : null}

      <Modal
        title="Basic Modal"
        visible={visibleUploadingModal}
        onOk={handleOk} footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>

          {image.file ?
            <img
              src={image.file.type !== "application/pdf" ? URL.createObjectURL(image.file) :
                require("../../../../assets/images/PDF@2x.png")}
              style={{ borderRadius: "45px", width: 70, height: 70 }}
              alt="logo"
            />
            : null
          }

          <Form.Item
            name="file3"
            className="emp-input-custom"
          // rules={(user && user.image) ? [] : [{ required: true, message: "Please enter image!" }]}
          >
            <span>
              <a className="primary-text" style={{ cursor: "pointer" }}>
                Upload Document
                </a>
              <Input
                id="image"
                type="file" accept="application/pdf,image/*"
                onChange={(e) => handleChange(e)}
              ></Input>
            </span>
          </Form.Item>

          <div className="primary-text fs-120 textAlign-sm-modalleft">File Name:</div>
          <Form.Item
            validateTrigger={finishClicked ? "onChange" : "onSubmit"}
            name="fileNamed" validateFirst="true" placeholder="File Name"
            rules={[
              { required: true, message: "Please enter File Name!" },
              { max: 15, message: "Maximum 15 characters are allowed!" },
            ]}
          >
            <Input placeholder="Please enter File Name!" style={{ width: "90%" }} className="textAlign-sm-marginLeft customInput"></Input>
          </Form.Item>


          <div className="primary-text fs-120 textAlign-sm-modalleft">Note:</div>
          <Form.Item
            validateTrigger={finishClicked ? "onChange" : "onSubmit"}
            name="note" validateFirst="true" placeholder="Note"
            rules={[
              { required: true, message: "Please enter Note!" },
              { max: 60, message: "Maximum 50 characters are allowed!" },
            ]}
          >
            <Input placeholder="Please enter Note!" style={{ width: "90%" }} className="textAlign-sm-marginLeft customInput"></Input>
          </Form.Item>
          <Button
            htmlType="submit"
            onClick={() => setFinishClicked(true)}
            className="secondary-button"
          >
            Submit
          </Button>

        </Form>
        {/* <Dragger showUploadList={false} style={{ marginTop: 20 }} {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for uploading only PDF document
          </p>
        </Dragger> */}
      </Modal>

      {/* <Modal
        title="Basic Modal"
        visible={visibleViewRecordModal}
        footer={null}
        closable={false}
        centered
        width={"80%"}
      >
        <Space>

          <Button className="secondary-button">
            <a download href={selectedDocument} target="_blank">Download</a>
          </Button>
          <Button
            className="secondary-button"
            onClick={() => setVisibleViewRecordModal(false)}
          >
            Cancel
          </Button>
        </Space>
        <PDFViewer
          navbarOnTop={true}
          document={{
            url: selectedDocument,
          }}
        />
      </Modal> */}
      {isViewerOpen && (
        <ImgViewer
          src={[currentImage]}
          //   currentIndex={  }
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default HealthRecord;
