import React, { Component } from "react";
//import { UserOutlined } from '@ant-design/icons';
import { Input, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Row, Col, Form, Select, Space, Modal, Upload } from "antd";
import Cookies from "universal-cookie";
import ImgCrop from "antd-img-crop";

const { Dragger } = Upload;
const cookies = new Cookies();
const auth = localStorage.getItem('w_auth');

function ImageDragger(props) {
  console.log(props);
  const draggerProps = {
    name: props.data.name,
    multiple: props.multiple,
    action: props.data.action,
    headers: {
      auth,
    },
    data: props.data.body,

    // accept: "application/pdf",
    onChange(info) {
      const { status } = info.file;
      console.log(info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        // setvisibleUploadingModal(false);
        props.onSuccess();
        // props.refreshData();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onCancel={() => props.close()}
    >
      <ImgCrop aspect={props.ratio} modalWidth={'70%'}>
        <Dragger
          style={{ marginTop: 20 }}
          showUploadList={false}
          {...draggerProps}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Support for uploading Images only</p>
        </Dragger>
      </ImgCrop>
    </Modal>
  );
}

export default ImageDragger;
