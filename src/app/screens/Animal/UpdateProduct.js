import React, { useState, useEffect } from "react";
import { Row, Col, Form, Select, Space, message } from "antd";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import SuccessRegister from "./SuccessRegister";
import "./RegisterAnimalProduct.scss";
import { useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { getProductById } from "../../redux/actions/product_action";
import {
    getFormByCategory,
    getFormsByBreederAndCategoryType,
} from "../../redux/actions/form_action";
import FormGenerator from "./FormGenerator";
import { editProduct } from "../../redux/actions/product_action";
import { getUserId } from "../../redux/actions/user_actions";
import moment from 'moment'

const { Option } = Select;

function UpdateProduct(props) {
    const [visible, setvisible] = useState(false);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryForm, setCategoryForm] = useState(null);
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState(getUserId());


    const [FormikValues, setFormikValues] = useState({});
    const [getProductId, setgetProductId] = useState(null);
    const [getId, setgetId] = useState(null);
    const [form] = Form.useForm();



    const dispatch = useDispatch();

    const isProduct = () => {
        if (window.location.pathname === "/product/register" || window.location.pathname.startsWith("/product/register/")) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        dispatch(EnableLoader());
        if (isProduct()) {
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

        console.log("Success:", values);
        console.log("in product");
        var formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (image && image.file) {
            formData.append("file", image.file, image.file.name);
        }
        formData.append("categoryId", categoryForm.categoryId._id);
        formData.append(
            "categoryName",
            categories.filter((e) => e._id === categoryForm.categoryId._id)[0].name
        );
        console.log(getId, "<===")
        dispatch(EnableLoader());
        dispatch(editProduct(formData, getId)).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message);
                props.history.push("/product");
            }
        });

    };

    useEffect(() => {
        if (isProduct() && categories) {
            let ev = window.location.pathname.split('/').pop()
            if (ev !== "register" && categories) {

                dispatch(getFormByCategory(ev)).then((response) => {
                    console.log(response);
                    if (response.payload.status === 200) {
                        console.log("save in category form");
                        setCategoryForm(response.payload.data);
                        FormikValuesMake(response.payload.data)
                        setgetProductId(categories.filter((e) => e._id == ev)[0]);
                        setSelectedCategory(categories.filter((e) => e._id == ev)[0]);


                        form.resetFields();
                    }
                })
            }
        }
    }, [categories])

    const categoryChange = (ev) => {
        dispatch(EnableLoader());
        dispatch(getFormByCategory(ev)).then((response) => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                console.log("save in category form");
                setCategoryForm(response.payload.data);
                console.log(categories.filter((e) => e._id == ev));
                setSelectedCategory(categories.filter((e) => e._id == ev)[0]);

            }
        });
    };


    const FormikValuesMake = (data) => {
        if (data) {
            let init = data.formStructure.map(e => e.name)
            let object = Object.assign(...init.map(v => ({ [v]: "" })));
            let id = window.location.pathname.split('/')[3]
            setgetId(id)
            dispatch(getProductById(id)).then((response) => {
                dispatch(DisableLoader());
                var r = {};
                debugger
                let valuess = Object.values(response.payload.data.data).map(e => (e.length > 8 && !isNaN(Date.parse(e))) ? moment(e) : e)
                for (let i = 0; i < Object.keys(response.payload.data.data).length; i++) {
                    r[Object.keys(response.payload.data.data)[i]] = valuess[i];
                }
                form.setFieldsValue(r);
                setImage(response.payload.data.image)
            });
            setFormikValues(object)
        }
    }


    return (
        <div>

            <Form onFinish={onFinishRegistered} form={form} initialValues={FormikValuesMake}>
                <Row className="">
                    <Col flex={4}>
                        <div style={{ float: "left" }}>
                            <h2 className="primary-text primary-text-heading ">
                                Update Product
                            </h2>
                        </div>
                        <div style={{ float: "left" }}>
                            {categories && (
                                <Form.Item
                                    name="animals"
                                    style={{ marginLeft: 10 }}
                                >
                                    <Select
                                        defaultValue={getProductId ? getProductId.name : "Select Category"}
                                        placeholder="Select status" style={{ minWidth: 280 }}
                                        className="customSelect"
                                        onSelect={categoryChange}
                                    >
                                        {categories.map((category) => (
                                            <Option value={category._id}>{category.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}
                        </div>
                    </Col>
                    <Col flex={0}>
                        <Space>
                            <Link to={"/product"}>
                                <Button className="secondary-button">Back</Button>
                            </Link>
                            <Button
                                htmlType="submit"
                                disabled={!categoryForm}
                                className="secondary-button"
                            >
                                Update
              </Button>
                        </Space>
                    </Col>
                </Row>

                <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
                    {" "}
                    {categoryForm && (
                        <>
                            <div>
                                {image ? (
                                    <img
                                        src={image && image.file ? URL.createObjectURL(image.file) : image}
                                        style={{ width: 70, height: 70, borderRadius: 40 }}
                                        width={"90"}
                                        height={"90"}
                                        alt="logo"
                                    />
                                ) : (
                                        <img
                                            src={require("../../../assets/images/product/productDice.jpg")
                                            }
                                            style={{ width: 70, height: 70, borderRadius: 40 }}
                                            alt="logo"
                                        />
                                    )}
                            </div>


                            <Form.Item
                                name="file"
                                className="animal-input-custom"
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
                        <FormGenerator
                            formStructure={categoryForm.formStructure.filter((e) =>
                                e.breedersId.map((bid) => bid._id).includes(userId)
                            )}
                        />
                    )}



                </Row>
            </Form>

            <div>{visible ? <SuccessRegister /> : ""}</div>
        </div>
    );
}

export default UpdateProduct;
