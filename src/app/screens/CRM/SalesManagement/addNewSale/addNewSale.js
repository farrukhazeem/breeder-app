import React, { useEffect, useState } from "react";
import {
  Steps,
  Row,
  Col,
  Typography,
  Form,
  Space,
  Divider,
  Modal,
  message,
  Menu,
  Dropdown,
} from "antd";
import "./addNewSale.scss";
import {
  CheckCircleFilled,
  ArrowRightOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Input from "../../../../components/input/input";
import NumberInput from "../../../../components/numberInput/NumberInput";

import ButtonC from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import AnimalList from "./components/animalList";
import AnimalCart from "./components/animalCart";
import PaymentInfo from "./components/PaymentInfo";
import CartView from "./components/cartView";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  EnableLoader,
  DisableLoader,
} from "../../../../redux/actions/loader_action";
import { getAnimals } from "../../../../redux/actions/animal_action";
import { getTax, registerUser } from "../../../../redux/actions/user_actions";
import Emitter from "../../../../services/Emitter";
import moment from "moment";
import CurrentInfo from "./components/CurrentInfo";
import { addSales } from "../../../../redux/actions/sales_action";
import passwordGenerator from "../../../../config/passwordGenerator";
import { getProduct } from "../../../../redux/actions/product_action";
import ProductList from "./components/productList";
const { Step } = Steps;
const { Title, Text } = Typography;



let cartList = [
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
    quantity: 1,
  },
];

