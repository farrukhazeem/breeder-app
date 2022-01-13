import React, { useState, useEffect } from "react";
import { Row, Col, Form, Select, Space, message, Modal } from "antd";
import Checkbox from "../../components/checkbox/Checkbox";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import SuccessRegister from "./SuccessRegister";
import "./RegisterAnimalProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
//import InputNumber from "../../components/numberInput/NumberInput";
import {
  getFormByCategory,
  getFormsByBreederAndCategoryType,
} from "../../redux/actions/form_action";
import FormGenerator from "./FormGenerator";
import {
  getAnimals,
  createAnimal,
} from "../../redux/actions/animal_action";
import { createProduct } from "../../redux/actions/product_action";
import { getUserId } from "../../redux/actions/user_actions";

const { Option } = Select;

function RegisterAnimalProduct(props) {
  const [family, setfamily] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState([]);
  const [visible, setvisible] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState(null);
  const [image, setImage] = useState(null);
  const [animals, setAnimals] = useState(null);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(getUserId());
  const [form] = Form.useForm();

  let user = useSelector(state => state.user?.userData?.data ? state.user.userData.data : {});

  const dispatch = useDispatch();

  console.log(window.location.pathname);
  const isAnimal = () => {
    if (window.location.pathname === "/animal/register") {
      return true;
    } else {
      return false;
    }
  };
  const isProduct = () => {
    if (window.location.pathname === "/product/register") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(EnableLoader());
    if (isAnimal()) {
      dispatch(getFormsByBreederAndCategoryType("animal")).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setCategories(
            response.payload.data
              ? response.payload.data.map((e) => e.categoryId)
              : null
          );
        }
      });
    } else if (isProduct()) {
      dispatch(getFormsByBreederAndCategoryType("product")).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setCategories(
            response.payload.data
              ? response.payload.data.map((e) => e.categoryId)
              : null
          );
        }
      });
    }
  }, []);

  // Upload image here ...
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    if (!(event.target.files[0].type.split("/")[0] === "image")) {
      message.error("Only image is allowed!");
      return false;
    } else {
      setImage({ file: event.target.files[0] });
    }
  };

  const onFinishRegistered = (values) => {
    if (isAnimal()) {
      console.log("Success:", values);
      console.log(selectedFamily);
      console.log(categories);
      console.log(categoryForm.categoryId);
      // setvisible(true);
      // console.log({
      //   data: values,
      //   ...{
      //     categoryId: categoryForm.categoryId,
      //     categoryName: categories.filter(
      //       (e) => e._id === categoryForm.categoryId
      //     )[0].name,
      //   },
      // });

      var formData = new FormData();
      formData.append("data", JSON.stringify(values));
      formData.append("family", JSON.stringify(selectedFamily));
      // for (const key in values) {
      //   if (values.hasOwnProperty(key)) {
      //     // const element = object[key];
      //     obj.append(key, values[key]);
      //   }
      // }
      // formData.append('data', obj);
      if (image) {
        formData.append("file", image.file, image.file.name);
      }
      formData.append("categoryId", categoryForm.categoryId._id);
      formData.append(
        "categoryName",
        categories.filter((e) => e._id === categoryForm.categoryId._id)[0].name
      );

      // setData({data: values, ...{categoryId: categoryForm.categoryId, categoryName: categories.filter((e) => (e._id===categoryForm.categoryId))[0].name }});
      dispatch(EnableLoader());

      dispatch(createAnimal(formData)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.history.push("/animal");
        } else {

          if (response.payload.status === 405) {
            // message.error(response.payload.message);
            Modal.error({
              title: 'Limit Exceeded!',
              content: (
                <>
                  {response.payload.message}
                </>
              ),
              okCancel: true,
              cancelText: 'Ok',
              okText: 'Upgrade',
              onOk: () => {
                props.history.push('/subscription');
              }
            })
          } else {
            message.error(response.payload.message);
          }
        }
      });
    } else if (isProduct()) {
      console.log("Success:", values);
      console.log("in product");
      var formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (image) {
        formData.append("file", image.file, image.file.name);
      }
      formData.append("categoryId", categoryForm.categoryId._id);
      formData.append(
        "categoryName",
        categories.filter((e) => e._id === categoryForm.categoryId._id)[0].name
      );

      dispatch(EnableLoader());

      dispatch(createProduct(formData)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.history.push("/product");
        } else {
          if (response.payload.status === 405) {
            // message.error(response.payload.message);
            Modal.error({
              title: 'Limit Exceeded!',
              content: (
                <>
                  {response.payload.message}
                </>
              ),
              okCancel: true,
              cancelText: 'Ok',
              okText: 'Upgrade',
              onOk: () => {
                props.history.push('/subscription');
              }
            })
          } else {
            message.error(response.payload.message);
          }
        }
      });
    }
  };

  const categoryChange = (ev) => {
    console.log(ev);
    dispatch(EnableLoader());
    dispatch(getFormByCategory(ev)).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        console.log(response.payload.data, "<---setCategoryForm")
        setCategoryForm(response.payload.data);
        setSelectedCategory(categories.filter((e) => e._id == ev)[0]);
      }
    });
  };

  const familyTreeChange = () => {
    dispatch(EnableLoader());
    if (animals) {
      dispatch(DisableLoader());
      setfamily(!family);
    } else {
      dispatch(getAnimals()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          console.log(selectedCategory);
          setAnimals(
            response.payload.data
              ? response.payload.data.filter(
                (e) =>
                  e.categoryId.name ===
                  selectedCategory.name
              )
              : []
          );
          setfamily(!family);
        }
        dispatch(DisableLoader());
      });
    }
  };

  const addInFamily = (data, type) => {
    setSelectedFamily({ ...selectedFamily, ...{ [type]: { id: data } } });
    console.log({ ...selectedFamily, ...{ [type]: { id: data } } });
    // if(!selectedFamily.filter(e => e===data)[0]) {
    //   setSelectedFamily([...selectedFamily, ...[data]]);
    //   return true;
    // } else {
    //   return false
    // }
  };

  return (
    <div>
      {/* <Row>
                <Col>
                    Animal Management > <b className="primary-text">Register a new Animal</b>
                </Col>
            </Row> */}

      <Form form={form} onFinish={onFinishRegistered}>
        <Row className="">
          <Col flex={4}>
            <div style={{ float: "left" }}>
              <h2 className="primary-text primary-text-heading ">
                Register a new{" "}
              </h2>
            </div>
            <div style={{ float: "left" }}>
              {categories && (
                <Form.Item
                  name="animals"
                  style={{ width: 200, marginLeft: 10 }}
                >
                  <Select
                    defaultValue="Select Category"
                    placeholder="Select status"
                    className="customSelect"
                    style={{ width: 'auto', minWidth: 280 }}
                    onSelect={categoryChange}
                  >
                    {categories.map((category) => (
                      <Option value={category._id} style={{ paddingLeft: 0, marginLeft: 0 }}>{category.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </div>
          </Col>
          <Col flex={0}>
            <Space>
              <Link to={isAnimal() ? "/animal" : "/product"}>
                <Button className="secondary-button">Back</Button>
              </Link>
              <Button
                htmlType="submit"
                disabled={!categoryForm}
                className="secondary-button"
              >
                Register
              </Button>
            </Space>
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
          {" "}
          {categoryForm && (
            <>
              <div>
                {/* <img
              src={require("../../../assets/images/familytree/parent1@2x.png")}
              width={"90"}
              alt="logo"
            /> */}

                {image && image.file ? (
                  <img
                    src={URL.createObjectURL(image.file)}
                    style={{ width: 70, height: 70, borderRadius: 40 }}
                    width={"90"}
                    height={"90"}
                    alt="logo"
                  />
                ) : (
                    <img
                      src={
                        isAnimal()
                          ? require("../../../assets/images/familytree/Animal@2x.png")
                          : require("../../../assets/images/familytree/Product@2x.png")
                      }
                      style={{ width: 70, height: 70, borderRadius: 40 }}
                      alt="logo"
                    />
                    // <img src={require('../../../assets/images/emp/men3.png')} style={{ borderRadius: "45px" }} width={'90'} alt="logo" />
                  )}
              </div>
              {/* <Form.Item name="file" style={{display:""}}> <Input id="image" type="file" ></Input>
                    </Form.Item> */}

              <Form.Item
                name="file"
                className="animal-input-custom"
              //  rules={[{ required: true, message: "Please enter image!" }]}
              >
                <span>
                  <a className="primary-text" style={{ cursor: "pointer" }}>
                    Upload picture
                  </a>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => handleChange(e)}
                  ></Input>
                </span>
              </Form.Item>
            </>
          )}
        </Row>

        <Row>
          {categoryForm && (
            <>
              {/* <Col xs={24} lg={8}>
                <div
                  style={{ margin: "3px", fontSize: "15px" }}
                  className="primary-text"
                >
                  Quantity:
                </div>
                <Form.Item
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Quantity is required",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Enter Quantity"
                  />
                </Form.Item>
              </Col> */}

              {/* <Col xs={24} lg={8}>
                <div
                  style={{ margin: "3px", fontSize: "15px" }}
                  className="primary-text"
                >
                  Price:
                </div>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Price is required",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Enter Price"
                  />
                </Form.Item>
              </Col> */}
            </>
          )}
          {categoryForm && (
            <FormGenerator
              formStructure={categoryForm.formStructure.filter((e) =>
                e.breedersId.map((bid) => bid._id).includes(userId)
                && (user?.subscriber?.subscriptionId?.packageType === "Individual" ? !e.onlyBusiness : e)
              )}
              form={form}
              type={categoryForm.categoryId.type}
              selected={categoryForm}
            />
          )}

          {/* <Col xs={24} lg={8}>
            <div
              style={{ margin: "3px", fontSize: "15px" }}
              className="primary-text"
            >
              Nick Name:
            </div>
            <Form.Item name="name">
              <Input style={{ width: "70%" }} placeholder="Enter Nick Name" />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Sex*:</div>
            <Form.Item
              name="sex"
              // rules={[{ required: true , message: 'Please select sex' }]}
            >
              <Select
                style={{ width: "70%" }}
                placeholder="Select state"
                allowClear
                className="customSelect"
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Age*:</div>

            <Form.Item
              name="age"
              // rules={[
              //     {
              //         required: true,message: 'Please input Age!',
              //     },]}
            >
              <Input
                style={{ width: "70%" }}
                placeholder="Enter age"
                type="number"
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Breed*:</div>
            <Form.Item
              name="breed"
              // rules={[
              // {
              //     required: true,message: 'Please input Breed',},
              // ]}
            >
              <Input style={{ width: "70%" }} placeholder="Enter breed" />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Height*:</div>
            <Form.Item
              name="height"
              // rules={[
              // {
              //     required: true,message: 'Please input Height',},
              // ]}
            >
              <Input
                style={{ width: "70%" }}
                placeholder="Enter Height"
                type="number"
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Weight*:</div>
            <Form.Item
              name="weight"
              // rules={[
              // {
              //     required: true,message: 'Please input Weight',},
              // ]}
            >
              <Input
                style={{ width: "70%" }}
                placeholder="Enter Weight"
                type="number"
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Color*:</div>
            <Form.Item
              name="color"
              // rules={[
              // {
              //     required: true,message: 'Please input Color'}
              // ]}
            >
              <Input style={{ width: "70%" }} placeholder="Enter Color" />
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Status*:</div>
            <Form.Item
              name="status"
              // rules={[{ required: true , message: 'Please select status' }]}
            >
              <Select
                style={{ width: "70%" }}
                placeholder="Select state"
                className="customSelect"
              >
                {statuses.map((status) => (
                  <Option value={status}>{status}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <div className="primary-text name-top">Hair:</div>
            <Form.Item name="hair">
              <Input style={{ width: "70%" }} placeholder="Enter Hair" />
            </Form.Item>
          </Col>

          <Col xs={24} lg={24}>
            <Form.Item>
              <Checkbox id="rememberMe" onChange={() => setfamily(!family)}>
                Family Tree
              </Checkbox>
            </Form.Item>
          </Col> */}
          {categoryForm && !isProduct() && (
            <>
              <Col xs={24} lg={24}>
                <Form.Item>
                  <Checkbox id="rememberMe" onChange={familyTreeChange}>
                    Family Tree
                  </Checkbox>
                </Form.Item>
              </Col>
              {family ? (
                <Col xs={24} lg={24}>
                  <Row>
                    <Col xs={24} lg={12}>
                      <div className="primary-text name-top">Parent 1:</div>
                      <Form.Item>
                        <Select
                          style={{ width: "70%" }}
                          placeholder="Select parent 1"
                          className="customSelect"
                          onChange={(data) => addInFamily(data, "parent1")}
                          allowClear
                        >
                          {animals
                            .filter(
                              (e) =>
                                selectedFamily.parent2?.id !== e._id
                            )
                            .map((animal) => (
                              <Option key={animal._id} value={animal._id}>
                                {animal.data.name ? animal.data.name : animal._id}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} lg={12}>
                      <div className="primary-text name-top">Parent 2:</div>
                      <Form.Item>
                        <Select
                          style={{ width: "70%" }}
                          placeholder="Select parent 2"
                          className="customSelect"
                          onChange={(data) => addInFamily(data, "parent2")}
                          allowClear
                        >
                          {animals
                            .filter(
                              (e) =>
                                selectedFamily.parent1?.id !== e._id
                            )
                            .map((animal) => (
                              <Option value={animal._id}>
                                {animal.data.name
                                  ? animal.data.name
                                  : animal._id}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </>
          )}
        </Row>
      </Form>

      <div>{visible ? <SuccessRegister /> : ""}</div>
    </div>
  );
}

export default RegisterAnimalProduct;
