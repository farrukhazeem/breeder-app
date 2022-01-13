import React, { useCallback, useState } from "react";
import { Row, Col, Space, Modal, Upload, message } from "antd";
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
  getHealthRecord,
} from "../../../redux/actions/animal_action";
import { baseUrl } from "../../../config/globalConfig";
const cookies = new Cookies();
const auth = cookies.get("w_auth");

const { Dragger } = Upload;
const names = ["Total", "Alive", "Sick"];
function HealthRecord(props) {
  const [visibleUploadingModal, setVisibleUploadingModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const dispatch = useDispatch();


  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const openImageViewer = useCallback((image) => {
    setCurrentImage(image);
    setIsViewerOpen(true);
  }, []);




  return (
    <div>
      <br />
      <h2 className="heading-top smallCenter PrimaryWhiteSmall"> Health Records</h2>

      {props.data.healthRecord
        ? props.data.healthRecord.map((record) => (
          <Card style={{ marginTop: "10px", marginLeft: "5px", marginRight: "5px" }}>
            <Row>
              <Col xs={24} lg={4} className="textAlign-md-box">
                <Space>
                  <img
                    class="imgleft"
                    style={{ marginTop: "auto", width: 50, height: 50, borderRadius: 10 }}
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
                    {
                      record.fileNamed ?
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
                      <b>{record.note}</b>
                      {/* <b>{Math.round(record.size / 1024)} kb</b> */}
                    </div>
                  </div>
                </Space>
              </Col>

              <Col
                xs={12}
                lg={4}
                className="textAlign-md-box"
                style={{ marginTop: "-10px" }}
              >
                <Space direction="vertical" className="smallhide">
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
                xs={12}
                lg={4}
                className="textAlign-md-box"
                style={{ marginTop: "-10px" }}
              >
                <Space direction="vertical" className="smallhide">
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

                </Space>
              </Col>
            </Row>
          </Card>
        ))
        : null}

      <div style={{ marginTop: 5 }}></div>

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
