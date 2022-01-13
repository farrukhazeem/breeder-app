import React, { useState } from "react";
import { Row, Col, Modal, Typography, Form, Space, message, Empty } from "antd";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Cart from "../../components/card/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./paymentInfo.css";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { createCardCustomer, editDetail } from "../../redux/actions/user_actions";
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'

const { Title } = Typography;

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",

      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function PaymentInfo(props) {
  const [form] = Form.useForm();
  const { getData } = props;
  console.log(props);
  const creditCard = props.data?.creditCard ? props.data.creditCard[0] : null;
  const [cardModal, setCardModal] = useState(false);
  const [name, setName] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) return message.error('Name is required!');
    const { currentTarget } = event;

    const formData = new FormData(currentTarget);
    formData.name = name;
    const data = { name };
    for (var pair of formData.entries()) {
      data[pair[0]] = pair[1]
      console.log(pair[0] + ', ' + pair[1]);
      if (!pair[1]) {
        return message.error(pair[0] + " is required");
      }
      if (meta.error) {
        return message.error(meta.error);
      }
    }
    console.log(data);
    // setCardModal(false);
    // message.success("response.payload.message");
    dispatch(EnableLoader());
    dispatch(createCardCustomer(data)).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        document.getElementsByClassName("cardForm")[0].reset();
        form.resetFields();
        setCardModal(false);
        getData()
        setName('');
        message.success(response.payload.message);
      }
      else {
        message.error(response.payload.message);
      }
    })

  }


  const handleSubmit2 = async (event) => {

    // Block native form submission.
    if (!name) return message.error('Name is required!');

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    //console.log(cardElement);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      message.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      dispatch(EnableLoader());
      dispatch(editDetail({ creditCard: [{ ...paymentMethod, name }] })).then((response) => {
        //console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success('Credit Card Added Successfully');
          setCardModal(false);
          getData()
          setName('');
          elements.getElement(CardElement).clear();
        }
      })
    }
  };

  const deleteCard = (id) => {
    dispatch(EnableLoader());
    dispatch(editDetail({ creditCard: [] })).then((response) => {
      //console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success('Credit Deleted Successfully');
        // setCardModal(false);
        getData();
      }
    })
  }

  // const [cardNumber, setcardNumber] = useState('')
  // const handleChangeCardNumber = (values) => {
  //   setcardNumber(values.target.value)
  // }

  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps, meta
  } = usePaymentInputs();

  return (
    <>
      {getUserFromLocalStorage() !== "Individual" ?
        <div>
          <br />
          <Space>
            <h2 className="primarytext primary-text-heading">
              Payment Information{" "}
            </h2>
            <Button disabled={creditCard} onClick={() => setCardModal(true)}>Add Card</Button>
          </Space>
          <br />
          <br />
          {creditCard ? <Row>
            <Col xs={24} lg={12} className="textAlign-xs-box">
              <Cart className="secondary-background-grey">
                <img
                  className="textAlign-sm-box"
                  width={"70"}
                  src={require(`../../../assets/images/stripe@2x.png`)}
                  alt="Logo"
                />
                <br />
                <span className="fs-150 primary-text">Name of Card</span>
                <span className="fs-150 secondary-text pos-lg-abs-right">
                  {creditCard.name}
                </span>
                <div></div>

                <span className="fs-150 primary-text">Last Four Digits of IBAN</span>
                <span className="fs-150 secondary-text pos-lg-abs-right">
                  {creditCard.card.last4}
                </span>
              </Cart>
              <br />

              <Space className="pos-lg-abs-right textAlign-sm-box ">
                <Button onClick={() => deleteCard(creditCard._id)}>Delete</Button>
                {/* <Button>Change</Button> */}
              </Space>
            </Col>
          </Row> :
            <div style={{ width: "100%", marginTop: 30 }}>
              <Empty description={"No Card Added"} />
            </div>}

          <br />
          <br />
          <Modal visible={cardModal} footer={null} closable={false} centered>
            <div>
              <Title level={3} className="primarytext primary-text-heading">Account Setting</Title>
            </div>
            <form onSubmit={handleSubmit} className="cardForm">
              {/* <CardElement options={CARD_OPTIONS} /> */}
              <Form form={form} >
                <Form.Item
                  style={{ marginTop: 10 }}
                  name="name"

                // rules={[
                //   { required: true, message: "Please input card name!" },
                //   { max: 50, message: "Maximum 50 characters are required!" },
                // ]}
                >
                  <Input onChange={(value) => { setName(value.target.value); console.log(value.target.value); }} placeholder="Enter card name" />
                </Form.Item>
              </Form>

              <PaymentInputsWrapper >
                <svg {...getCardImageProps({ images })} />

                <input {...getCardNumberProps()} style={{ marginLeft: 25 }} />


                <input {...getExpiryDateProps()} style={{ marginLeft: 73 }} />

                <input {...getCVCProps()} style={{ marginLeft: 73 }} />

              </PaymentInputsWrapper>

              <div style={{ marginTop: 20 }}></div>
              {/* <CardElement options={CARD_OPTIONS} /> */}

              <Space>
                <Button onClick={() => { setCardModal(false); form.resetFields(); document.getElementsByClassName("cardForm")[0].reset(); }} className="secondary-button">
                  Discard
            </Button>
                <Button type="submit" htmlType="submit" >
                  Add
            </Button>
              </Space>
            </form>
          </Modal>
        </div>
        :

        <h4 style={{ marginTop: 50 }}>Not for Individual Account</h4>
      }
    </>
  );
}

export default PaymentInfo;
