import {
  Col,
  Divider,
  Empty,
  message,
  Modal,
  Row,
  Space,
  List,
  Form,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import Input from "../../../../components/input/input";
import {
  createCategory,
  deleteCategory,
  getCategoriesByType,
  updateCategory,
  updateCategoryById,
} from "../../../../redux/actions/category_action";
import {
  DisableLoader,
  EnableLoader,
} from "../../../../redux/actions/loader_action";
import moment from "moment";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { CSVReader } from "react-papaparse";

import fieldValidation from "../../../../validations/fieldValidation";
import ImgCrop from "antd-img-crop";

const { Title, Text } = Typography;
const buttonRef = React.createRef();

export default function CreateCategory(props) {
  if (window.location.pathname === "/admin/category/edit") {
    if (!props.location.state.data) {
      props.history.push("/admin/category");
    }
  }

  const { data } = props.location.state;

  console.log("-->>", data);

  const [breedsForm] = Form.useForm();
  const [trendsForm] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [iconForm] = Form.useForm();

  const [breeds, setBreeds] = useState(props.location.state.type === "animal" && data ? data.breeds : data && data.subCategories ? data.subCategories : []);
  const [traits, setTraits] = useState(data ? (data.traits ? data.traits : []) : []
  );
  const [subCategories, setsubCategories] = useState(
    data ? (data.subCategories ? data.subCategories : []) : []
  );
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addBreedModal, setAddBreedModal] = useState(false);
  const [addTrendModal, setAddTredModal] = useState(false);
  const [categoryName, setCategoryName] = useState(data ? data.name : null);
  const [categoryNameError, setCategoryNameError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();


  useEffect(() => {
    // setBreeds()
    console.log('calling use effect for breed and traits');
    setBreeds(breeds.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    }));
    setTraits(traits.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }));

  }, [breeds, traits])

  useEffect(() => {
    if (data) {
      console.log(categoryName);
      setCategoryName(data.name);
    }
  }, []);

  const onFinishBreedForm = (data) => {
    if (selectedItem) {
      if (data.name === selectedItem.name) {
        setAddBreedModal(false);

        setSelectedItem(null);
        setSelectedItemType(null);
        breedsForm.resetFields()
        return true;
      } else {
        if (breeds.filter(e => e.name === data.name)[0]) return message.warning('Breed is already available.');
        setBreeds([
          ...breeds.filter(e => !(e.name === selectedItem.name)),
          { name: data.name, value: fieldValidation.getName(data.name) },
        ]);
        setAddBreedModal(false);

        setSelectedItem(null);
        setSelectedItemType(null);
        breedsForm.resetFields()
        return true;
      }
    } else {
      if (breeds.filter(e => e.name === data.name)[0]) return message.warning('Breed is already available.');
      setBreeds([
        ...breeds,
        { name: data.name, value: fieldValidation.getName(data.name) },
      ]);
      setAddBreedModal(false);
      breedsForm.resetFields()
      console.log(data);
      console.log(fieldValidation.getName(data.name));
    }
  };

  const onFinishGeneAndTraitForm = (data) => {


    if (selectedItem) {
      if (data.name === selectedItem.name) {
        setAddTredModal(false);

        setSelectedItem(null);
        setSelectedItemType(null);
        breedsForm.resetFields()
        return true;
      } else {
        if (traits.filter(e => e.name === data.name)[0]) return message.warning('Gene and Trait is already available.');
        console.log('in else ', selectedItem)
        console.log(data);
        setTraits([
          ...traits.filter(e => !(e.name === selectedItem.name)),
          {
            name: data.name,
            value: fieldValidation.getName(data.name),
            breed: selectedBreed.name,
          },
        ]);
        setAddTredModal(false);

        setSelectedItem(null);
        setSelectedItemType(null);
        breedsForm.resetFields()
        return true;
      }
    } else {
      if (traits.filter(e => e.name === data.name)[0]) return message.warning('Gene and Trait is already available.');

      setTraits([
        ...traits,
        {
          name: data.name,
          value: fieldValidation.getName(data.name),
          breed: selectedBreed.name,
        },
      ]);
      setAddTredModal(false);
      breedsForm.resetFields()
      console.log(data);
      console.log(fieldValidation.getName(data.name));
    }


  };

  const addBreedsModalRenderer = () => {
    breedsForm.setFieldsValue(selectedItem);
    return (
      <Modal
        visible={addBreedModal}
        onCancel={() => setAddBreedModal(false)}
        footer={null}
        closable={false}
        centered={true}
      >
        <Form
          onFinish={onFinishBreedForm}
          form={breedsForm}

          initialValues={selectedItem ? {
            name: selectedItem.name,
          } : {}}
        >
          <Title level={3} strong>
            Create
          </Title>
          <div className="primary-text fs-120 textAlign-sm-modalleft">
            {props.location.state.type === "animal" ? "Breed name" : "Sub Category Name"} :
          </div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
              {
                pattern: new RegExp(/^[a-zA-Z ]+$/i),
                message: "only characters are allowed"
              },
              {
                pattern: new RegExp(/^[a-zA-Z ]{2,35}$/i),
                message: "must be less than 35 characters"
              },
            ]}
          >
            <Input
              autoComplete={"off"}
              style={{ width: "85%" }}
              placeholder="Input Breed name"
              className=" customInput"
            />
          </Form.Item>

          <Space>
            <Button
              className="secondary-button"
              onClick={() => { setAddBreedModal(false); setSelectedItem(null); setSelectedItemType(null); }}
            >
              Discard
            </Button>
            <Button className="secondary-button" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form>
      </Modal>
    );
  };

  const addGeneAndTraitModalRenderer = () => {
    breedsForm.setFieldsValue(selectedItem);
    return (
      <Modal
        visible={addTrendModal}
        onCancel={() => setAddTredModal(false)}
        footer={null}
        closable={false}
        centered={true}
      >
        <Form
          onFinish={onFinishGeneAndTraitForm}
          form={breedsForm}
          //   initialValues={{
          //     name: data ? data.name: null,
          //   }}
          initialValues={selectedItem ? {
            name: selectedItem.name,
          } : {}}
        >
          <Title level={3} strong>
            Add Genes and Traits
          </Title>
          <div className="primary-text fs-120 textAlign-sm-modalleft">
            Gene and Trait name:
          </div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
              {
                pattern: new RegExp(/^[a-zA-Z ]+$/i),
                message: "only characters are allowed"
              },
            ]}
          >
            <Input
              autoComplete={"off"}
              style={{ width: "85%" }}
              placeholder="Input Gene and Trait name"
              className=" customInput"
            />
          </Form.Item>

          <Space>
            <Button
              className="secondary-button"
              onClick={() => { setAddTredModal(false); setSelectedItem(null); setSelectedItemType(null); }}
            >
              Discard
            </Button>
            <Button className="secondary-button" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form>
      </Modal>
    );
  };

  const saveData = () => {
    if (categoryForm.getFieldError("name")[0]) return false;
    delete data.icon;
    const resultData = {
      ...data,
      name: categoryForm.getFieldValue("name"),
      ...(props.location.state.type === "animal") ? { breeds: breeds, traits: traits } : { subCategories: breeds },
    };

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(resultData));
    if (image) {
      formdata.append("file", image.file, image.file.name);
    }
    dispatch(EnableLoader());
    dispatch(updateCategoryById(data._id, formdata)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        props.history.push("/admin/category");
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const addCategory = () => {
    if (!categoryForm.getFieldValue("name")) {
      categoryForm.validateFields();
      iconForm.validateFields();
      return false;
    }
    // console.log(image);
    // if (!image) {
    //   iconForm.validateFields();
    //   return false;
    // }
    console.log(categoryForm.getFieldValue("name"));
    console.log("save data");
    const formdata = new FormData();
    formdata.append("name", categoryForm.getFieldValue("name"));
    if (image) {
      formdata.append("file", image.file, image.file.name);
    }
    formdata.append("type", props.location.state.type);

    if (props.location.state.type === "animal") {
      formdata.append("breeds", JSON.stringify(breeds));
      formdata.append("traits", JSON.stringify(traits));
    } else if (props.location.state.type === "product") {
      formdata.append("subCategories", JSON.stringify(breeds));
      //formdata.append("subCategories", JSON.stringify(subCategories));
    }

    dispatch(EnableLoader());
    dispatch(createCategory(formdata)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status) {
        message.success(response.payload.message);
        props.history.push("/admin/category");
      } else {
        message.error(response.payload.message);
      }
    });
  };

  // const uploadChange  = (ev) => {
  //   console.log(ev);
  // }

  // const onUploadPreview = (ev) => {
  //   console.log(ev);
  // }

  const parseCSVData = (data) => {
    let arr = data
      .map((e) => e.data)
      .flat(1)
      .filter((e) => e);
    return arr
      .slice(1, arr.length)
      .map((e) => ({ name: e, value: fieldValidation.getName(e) }));
  };

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data, file, type) => {
    const format = file.name.split(".");
    if (!(format[format.length - 1] === "csv")) {
      message.error("Only CSV file is allowed!");
      return;
    }
    console.log(file.name.split("."));
    console.log("---------------------------");
    console.log(data);
    console.log(data[0].data[0].toLowerCase());
    if (
      !(data[0].data[0].toLowerCase().replace(/\s/g, '') === type.toLowerCase())
    ) {
      message.error(`Column Should be ${type}!`);
      return;
    }

    let parsedData = parseCSVData(data);
    if (type === "traits") {
      parsedData = parsedData.map((e) => ({ ...e, breed: selectedBreed.name }));
      setTraits([...traits, ...parsedData]);
    } else if (type === "breeds") {
      setBreeds([...breeds, ...parsedData]);
    } else if (type === "subCategories") {
      setsubCategories([...subCategories, ...parsedData]);
    }
    message.success("Uploaded Successfully!");
    return;

    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const removeItem = (item, type) => {
    if (type === "traits") {
      setTraits(traits.filter((e) => !(e.name === item.name)));
    } else if (type === "breeds") {
      setBreeds(breeds.filter((e) => !(e.name === item.name)));
      setTraits(traits.filter((e) => !(e.breed === item.name)));
      setSelectedBreed(null);
    }
  };

  const editItem = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
    if (type === "traits") {
      setAddTredModal(true);
    } else if (type === "breeds") {
      setAddBreedModal(true);
      // setBreeds(breeds.filter((e) => !(e.name === item.name)));
      // setTraits(traits.filter((e) => !(e.breed === item.name)));
      // setSelectedBreed(null);
    }
  }

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      if (!(event.target.files[0].type.split("/")[0] === "image")) {
        message.error("Only image is allowed!");
        return false;
      } else {
        setImage({ file: event.target.files[0] });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col xs={24} md={8} className="">
          <h2 className="primary-text primary-text-heading">
            Create new Category
          </h2>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }} className=""></Col>

        <Col xs={24} md={8} className="textAlign-md-box-layer">
          <Space style={{ float: "right" }}>
            <div>
              <Button className="secondary-button">
                <Link to={"/admin/category"}>Discard</Link>
              </Button>
            </div>
            {window.location.pathname === "/admin/category/edit" ? (
              <div>
                <Button className="secondary-button" onClick={saveData}>
                  Save
                </Button>
              </div>
            ) : (
                <div>
                  <Button className="secondary-button" onClick={addCategory}>
                    Create
                </Button>
                </div>
              )}
          </Space>
        </Col>
      </Row>
      <br />
      <br />
      <Card>
        <Row style={{}}>
          <Col span={4} className="">
            <Space>
              <Form form={iconForm}>
                <Form.Item
                  name="icon"
                  className="emp-input-custom"
                // rules={
                //   (data && data.icon) || (image && image.file)
                //     ? []
                //     : [{ required: true, message: "Please enter icon!" }]
                // }
                >
                  {
                    <span>
                      <a className="primary-text" style={{ cursor: "pointer" }}>
                        <div>
                          {image && image.file ? (
                            <img
                              src={URL.createObjectURL(image.file)}
                              style={{ borderRadius: "45px", width: 70, height: 70 }}
                              alt="logo"
                            />
                          ) : data && data.icon && data.icon.split("/").pop() !== "null" ? (
                            <img
                              src={data.icon}
                              style={{ borderRadius: "45px", width: 70, height: 70 }}
                              alt="logo"
                            />
                          ) : (
                                <img
                                  src={require("../../../../../assets/images/avatar.png")}
                                  style={{ borderRadius: "45px", width: 70, height: 70 }}
                                  width={"70"}
                                  height={"70"}
                                  alt="logo"
                                />
                              )}
                        </div>
                      </a>
                      {/* <ImgCrop rotate> */}
                      <Input
                        id="image"
                        type="file"
                        onChange={(e) => handleChange(e)}
                      ></Input>
                      {/* </ImgCrop> */}
                    </span>
                  }

                  {/* <Upload {...props}>
                            <u className="primary-text" style={{ cursor: 'pointer', fontWeight: "bold" }}>Upload new picture</u>
                        </Upload> */}
                </Form.Item>
              </Form>
            </Space>
          </Col>
          <Col span={8} className="" style={{ display: "flex" }}>
            <Space>
              <h2 className="primary-text fw-100">Name</h2>
              <Form form={categoryForm} initialValues={{ name: categoryName }}>
                <Form.Item
                  style={{ margin: "auto" }}
                  // validateStatus={categoryNameError ? 'error' : ''}
                  // help={categoryNameError}
                  name="name"
                  rules={[
                    { required: true, message: "Please input category name!", },
                    {
                      pattern: new RegExp(/^[a-zA-Z ]+$/i),
                      message: "only characters are allowed"
                    },
                    {
                      pattern: new RegExp(/^[a-zA-Z ]{2,35}$/i),
                      message: "must be less than 35 characters"
                    },
                  ]}
                >
                  <Input placeholder="Enter Category name" />
                </Form.Item>
              </Form>
            </Space>
          </Col>
          <Col
            span={8}
            className="textAlign-md-box-layer"
            style={{ display: "flex" }}
          >
            <Space style={{ float: "right" }}>
              <h2 className="primary-text fw-100">Type</h2>

              <Input
                disabled={true}
                value={
                  props.location.state.type === "animal" ? "Animal" : "Product"
                }
                placeholder="Enter Sub Category name"
              />
            </Space>
          </Col>
          <Col span={4} className=""></Col>
        </Row>
      </Card>

      {props.location.state.type === "animal" ? (
        <Row style={{ marginTop: 10 }} gutter={10}>
          <Col span={12}>
            <Card
              title={"Breeds"}
              extra={
                <div>
                  <Space>
                    <CSVReader
                      ref={buttonRef}
                      onFileLoad={(data, file) =>
                        handleOnFileLoad(data, file, "breeds")
                      }
                      noProgressBar
                      onError={handleOnError}
                      noClick
                      noDrag
                      onRemoveFile={handleOnRemoveFile}
                    >
                      {({ file }) => (
                        <aside
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            // marginBottom: 10,
                          }}
                        >
                          <Button
                            style={{ height: 34 }}
                            onClick={handleOpenDialog}
                          >
                            Upload
                          </Button>{" "}
                        </aside>
                      )}
                    </CSVReader>

                    <Button
                      style={{ height: 34 }}
                      onClick={() => setAddBreedModal(true)}
                    >
                      Add
                    </Button>
                  </Space>
                </div>
              }
            >
              <List
                size="large"
                dataSource={breeds}
                renderItem={(item) => (
                  <List.Item style={{ cursor: "pointer" }}>
                    <div
                      style={
                        selectedBreed && selectedBreed.value === item.value
                          ? {
                            fontWeight: "bold",
                            justifyContent: "space-between",
                            display: "flex", fontSize: 18,
                            width: "100%",
                          }
                          : {
                            justifyContent: "space-between",
                            display: "flex", fontSize: 18,
                            width: "100%",
                          }
                      }
                    >
                      <Text onClick={() => setSelectedBreed(item)}>
                        {item.name}
                      </Text>
                      {/* <DeleteOutlined
                        onClick={() => removeItem(item, "breeds")}
                        style={{ marginTop: 4 }}
                      /> */}
                      <EditOutlined
                        onClick={() => editItem(item, "breeds")}
                        style={{ marginTop: 4 }}
                      />
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={`Genes & Traits  - ${
                selectedBreed ? selectedBreed.name : ""
                }`}
              extra={
                selectedBreed ? (
                  <div>
                    <Space>
                      <CSVReader
                        ref={buttonRef}
                        onFileLoad={(data, file) =>
                          handleOnFileLoad(data, file, "traits")
                        }
                        noProgressBar
                        onError={handleOnError}
                        noClick
                        noDrag
                        onRemoveFile={handleOnRemoveFile}
                      >
                        {({ file }) => (
                          <aside
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              // marginBottom: 10,
                            }}
                          >
                            <Button
                              style={{ height: 34 }}
                              onClick={handleOpenDialog}
                            >
                              Upload
                            </Button>{" "}
                          </aside>
                        )}
                      </CSVReader>
                      <Button
                        style={{ height: 34 }}
                        onClick={() => setAddTredModal(true)}
                      >
                        Add
                      </Button>
                    </Space>
                  </div>
                ) : null
              }
            >
              <List
                size="large"
                dataSource={
                  selectedBreed
                    ? traits.filter((e) => e.breed === selectedBreed.name)
                    : []
                }
                renderItem={(item) => (
                  <List.Item>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex", fontSize: 18,
                        width: "100%",
                      }}
                    >
                      <Text>{item.name}</Text>
                      {/* <DeleteOutlined
                        onClick={() => removeItem(item, "traits")}
                        style={{ marginTop: 4 }}
                      /> */}
                      <EditOutlined
                        onClick={() => editItem(item, "traits")}
                        style={{ marginTop: 4 }}
                      />
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      ) : (
          <Row style={{ marginTop: 10 }} gutter={10}>
            <Col span={12}>
              <Card
                title={"Sub Categories"}
                extra={
                  <div>
                    <Space>
                      <CSVReader
                        ref={buttonRef}
                        onFileLoad={(data, file) =>
                          handleOnFileLoad(data, file, "subCategories")
                        }
                        noProgressBar
                        onError={handleOnError}
                        noClick
                        noDrag
                        onRemoveFile={handleOnRemoveFile}
                      >
                        {({ file }) => (
                          <aside
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              // marginBottom: 10,
                            }}
                          >
                            <Button
                              style={{ height: 34 }}
                              onClick={handleOpenDialog}
                            >
                              Upload
                          </Button>{" "}
                          </aside>
                        )}
                      </CSVReader>

                      <Button
                        style={{ height: 34 }}
                        onClick={() => setAddBreedModal(true)}
                      >
                        Add
                    </Button>
                    </Space>
                  </div>
                }
              >
                <List
                  size="large"
                  dataSource={breeds}
                  renderItem={(item) => (
                    <List.Item style={{ cursor: "pointer" }}>
                      <div
                        style={
                          selectedBreed && selectedBreed.value === item.value
                            ? {
                              //fontWeight: "bold",
                              justifyContent: "space-between",
                              display: "flex", fontSize: 18,
                              width: "100%",
                            }
                            : {
                              justifyContent: "space-between",
                              display: "flex", fontSize: 18,
                              width: "100%",
                            }
                        }
                      >
                        <Text onClick={() => setSelectedBreed(item)}>
                          {item.name}
                        </Text>
                        <DeleteOutlined
                          onClick={() => removeItem(item, "breeds")}
                          style={{ marginTop: 4 }}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        )}

      {addBreedsModalRenderer()}
      {addGeneAndTraitModalRenderer()}
    </div>
  );
}
