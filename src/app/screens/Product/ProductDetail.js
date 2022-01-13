import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Select, Space, message } from "antd";
import Input from "../../components/input/input";
import Allanimals from "../Animal/Allanimals";
import Button from "../../components/button/button";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { deleteProduct, getProductById } from "../../redux/actions/product_action";
import ImageDragger from "../../components/ImageDragger";
import { baseUrl } from "../../config/globalConfig";
import Card from '../../components/card/card'
const { Search } = Input;

const { Option } = Select;
const names = [
  "Category 1",
  "Category 2 1ve",
  "Category 3",
  "Category 5",
  "Category 7",
  "Category 8",
];

function ProductDetail(props) {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [visibleUploadingModal, setvisibleUploadingModal] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);
  const refreshData = () => {
    dispatch(EnableLoader());
    dispatch(getProductById(props.location.state.id)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setProduct(response.payload.data);
      }
    });
  }

  const onGalleryUploadSuccess = () => {
    refreshData();
    setvisibleUploadingModal(false);
  }


  const deleteProductClick = (id) => {
    console.log('in product');
    dispatch(EnableLoader())
    dispatch(deleteProduct(id)).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        // refreshData();
        message.success(response.payload.message);
        props.history.push('/product');
      }
    })

  }
  return product ? (
    <div>
      <Row>
        <Col xs={0} xl={12}></Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Space>
            <Link to={`/product/register/${product._id}/${product.categoryId}`}>
              <Button className="secondary-button">Edit</Button>
            </Link>
            <Button className="secondary-button" onClick={() => deleteProductClick(product._id)}>Remove</Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col span={10}>
          {product.image && (
            <a href={product.image} target="_blank">
              <img
                className="textAlign-sm-box"
                style={{ width: 400, height: 300 }}
                src={product.image}
                alt="Logo"
              />
            </a>

          )}
          <Row gutter={10}>
            {product.gallery &&
              product.gallery.map((image) => (
                <Col span={6}>
                  <br />
                  <div >
                    <a href={image.filename} target="_blank">
                      <img
                        className="textAlign-sm-box"
                        style={{ width: "100%" }}
                        src={image.filename}
                        alt="Logo"
                      />
                    </a>
                  </div>
                </Col>
              ))}
            <Col span={6}>
              <br />
              <div
                style={{
                  width: "100%",
                  height: 110,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center", border: "1px solid purple",
                  borderRadius: 10
                }}
                onClick={() => setvisibleUploadingModal(true)}
              >
                <PlusOutlined
                  style={{
                    background: "var(--primary-color)",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>

        {/* <Col span={2}></Col> */}
        <Col span={14}>
          {product.data?.name && (
            <>
              <h2 className="primary-text primary-text-heading">
                {product.data.name}
              </h2>
              <br />
              <br />
            </>
          )}
          {product.data?.price && (
            <>
              <b className="primary-text fs-150">$ {product.data.price} USD</b>
              <br />
            </>
          )}
          {product.data?.model && (
            <div className="">Model No/ SKU: {product.data.model}</div>
          )}

          {product.data?.quantity && (
            <div className="">Quantity: {product.data.quantity}</div>
          )}

          <Space>
            <div className="secondary-text fs-120">Availability:</div>
            <div className="fs-120">{product.inventoryStatus}</div>
          </Space>
          <br />
          <Space>
            <div className="secondary-text fs-120">Category:</div>
            <div className="fs-120">{product.categoryName}</div>
          </Space>
          {product.data?.description && (
            <>
              <div className="secondary-text fs-120">Description:</div>
              <div>{product.data.description}</div>
            </>
          )}
        </Col>
      </Row>
      <ImageDragger {...{ multiple: true, data: { action: `${baseUrl}/product/gallery/upload`, name: 'file', body: { id: product._id } }, visible: visibleUploadingModal, onSuccess: onGalleryUploadSuccess, close: () => setvisibleUploadingModal(false) }} />
    </div>
  ) : null;
}

export default ProductDetail;
