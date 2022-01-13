import React, { useState } from "react";
import { Space, Row, Col, Modal, Typography, Form } from "antd";
import Button from "../../components/button/button";
import Cart from "../../components/card/card";
import ChangePasswordModal from "./changePasswordModal";
import Input from "../../components/input/input";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { auth, editDetail } from "../../redux/actions/user_actions";
import { EditOutlined } from "@ant-design/icons";
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'

const { Title } = Typography;
function BusinessInfoRrenderer(props) {
  const { data } = props;
  const [form] = Form.useForm();
  const [formPaypal] = Form.useForm();
  const [formSecond] = Form.useForm();
  const [editModal, setEditModal] = useState(false);
  const [paymentMethodModal, setpaymentMethodModal] = useState(false);
  const [currPaymentMethodType, setcurrPaymentMethodType] = useState(null);
  const dispatch = useDispatch();

  const onChangePasswordModal = () => {
    setmodalpassword(!modalpassword);
  };

  const finishEditInformation = (result) => {
    dispatch(EnableLoader());
    delete data.image;
    dispatch(
      editDetail({
        ...data,
        name: result.name,
        businessInfoSettings: { ...data.businessInfoSettings, tax: result.tax },
      })
    ).then((response) => {
      dispatch(DisableLoader());
      // console.log(response);
      if (response.payload.status === 200) {
        form.resetFields()
        setEditModal(false);
        dispatch(auth());
      }
    });
  };

  const finishPaymentMethod = (values) => {
    dispatch(EnableLoader());
    delete data.image;
    dispatch(
      editDetail({
        ...data,
        paymentInformation: {
          ...data.paymentInformation,
          [currPaymentMethodType]: {
            ...values
          }
        }
      })
    ).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        formSecond.resetFields()
        setpaymentMethodModal(false);
        dispatch(auth());
      }
    });
  }
  const [modalpassword, setmodalpassword] = useState(false);
  return (
    <div className="setting-accounts-renderer">
      <Space>
        <h2 className="primarytext primary-text-heading">Account Settings</h2>
        <Button onClick={() => setEditModal(true)}>Edit</Button>
      </Space>
      <div className="business-info-list">
        <Row className="bi-row">
          <Col span={6}>
            <span className="primary-text fs-120">Name</span>
          </Col>
          <Col span={6} className="bi-value">
            <span className="primary-text fs-120">{data.name}</span>
          </Col>
        </Row>
        <Row className="bi-row">
          <Col span={6}>
            <span className="primary-text fs-120">Email</span>
          </Col>
          <Col span={6} className="bi-value">
            <span className="primary-text fs-120">{data.email}</span>
          </Col>
        </Row>

        <Row className="bi-row">
          <Col span={6}>
            <span className="primary-text fs-120">Breeder Id</span>
          </Col>
          <Col span={6} className="bi-value">
            <span className="primary-text fs-120">{data.uid}</span>
          </Col>
        </Row>

        <Row className="bi-row">
          <Col span={6}>
            <span className="primary-text fs-120">Subscription</span>
          </Col>
          <Col span={6} className="bi-value">
            <span className="primary-text fs-120">Package 2</span>
          </Col>
        </Row>

        <Row className="bi-row">
          <Col span={6}>
            <span className="primary-text fs-120">Tax percentage</span>
          </Col>
          <Col span={6} className="bi-value">
            <span className="primary-text fs-120">
              {data.businessInfoSettings.tax}%
            </span>
          </Col>
        </Row>
      </div>

      <br />
      <br />

      <h2 className="primarytext primary-text-heading">Password Settings</h2>
      <div className="business-info-list">
        <Row className="bi-row">
          <Col span={12}>
            <span className="primary-text fs-120">Password</span>
          </Col>
          <Col span={12} className="bi-value">
            <Space size={20}>
              <Button onClick={onChangePasswordModal}>Change Password</Button>
            </Space>
          </Col>
        </Row>
      </div>

      <br />
      <br />
      {getUserFromLocalStorage() !== "Individual" &&
        <>
          <h2 className="primarytext primary-text-heading">Payment Methods</h2>
          <div className="business-info-payment-method">
            <Row gutter={5}>
              <Col span={8}>
                <Cart title={"Bank Account"} extra={<EditOutlined onClick={() => { setcurrPaymentMethodType('bankAccount'); setpaymentMethodModal(true) }} />}>
                  <Space direction={'vertical'}>
                    <div>
                      <p className="key-name">Bank Name</p>
                      <p className="key-value">{data.paymentInformation.bankAccount.bankName}</p>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p className="key-name">Account Title</p>
                      <p className="key-value">{data.paymentInformation.bankAccount.accountTitle}</p>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p className="key-name">Account Number</p>
                      <p className="key-value">{data.paymentInformation.bankAccount.accountNumber}</p>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p className="key-name">Routing Number</p>
                      <p className="key-value">{data.paymentInformation.bankAccount.routingNumber}</p>
                    </div>
                  </Space>
                </Cart>
              </Col>
              <Col span={8}>
                <Cart title={"Paypal"} extra={<EditOutlined onClick={() => { setcurrPaymentMethodType('paypal'); setpaymentMethodModal(true) }} />}>
                  <Space direction={'vertical'}>
                    <div>
                      <p className="key-name">Account ID</p>
                      <p className="key-value">{data.paymentInformation.paypal.id}</p>
                    </div>
                  </Space>
                </Cart>
              </Col>
              <Col span={8}>
                <Cart title={"Stripe"} extra={<EditOutlined onClick={() => { setcurrPaymentMethodType('stripe'); setpaymentMethodModal(true) }} />}>
                  <Space direction={'vertical'}>
                    <div>
                      <p className="key-name">Account ID</p>
                      <p className="key-value">{data.paymentInformation.stripe.id}</p>
                    </div>
                  </Space>
                </Cart>
              </Col>
            </Row>
          </div>
        </>
      }
      <ChangePasswordModal
        onChangePasswordModal={onChangePasswordModal}
        modalpassword={modalpassword}
      />
      <Modal visible={editModal} footer={null} closable={false} centered>
        <div>
          <Title level={3} className="primarytext primary-text-heading">
            Account Settings
          </Title>
        </div>
        <Form form={form}
          onFinish={finishEditInformation}
          initialValues={{
            ["name"]: data.name,
            ["tax"]: data.businessInfoSettings.tax,
          }}
        >
          {/* <CardElement options={CARD_OPTIONS} /> */}
          <Form.Item
            style={{ marginTop: 10 }}
            name="name" label="Name"
            rules={[
              { required: true, message: "Please input name!" },
              { max: 50, message: "Maximum 50 characters are required!" },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Tax"
            style={{ marginTop: 10, marginLeft: 10 }}
            name="tax"
            addonAfter={<div>%</div>}
            rules={[{ required: true, message: "Please input tax!" }]}
          >
            <Input placeholder="Enter your tax" />
          </Form.Item>

          <Space>
            <Button
              onClick={() => { form.resetFields(); setEditModal(false) }}
              className="secondary-button"
            >
              Discard
            </Button>
            <Button type="submit" htmlType="submit">
              Add
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal visible={paymentMethodModal} footer={null} closable={false} centered>
        <div>
          <Title level={3} className="primarytext primary-text-heading">
            {currPaymentMethodType === 'bankAccount' && 'Bank Account Information'}
            {currPaymentMethodType === 'paypal' && 'Paypal Account Information'}
            {currPaymentMethodType === 'stripe' && 'Stripe Account Information'}
          </Title>
        </div>
        {
          currPaymentMethodType === 'bankAccount' && (
            <Form formSecond={formSecond}
              onFinish={finishPaymentMethod}
              initialValues={{
                ["bankName"]: data.paymentInformation.bankAccount.bankName,
                ["accountTitle"]: data.paymentInformation.bankAccount.accountTitle,
                ["accountNumber"]: data.paymentInformation.bankAccount.accountNumber,
                ["routingNumber"]: data.paymentInformation.bankAccount.routingNumber,
              }}
            >
              {/* <CardElement options={CARD_OPTIONS} /> */}
              <Form.Item
                style={{ marginTop: 10 }}
                name="bankName" label="Bank Name"
                rules={[
                  { required: true, message: "Please input Bank Name!" },
                ]}
              >
                <Input placeholder="Enter Bank Name" />
              </Form.Item>
              <Form.Item
                style={{ marginTop: 10 }}
                name="accountTitle" label="Account Title"
                rules={[{ required: true, message: "Please input account title!" }]}
              >
                <Input placeholder="Enter account title" />
              </Form.Item>
              <Form.Item
                style={{ marginTop: 10 }}
                name="accountNumber" label="Account Number"
                rules={[{ required: true, message: "Please input account number!" },
                { pattern: new RegExp(/^[0-9]{5,30}$/), message: "Invalid account number" }]}
              >
                <Input placeholder="Enter account number" />
              </Form.Item>
              <Form.Item
                style={{ marginTop: 10 }}
                name="routingNumber" label="Routing Number"
                rules={[{ required: true, message: "Please input routing number!" }]}
              >
                <Input placeholder="Enter routing number" />
              </Form.Item>

              <Space>
                <Button
                  onClick={() => { formSecond.resetFields(); setpaymentMethodModal(false) }}
                  className="secondary-button"
                >
                  Discard
              </Button>
                <Button type="submit" htmlType="submit">
                  Add
              </Button>
              </Space>
            </Form>
          )
        }
        {
          currPaymentMethodType === 'paypal' && (
            <Form form={formPaypal}
              onFinish={finishPaymentMethod}
              initialValues={{
                ["id"]: data.paymentInformation.paypal.id,
              }}
            >
              {/* <CardElement options={CARD_OPTIONS} /> */}
              <Form.Item
                style={{ marginTop: 10 }}
                name="id" label="Account Id"
                rules={[
                  { required: true, message: "Please input Account ID!" },
                  { pattern: new RegExp(/^[0-9]{17}$/), message: "Invalid paypal Id!" }
                ]}
              >
                <Input placeholder="Enter Account Ids" />
              </Form.Item>

              <Space>
                <Button
                  onClick={() => { formPaypal.resetFields(); setpaymentMethodModal(false) }}
                  className="secondary-button"
                >
                  Discard
              </Button>
                <Button type="submit" htmlType="submit">
                  Add
              </Button>
              </Space>
            </Form>
          )
        }
        {
          currPaymentMethodType === 'stripe' && (
            <Form
              onFinish={finishPaymentMethod}
              initialValues={{
                ["id"]: data.paymentInformation.paypal.id,
              }}
            >
              {/* <CardElement options={CARD_OPTIONS} /> */}
              <Form.Item
                style={{ marginTop: 10 }}
                name="id" label="Account Id"
                rules={[
                  { required: true, message: "Please input Account ID!" },
                  { pattern: new RegExp(/^[0-9]{16}$/), message: "Invalid account id" }

                ]}
              >
                <Input placeholder="Enter Account Id" />
              </Form.Item>

              <Space>
                <Button
                  onClick={() => { form.resetFields(); setpaymentMethodModal(false) }}
                  className="secondary-button"
                >
                  Discard
              </Button>
                <Button type="submit" htmlType="submit">
                  Add
              </Button>
              </Space>
            </Form>
          )
        }


      </Modal>


    </div>
  );
}

export default BusinessInfoRrenderer;