function selectAnimalStep(props) {
  // const [searchAnimalKeyword, setsearchAnimalKeyword] = useState(null);
  const addToCart = () => {
    console.log("add to cart click");
  };
  console.log("selected animals are ");
  console.log(props.selectedAnimals);
  const filterData = (user) => {
    if (!props.selectAnimalSearchKeyword) return user;
    // if(props.selectedItemType==='animal') {
    if (user?.data?.name && !(user?.data?.name.toLowerCase().search(props.selectAnimalSearchKeyword.toLowerCase()) === -1)) return user;
    // if (user?.data?.breed && !((typeof user?.data?.breed === 'string') ? user?.data?.breed.toLowerCase().search(props.selectAnimalSearchKeyword.toLowerCase()) === -1)) return user;
    return null;

  }

  // const onIncr = (data) => {
  //     console.log(data);
  //     // cartList = [...cartList, ...{data}];
  //     data.quantity++;
  //     cartList[0].quantity = 3;
  //     console.log(cartList);
  // }

  // const onDecr = (data) => {
  //     cartList = [...cartList, ...{ ...data, ...{ quantity: --data.quantity } }]
  // }

  const calculateSubTotalAmount = () => {
    return props.selectedAnimals.reduce(
      (acc, cv) => acc + cv.selectedQuantity * cv.data.price,
      0
    );
  };

  const finishDisountAmount = (values) => {
    console.log(values);
    if (values.discount > props.amount.subTotal) {
      message.error('Enter Small amount than Sub Total!');
    } else {
      message.success('Discount Applied Successfully!');
      props.setDiscountAmount(values.discount);
    }
  }


  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => { props.setSelectedItemType('animal'); props.fetchItem('animal'); }}>Animal</Menu.Item>
      <Menu.Item key="2" onClick={() => { props.setSelectedItemType('product'); props.fetchItem('product'); }}>Products</Menu.Item>
      <Menu.Item key="3" onClick={() => { props.setSelectedItemType('all'); props.fetchItem('all'); }}>Both</Menu.Item>
    </Menu>
  );
  console.log('changed animal type: ', props.selectedItemType);
  return (
    <div key={props.key} style={{ marginTop: 30 }}>
      <Row gutter={70} className="stepperItemsRow">
        <Col span={10}>
          <Title level={3}>Select item(s) - Showing {props.selectedItemType === 'animal' ? 'Animals' : (props.selectedItemType === 'product' ? 'Products' : 'Animals and Products')}</Title>
          <Row gutter={10}>
            <Col span={18}>
              <Input
                className="greybuttonsearch"
                prefix={<SearchOutlined />}
                value={props.selectAnimalSearchKeyword}
                onChange={(ev) => { props.setSelectAnimalSearchKeyword(ev.target.value) }}
              />
            </Col>
            <Col span={6}>
              <Dropdown
                overlay={menu}
              // onVisibleChange={this.handleVisibleChange}
              // visible={this.state.visible}
              >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <ButtonC block >Filters</ButtonC>
                </a>
              </Dropdown>

            </Col>
            <div className="animal-list">
              {
                (props.selectedItemType === 'animal' || props.selectedItemType === 'all') && <AnimalList
                  data={props.animalList ? props.animalList.filter(filterData) : []}
                  addToCart={props.addToCart}
                ></AnimalList>
              }
              {
                (props.selectedItemType === 'product' || props.selectedItemType === 'all') && <ProductList
                  data={props.productList ? props.productList.filter(filterData) : []}
                  addToCart={props.addToCart}
                ></ProductList>
              }
            </div>
          </Row>
        </Col>
        <Col span={14}>
          <Title level={3}>Cart</Title>
          <div className="cart-list">
            <AnimalCart
              data={props.selectedAnimals}
              removeAnimal={props.removeAnimal}
              onQuantityIncrease={props.onQuantityIncrease}
              onQuantityDecrease={props.onQuantityDecrease}
            ></AnimalCart>
            {/* <AnimalCart data={cartList} onIncr={onIncr} onDecr={onDecr}></AnimalCart>
                        <AnimalCart data={cartList} onIncr={onIncr} onDecr={onDecr}></AnimalCart> */}

            <Row>
              <Col xs={12}>
                <div className="secondary-text">Sub Total</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-120 primary-text">$ {props.amount.subTotal}</b>
              </Col>
            </Row>
            <br />
            <Form onFinish={finishDisountAmount}>
              <Row>
                <Col xs={20}>
                  <Form.Item name="discount"
                    rules={[
                      { required: true, message: 'Please enter discount amount!' },

                    ]}>
                    <NumberInput addonBefore="$" style={{ width: '100%' }} placeholder="Discount amount" />
                  </Form.Item>
                </Col>
                <Col xs={4} style={{ marginLeft: "-20px" }}>
                  <ButtonC style={{ zIndex: 2, }} htmlType="submit">Apply</ButtonC>
                </Col>
              </Row>
            </Form>

            <Divider />



            <Row>
              <Col xs={12}>
                <div className="secondary-text">Discount</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-120 primary-text">$ {props.discountAmount}</b>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="secondary-text">Sales Tax</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-120 primary-text">{props.animalTax} %</b>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="secondary-text">Total Amount</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-180 primary-color">
                  $ {props.amount.totalAmount - props.discountAmount}
                </b>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function currentInfo(props) {
  return <CurrentInfo {...props} />
}

function paymentInfo(props) {
  return <PaymentInfo {...props} />;
}

function orderSummary(props) {
  console.log(props);
  // const OrderId = fieldValidation.generateOrderNumber();
  const customerInfo = (info) => (
    <Space direction="vertical">
      <Title level={3}>Customer Information</Title>
      <Text>{props.customerInfoForm.getFieldValue("name")}</Text>
      <Text>{props.customerInfoForm.getFieldValue("phone")}</Text>
      <Text>{props.customerInfoForm.getFieldValue("email")}</Text>
      <Text>{props.customerInfoForm.getFieldValue("address")}</Text>
    </Space>
  );
  const orderDetails = (detail) => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={3}>Order Details</Title>
      <Text className="secondary-text">
        Registered by:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {props.user.name}
        </span>
      </Text>
      {/* <Text className="secondary-text">
        Order ID:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {OrderId}
        </span>
      </Text> */}
      <Text className="secondary-text">
        Order Date:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {moment(new Date()).format("DD MMM, YYYY")}
        </span>
      </Text>
      <Text className="secondary-text">
        Name:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {props.customerInfoForm.getFieldValue("name")}
        </span>
      </Text>
    </Space>
  );

  return (
    <div
      key={props.key}
      className="order-summary-body"
      style={{ marginTop: 30 }}
    >
      <Row>
        <Col span={8}>{customerInfo()}</Col>
        <Col span={8}></Col>
        <Col span={8}>{orderDetails()}</Col>
      </Row>

      <CartView data={cartList} {...props} />
    </div>
  );
}

function NavigationFooter(props) {
  console.log(props);
  return (
    <div className="footer-body">
      {props.current === 0 && (
        <div className="custom-renderer fs-150">
          <CheckCircleFilled className="checkIcon" />{" "}
          {props.selectedAnimals.length} new item(s) added
        </div>
      )}
      {!props.confirm && props.current === 0 && (
        <div className="navigation fs-150">
          <a
            onClick={props.next}
            style={{ position: "absolute", right: "50px", marginTop: "-17px" }}
          >
            Proceed <ArrowRightOutlined />
          </a>
        </div>
      )}
      {!props.confirm && props.current !== 0 && (
        <div className="navigation fs-150">
          <a
            onClick={props.next}
            style={{ position: "absolute", right: "50px", marginTop: "-17px" }}
          >
            Proceed <ArrowRightOutlined />
          </a>
        </div>
      )}
      {props.confirm && (
        <div
          className="navigation fs-150"
          style={{ position: "absolute", right: "50px" }}
        >
          <a onClick={props.submit}>Confirm</a>
        </div>
      )}
    </div>
  );
}

