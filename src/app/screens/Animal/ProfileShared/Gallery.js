import React, { useCallback, useEffect, useState } from "react";
import {
  Row,
  Col,
} from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import ImgViewer from "../../../components/ImageViewer/Lightbox";
import VideoThumbnail from 'simple-react-video-thumbnail'
import './profile.scss'

const auth = localStorage.getItem("w_auth");

function Gallery(props) {
  const [] = useState("");

  const [deleteList, setDeleteList] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [allImages, setAllImages] = useState(
    props.data.gallery.map((i) => i.filename)
  );
  const [, setCurrentImageForShare] = useState(null);


  useEffect(() => {
    console.log(deleteList[0]);
    setCurrentImageForShare(
      deleteList[0]
        ? props.data.gallery.filter((e) => e._id === deleteList[0])[0].filename
        : null
    );
  }, [deleteList.join(",")]);



  const openImageViewer = useCallback((image) => {
    setAllImages(props.data.gallery.map((i) => i.filename));
    setCurrentImage(image);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {isViewerOpen ? (
        <div>
          <ImgViewer
            data={props.data.gallery.map((i) => ({ url: i.filename, type: i.type.split('/')[0] === 'video' ? 'video' : 'photo' }))}
            startIndex={currentImage}
            onCloseCallback={closeImageViewer}
          />
        </div>
      ) :
        (
          <div>
            <h2 className="heading-top smallCenter PrimaryWhiteSmall">Gallery</h2>
            <br />
            {props.data.gallery ? (
              <div className="smallGallery">
                <Row gutter={10}>
                  {props.data.gallery.map((i, index) => (
                    <Col
                      xs={12}
                      sm={12}
                      lg={8}
                      xl={6}
                      xxl={4}
                      style={{ marginTop: "20px" }}
                      className="textAlign-md-box" className="smallCenter"
                    >
                      {i.type.split("/")[0] === "video" && (
                        <div style={{ alignItems: 'center', justifyContent: 'center', }}>
                          <div onClick={() => openImageViewer(index)} style={{ zIndex: 1, overflow: 'hidden', width: 210, height: 210, alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: "#e9bcb7", backgroundImage: 'linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)' }}
                            className="smallImgs">
                            <VideoThumbnail style={{ pointerEvents: 'none', }} videoUrl={i.filename} snapshotAt={10} />
                          </div>
                          <div className="smallhide">
                            Uploaded on:{" "}
                            {moment(i.createdAt).format("DD MMM, YYYY")}
                          </div>
                        </div>
                      )}

                      {i.type.split("/")[0] === "image" && (
                        <div style={{ zIndex: 1, }} >
                          <img className="smallImgs"
                            onClick={() => openImageViewer(index)}
                            src={i.filename} style={{ width: 210, height: 210, borderRadius: 20 }}
                            alt="logo"
                          />
                          <div className="smallhide">

                            Uploaded on:{" "}
                            {moment(i.createdAt).format("DD MMM, YYYY")}
                          </div>
                        </div>
                      )}
                    </Col>
                  ))}
                </Row>
              </div>
            ) : null}

            <div style={{ marginTop: 15 }}></div>

          </div>

        )
      }

    </>
  );
}

export default Gallery;
