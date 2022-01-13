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
  Button,
  message,
  List
} from "antd";
import "./addNewSale.scss";
import {
  CheckCircleFilled,
  ArrowRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Input from "../../../../components/input/input";
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
import { getTax } from "../../../../redux/actions/user_actions";
import InputPhoneNumber from "react-phone-number-input/input";
import fieldValidation from "../../../../validations/fieldValidation";
import Emitter from "../../../../services/Emitter";
import moment from 'moment';
const { Step } = Steps;
const { Title, Text } = Typography;

let stepperConfig = [
  {
    title: "Select Animal",
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

let animalListData = [
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
  {
    name: "Lucy",
    breed: "Border Collie",
    _id: "29D34NDLIITBLS098837DH",
    price: 299.99,
  },
];

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

  return (
    <div key={props.key} style={{ marginTop: 30 }}>
      <Row gutter={70} className="stepperItemsRow">
        <Col span={10}>
          <Title level={3}>Select animal</Title>
          <Row gutter={10}>
            <Col span={18}>
              <Input
                className="greybuttonsearch"
                prefix={<SearchOutlined />}
                value="Oswald"
              />
            </Col>
            <Col span={6}>
              <ButtonC block>Filters</ButtonC>
            </Col>
            <div className="animal-list">
              <AnimalList
                data={props.animalList ? props.animalList : []}
                addToCart={props.addToCart}
              ></AnimalList>
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
            <Row>
              <Col xs={20}>
                <Input placeholder="Discount code" />
              </Col>
              <Col xs={4} style={{ marginLeft: "-20px" }}>
                <ButtonC>Apply</ButtonC>
              </Col>
            </Row>
            <Divider />

            <Row>
              <Col xs={12}>
                <div className="secondary-text">Sales Tax</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-120 primary-text">$ {props.animalTax}</b>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="secondary-text">Total Amount</div>
              </Col>
              <Col xs={12} style={{ position: "absolute", right: "128px" }}>
                <b className="fs-180 primary-color">
                  $ {props.amount.totalAmount}
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
  const limitPhoneNumber = (element) => {
    console.log(element);
    console.log(props.customerInfoForm.getFieldValue("phone"));
    if (
      props.customerInfoForm.getFieldValue("phone") &&
      props.customerInfoForm.getFieldValue("phone").length > 11
    ) {
      element.preventDefault();
    }
  };

  const phoneNumberChange = (value) => {
    props.customerInfoForm.setFieldsValue({ phone: value });
  };
  return (
    <div key={props.key} style={{ marginTop: 30 }}>
      <Card className="secondary-background-grey">
        <Title level={3}>Customer Info</Title>
        <Form form={props.customerInfoForm} layout={"vertical"}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Name" name="name">
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter customer address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  { min: 12, message: "Mobile number is invalid" },
                  // {
                  //   pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
                  //   message: "Mobile number is invalid"
                  // },
                ]}
                name="phone"
              >
                <Input
                  onKeyDown={limitPhoneNumber}
                  hidden
                  placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)"
                />
                <InputPhoneNumber
                  country="US"
                  value={props.customerInfoForm.getFieldValue("phone")}
                  placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                  className="ant-input customInput primary-text"
                  error={"Phone number required"}
                  onKeyDown={limitPhoneNumber}
                  onChange={phoneNumberChange}
                //   suffix={
                  
                //   }
                />
                 
              </Form.Item>
              <Button
                      style={{
                        borderRadius: "9px",
                        border: "transparent",
                        float: "right",
                        position: 'relative',
                        top: -60,
                        right: 3,
                      }}
                      className="secondary-button primary-contrast-text"
                      onClick={props.currInfoAddPhoneNumber}
                      
                    >
                      +
                    </Button>
                {/* <Input
                  placeholder="Enter phone number"
                  suffix={
                    <Button
                      style={{
                        borderRadius: "9px",
                        border: "transparent",
                        float: "right",
                      }}
                      className="secondary-button primary-contrast-text"
                    >
                      +
                    </Button>
                  }
                /> */}

            <List
                size="small"
              
                bordered
                dataSource={props.currInfoPhoneNumbersList}
                renderItem={item => <List.Item>{item}</List.Item>}
                />
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Enter email address"
                />                     
              </Form.Item>
              <Button
                      style={{
                        borderRadius: "9px",
                        border: "transparent",
                        float: "right",
                        position: 'relative',
                        top: -60,
                        right: 3,
                      }}
                      className="secondary-button primary-contrast-text"
                      onClick={props.currInfoAddEmail}
                    >
                      +
                    </Button>
                    <List
                        size="small"
                     
                        bordered
                        dataSource={props.currInfoEmailList}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
 
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

function paymentInfo(props) {
  return <PaymentInfo {...props} />;
}

function orderSummary(props) {
  console.log(props);
  const OrderId = fieldValidation.generateOrderNumber();
  const customerInfo = (info) => (
    <Space direction="vertical">
      <Title level={3}>Customer Information</Title>
      <Text>{props.customerInfoForm.getFieldValue('name')}</Text>
      <Text>{props.currInfoPhoneNumbersList[0]}</Text>
      <Text>{props.currInfoEmailList[0]}</Text>
      <Text>{props.customerInfoForm.getFieldValue('address')}</Text>
    </Space>
  );
  const orderDetails = (detail) => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={3}>Order Details</Title>
      <Text className="secondary-text">
        Registered by:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {props.customerInfoForm.getFieldValue('name')}
        </span>
      </Text>
      <Text className="secondary-text">
        Order ID:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {OrderId}
        </span>
      </Text>
      <Text className="secondary-text">
        Order Date:{" "}
        <span style={{ float: "right" }} className="primary-text">
          {  moment(new Date()).format(
                            "DD MMM, YYYY"
                          )}
        </span>
      </Text>
      <Text className="secondary-text">
        Name:{" "}
        <span style={{ float: "right" }} className="primary-text">
        {props.customerInfoForm.getFieldValue('name')}
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

      <CartView data={cartList} {...props}/>
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
  const [customerInfoForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [stepper, setStepper] = useState(stepperConfig);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [allAnimals, setAllAnimals] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animalTax, setAnimalTax] = useState(0);
  const [amount, setAmount] = useState({ subTotal: 0, totalAmount: 0 });
  // Payment information
  const [installmentData, setInstallmentData] = useState([]);
  const [downPayment, setdownPayment] = useState(0);
  const [isInstallment, setIsInstallment] = useState(false);
  const [currInfoPhoneNumbersList, setcurrInfoPhoneNumbersList] = useState([]);
  const [currInfoEmailList, setcurrInfoEmailList] = useState([]);

  const dispatch = useDispatch();

  Emitter.on('INSTALLMENT_DATA_PASSING', (value) => {
    setInstallmentData(value)
    console.log(value);
    if(!value.downPayment) {
      message.warning('Please enter down payment!')
    }
    window.scrollTo(0, 0);
    stepperConfig[current].status = "finish";
    stepperConfig[current + 1].status = "process";
    setStepper(stepperConfig);
    setCurrent(current + 1);
  });
  
  
  const calculateSubTotalAmount = (selectedAnimals) => {
    setAmount({
      subTotal: selectedAnimals.reduce(
        (acc, cv) => acc + cv.selectedQuantity * cv.data.price,
        0
      ),
      totalAmount: selectedAnimals.reduce(
        (acc, cv) =>
          acc +
          (cv.selectedQuantity * cv.data.price -
            cv.selectedQuantity * cv.data.price * (animalTax / 100)),
        0
      ),
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

  const onChange = (current) => {
    console.log("onChange:", current);
    setCurrent(current);
  };

  const goToNext = () => {
    if ((current === 1) && !(customerInfoForm.getFieldValue('name'))) return message.warning('Name is required!');
    if ((current === 1) && !(customerInfoForm.getFieldValue('address'))) return message.warning('Address is required!');
    if ((current === 1) && !(currInfoPhoneNumbersList[0])) return message.warning('At least one phone number is required!');
    if ((current === 1) && !(currInfoEmailList[0])) return message.warning('At least one email is required!');
    
    if((current === 2) && !(downPayment) && isInstallment) return message.warning('Down Payment is required!');
    if((current === 2) && isInstallment) {
      console.log(parseInt(downPayment) + parseInt(installmentData.reduce((acc, cv) => parseInt(cv.amount)+parseInt(acc) , 0)));
      console.log(amount.totalAmount);
        if(!((parseInt(downPayment) + parseInt(installmentData.reduce((acc, cv) => parseInt(cv.amount)+parseInt(acc) , 0))) === amount.totalAmount)) {
          return message.warning('Down payment amount should be same as the total amount!')
        }

      
        // // Emitter.emit('GET_INSTALLMENT_DATA');
        // return;
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

    const data = {selectedAnimals, };



    setConfirmationModalVisible(true);
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

  const  currInfoAddPhoneNumber = () => {
    const phoneNum = customerInfoForm.getFieldValue('phone');
    if(!phoneNum) return message.warning('Phone number is required!');
    if(phoneNum.length < 12) {
        message.warning('Phone number is Invalid!');
    } else if(currInfoPhoneNumbersList.includes(phoneNum)) {
        message.warning('Phone number already exist!');
    } else {
        setcurrInfoPhoneNumbersList([...currInfoPhoneNumbersList, ...[phoneNum]]);
        customerInfoForm.setFieldsValue({phone: ''});
    }
  }

  const currInfoAddEmail = () => {
    const emailAdd = customerInfoForm.getFieldValue('email');
    if(!emailAdd) return message.warning('Email address is required!');
    
    if(!fieldValidation.validateEmail(emailAdd)) return message.warning('Invalid Email!');
    
    if(currInfoEmailList.includes(emailAdd)) {
        message.warning('Email already exist!');
    } else {
        setcurrInfoEmailList([...currInfoEmailList, ...[emailAdd]]);
        customerInfoForm.setFieldsValue({email: ''});
    }
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
            amount,
            customerInfoForm,
            selectedAnimals,
            downPayment,
            isInstallment,
            setIsInstallment,
            setdownPayment,
            installmentData,
            setInstallmentData,
            animalTax,
            currInfoAddPhoneNumber, currInfoPhoneNumbersList, currInfoAddEmail, currInfoEmailList,
            onQuantityDecrease,
            onQuantityIncrease,
            removeAnimal: removeAnimalFromCart,
            addToCart: addAnimalToCart,
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