function AddNewSale(props) {
  const data = props.location.state?.data;
  console.log(data);

  let stepperConfig = data ?
    [
      {
        title: "Select Animal",
        status: "process",
        stepperBody: selectAnimalStep,
      },
      {
        title: "Payment Information",
        status: "wait",
        stepperBody: paymentInfo,
      },
      {
        title: "Order Summary",
        status: "wait",
        stepperBody: orderSummary,
      },
    ] : [
      {
        title: "Select Item(s)",
        status: "process",
        stepperBody: selectAnimalStep,
      },
      {
        title: "Customer Information",
        status: "wait",
        stepperBody: currentInfo,
      },
      {
        title: "Payment Information",
        status: "wait",
        stepperBody: paymentInfo,
      },
      {
        title: "Order Summary",
        status: "wait",
        stepperBody: orderSummary,
      },
    ];

  const [customerInfoForm] = Form.useForm();

  if (data) {
    customerInfoForm.setFieldsValue(data);
  }

  const [current, setCurrent] = useState(0);
  const [stepper, setStepper] = useState(stepperConfig);
  const [selectAnimalSearchKeyword, setSelectAnimalSearchKeyword] = useState('');
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [allAnimals, setAllAnimals] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animalTax, setAnimalTax] = useState(0);
  const [amount, setAmount] = useState({ subTotal: 0, totalAmount: 0, priceWithoutDiscount: 0 });
  // Payment information
  const [installmentData, setInstallmentData] = useState([]);
  const [downPayment, setdownPayment] = useState(0);
  const [isInstallment, setIsInstallment] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [selectedBreeder, setSelectedBreeder] = useState(data ? data : null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedItemType, setSelectedItemType] = useState('animal');

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('amount is changed');
  }, [amount])
  Emitter.on("INSTALLMENT_DATA_PASSING", (value) => {
    setInstallmentData(value);
    console.log(value);
    if (!value.downPayment) {
      message.warning("Please enter down payment!");
    }
    window.scrollTo(0, 0);
    stepperConfig[current].status = "finish";
    stepperConfig[current + 1].status = "process";
    setStepper(stepperConfig);
    setCurrent(current + 1);
  });

  const calculateSubTotalAmount = (selectedAnimals) => {
    setAmount({
      subTotal: Math.round(selectedAnimals.reduce(
        (acc, cv) => acc + cv.selectedQuantity * cv.data.price,
        0
      )),
      totalAmount: //Math.round(
        parseFloat(selectedAnimals.reduce(
          (acc, cv) =>
            acc +
            (cv.selectedQuantity * cv.data.price +
              cv.selectedQuantity * cv.data.price * (animalTax / 100)),
          0
        )
        ).toFixed(2)
      //),
    });
  };

  useEffect(() => {
    dispatch(EnableLoader());
    dispatch(getAnimals()).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setAllAnimals(response.payload.data.filter((e) => e.aliveQuantity > 0));
      }
    });
    dispatch(getTax()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setAnimalTax(response.payload.data.tax);
      }
    });
  }, []);


  const fetchItem = (type) => {
    if (type === 'animal') {
      dispatch(EnableLoader());
      dispatch(getAnimals()).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setAllAnimals(response.payload.data.filter((e) => e.aliveQuantity > 0));
        }
      });
    } else if (type === 'product') {
      dispatch(EnableLoader());
      dispatch(getProduct()).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setAllProducts(response.payload.data);
        }
      });
    } else if (type === 'all') {
      fetchItem('animal');
      fetchItem('product');
    }
  }

  const onChange = (current) => {
    console.log("onChange:", current);
    setCurrent(current);
  };

  const goToNext = () => {


    const onOkCalled = () => {
      dispatch(EnableLoader());
      const data = {
        ...customerInfoForm.getFieldsValue(),
        password: passwordGenerator.generate(10),
        addedBy: localStorage.getItem('userId'),
        businessName: '',
        noOfEmployees: '',
        verified: true,
      }
      dispatch(registerUser(data)).then(response => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          setSelectedBreeder({ ...response.payload.data, ...customerInfoForm.getFieldsValue() });
          window.scrollTo(0, 0);
          stepperConfig[current].status = "finish";
          stepperConfig[current + 1].status = "process";
          setStepper(stepperConfig);
          setCurrent(current + 1);
        } else {
          message.error(response.payload.message);
        }
      });
    }
    if (!data) {
      if (current === 1 && !customerInfoForm.getFieldValue("name"))
        return message.warning("Name is required!");
      if (current === 1 && !customerInfoForm.getFieldValue("city"))
        return message.warning("City is required!");
      if (current === 1 && !customerInfoForm.getFieldValue("state"))
        return message.warning("State is required!");
      if (current === 1 && !customerInfoForm.getFieldValue("phone"))
        return message.warning("At least one phone number is required!");
      if (current === 1 && !customerInfoForm.getFieldValue("email"))
        return message.warning("At least one email is required!");

      if (current === 0 && !selectedAnimals[0]) return message.warning('At least one animal should be selected!');

      console.log(customerInfoForm.getFieldsValue());

      if (current === 1 && !selectedBreeder) {

        Modal.confirm({
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: "Are you sure you want to add a new breeder?",
          okText: "Yes",
          cancelText: "Cancel",
          onOk: onOkCalled,
        });
        return;
      }

      // if(current === 1 && !selectedBreeder) return message.warning('Kindly Select any breeder!');

      if (current === 2 && !downPayment && isInstallment)
        return message.warning("Down Payment is required!");
      if (current === 2 && isInstallment) {
        console.log(
          parseFloat(downPayment) +
          parseFloat(
            installmentData.reduce(
              (acc, cv) => parseFloat(cv.amount) + parseFloat(acc),
              0
            )
          )
        );
        console.log(amount.totalAmount);
        if (
          !(
            parseFloat(downPayment) +
            parseFloat(
              installmentData.reduce(
                (acc, cv) => parseFloat(cv.amount) + parseFloat(acc),
                0
              )
            ) ===
            (parseFloat(amount.totalAmount) - parseFloat(discountAmount))
          )
        ) {
          return message.warning(
            "Down payment amount should be same as the total amount!"
          );
        }

        // // Emitter.emit('GET_INSTALLMENT_DATA');
        // return;
      }
    } else {





      if (current === 1 && !downPayment && isInstallment)
        return message.warning("Down Payment is required!");
      if (current === 1 && isInstallment) {
        console.log(
          parseFloat(downPayment) +
          parseFloat(
            installmentData.reduce(
              (acc, cv) => parseFloat(cv.amount) + parseFloat(acc),
              0
            )
          )
        );
        console.log(amount.totalAmount);
        if (
          !(
            parseFloat(downPayment) +
            parseFloat(
              installmentData.reduce(
                (acc, cv) => parseFloat(cv.amount) + parseFloat(acc),
                0
              )
            ) ===
            (parseFloat(amount.totalAmount) - parseFloat(discountAmount))
          )
        ) {
          return message.warning(
            "Down payment amount should be same as the total amount!"
          );
        }

        // // Emitter.emit('GET_INSTALLMENT_DATA');
        // return;
      }


    }




    window.scrollTo(0, 0);
    stepperConfig[current].status = "finish";
    stepperConfig[current + 1].status = "process";
    setStepper(stepperConfig);
    setCurrent(current + 1);
  };

  const confirmationModal = () => (
    <Modal
      title="Basic Modal"
      visible={confirmationModalVisible}
      footer={null}
      closable={false}
    // onOk={this.handleOk}
    // onCancel={this.handleCancel}
    >
      <div style={{ padding: "35px 0px 35px 0px" }}>
        <Title level={3}>Order Completed</Title>
        <Text>Your order has been booked successfully.</Text>
        <Space style={{ marginTop: 25 }}>
          <ButtonC className="secondary-button">
            <Link to="/sales">Ok</Link>
          </ButtonC>
          <ButtonC className="secondary-button">
            <Link to="/sales">Book Another Order</Link>
          </ButtonC>
        </Space>
      </div>
    </Modal>
  );

  const submitSale = () => {
    console.log("sale submitted");
    const finalAmout = { totalAmount: amount.totalAmount - discountAmount, discount: discountAmount, subTotal: amount.subTotal, priceWithoutDiscount: amount.totalAmount };
    const data = { animals: selectedAnimals.filter(e => e.itemType === 'animal').map(e => ({ animalId: e._id, price: e.data.price, quantity: e.selectedQuantity })), products: selectedAnimals.filter(e => e.itemType === 'product').map(e => ({ productId: e._id, price: e.data.price, quantity: e.selectedQuantity })), buyerId: selectedBreeder._id, installments: installmentData, amount: finalAmout, tax: animalTax, downpayment: downPayment };
    // debugger;
    console.log(data);
    dispatch(EnableLoader());
    dispatch(addSales(data)).then(response => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setConfirmationModalVisible(true);
      }
    }).catch(erorr => {
      console.log(erorr);
    })


  };

  const addAnimalToCart = (animal) => {
    setSelectedAnimals(
      selectedAnimals[0]
        ? [...selectedAnimals, ...[{ ...animal, selectedQuantity: 1 }]]
        : [{ ...animal, selectedQuantity: 1 }]
    );
    setAllAnimals(allAnimals.filter((e) => !(e._id === animal._id)));
    calculateSubTotalAmount(
      selectedAnimals[0]
        ? [...selectedAnimals, ...[{ ...animal, selectedQuantity: 1 }]]
        : [{ ...animal, selectedQuantity: 1 }]
    );
  };

  const removeAnimalFromCart = (data) => {
    setSelectedAnimals(selectedAnimals.filter((e) => !(e._id === data._id)));
    setAllAnimals([...allAnimals, ...[data]]);

    calculateSubTotalAmount(
      selectedAnimals.map((e) =>
        e._id === data._id
          ? { ...e, selectedQuantity: 0 }
          : e
      )
    );
  };

  const onQuantityIncrease = (data) => {
    if (data.selectedQuantity === data.aliveQuantity) {
      message.info("Maximum Limit Reached!");
    } else {
      setSelectedAnimals(
        selectedAnimals.map((e) =>
          e._id === data._id
            ? { ...e, selectedQuantity: e.selectedQuantity + 1 }
            : e
        )
      );
      calculateSubTotalAmount(
        selectedAnimals.map((e) =>
          e._id === data._id
            ? { ...e, selectedQuantity: e.selectedQuantity + 1 }
            : e
        )
      );
    }
  };

  const onQuantityDecrease = (data) => {
    if (data.selectedQuantity <= 1) {
      message.info("Minimum Quantity Should be One!");
    } else {
      setSelectedAnimals(
        selectedAnimals.map((e) =>
          e._id === data._id
            ? { ...e, selectedQuantity: e.selectedQuantity - 1 }
            : e
        )
      );
      calculateSubTotalAmount(
        selectedAnimals.map((e) =>
          e._id === data._id
            ? { ...e, selectedQuantity: e.selectedQuantity - 1 }
            : e
        )
      );
    }
  };

  const onSelectBreeder = (breeder) => {
    console.log(breeder);
    setSelectedBreeder(breeder);
    customerInfoForm.setFieldsValue({ name: breeder.name, phone: breeder.phone, email: breeder.email });
    console.log('fields selected');
  }

  return (
    <div className="add-new-sale-body">
      {confirmationModal()}
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        {/* <Step status="finish" title="finish 1" />
                <Step status="finish" title="finish 2" />
                <Step status="process" title="current process" />
                <Step    title="wait" disabled /> */}
        {stepper.map((step, key) => (
          <Step
            key={key}
            status={step.status}
            title={step.title}
            disabled={step.status === "wait" ? true : false}
          />
        ))}
      </Steps>

      {stepper
        .filter((_, idx) => idx === current)
        .map((step, key) =>
          step.stepperBody({
            key,
            animalList: allAnimals,
            productList: allProducts,
            amount,
            customerInfoForm,
            selectedAnimals,
            downPayment,
            user,
            isInstallment,
            setIsInstallment,
            setdownPayment,
            installmentData,
            setInstallmentData,
            animalTax,
            onQuantityDecrease,
            onQuantityIncrease,
            selectedBreeder,
            setSelectedBreeder,
            onSelectBreeder,
            removeAnimal: removeAnimalFromCart,
            addToCart: addAnimalToCart,
            discountAmount, setDiscountAmount,
            selectAnimalSearchKeyword, setSelectAnimalSearchKeyword,
            selectedItemType, setSelectedItemType,
            fetchItem
          })
        )}


      <NavigationFooter
        selectedAnimals={selectedAnimals}
        current={current}
        next={goToNext}
        confirm={current === stepperConfig.length - 1 ? true : false}
        submit={submitSale}
      />
    </div>
  );
}

export default AddNewSale;
