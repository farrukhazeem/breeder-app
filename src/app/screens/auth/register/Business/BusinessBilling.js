import React, { useState } from "react";
import { Form, Row, Col, message, Typography } from "antd";
import Button from "../../../../components/button/button";
import Input from "../../../../components/input/input";
// import "./paymentInfo.css";
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import PackagesModal from './PackagesModal'

function BusinessBilling(props) {
    const { onFinishBillingInformation, setFormClick, formClick, setCurrentIndex, registerSteps } = props;
    const [name, setName] = useState('');
    const [visible, setvisible] = useState(null);
    const [currSubscription, setcurrSubscription] = useState(null);
    const [currSubscriptionType, setcurrSubscriptionType] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (!name) return message.error('Name is required!');
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        // formData.name = name;
        // const data = { name };
        const data = {};
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
        if (!currSubscription) {
            return message.error("Please Select Package");
        }
        onFinishBillingInformation({ ...data, packageId: currSubscription._id, type: currSubscriptionType })
        // dispatch(EnableLoader());
        // dispatch(createCardCustomer(data)).then((response) => {
        //     dispatch(DisableLoader());
        //     if (response.payload.status === 200) {
        //         setCardModal(false);
        //         getData()
        //         setName('');
        //         message.success(response.payload.message);
        //     }
        //     else {
        //         message.error(response.payload.message);
        //     }
        // })

    }

    const {
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps, meta
    } = usePaymentInputs();

    return (
        <>
            <h2 style={{ marginTop: 10 }}>Package Payment will be auto charge after 15 days.</h2>
            <form onSubmit={handleSubmit}>
                {/* <Form.Item
                    style={{ marginTop: 10 }}
                    name="name"
                >
                    <Input onChange={(value) => { setName(value.target.value); }} placeholder="Enter Name on Card" />
                </Form.Item> */}
                <div style={{ marginTop: 15 }}></div>
                <PaymentInputsWrapper >
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps()} style={{ marginLeft: 25 }} />
                    <input {...getExpiryDateProps()} style={{ marginLeft: 73 }} />
                    <input {...getCVCProps()} style={{ marginLeft: 73 }} />
                </PaymentInputsWrapper>
                <div style={{ marginTop: 20 }}></div>


                <Row justify="space-between">
                    <div className="primarytext" style={{ marginTop: 20 }}>Package Selected :
                    <b> {currSubscription?.name} </b>
                    </div>
                    <Button className="register-form-button secondary-button"
                        onClick={() => setvisible(true)} >
                        {currSubscription ? "Change" : "Select"} Package
                    </Button>
                </Row>

                <Row gutter={5}>
                    <Col span={6}>
                        <Button
                            className="register-form-button backButton secondary-button"
                            onClick={() => { setCurrentIndex(registerSteps[1]); }}  >
                            Back
                            </Button>
                    </Col>
                    <Col span={18}>
                        <Button type="submit" htmlType="submit"
                            className="register-form-button secondary-button"
                            onClick={() =>
                                setFormClick({
                                    ...formClick, ...{ billingInformationClick: true },
                                })} >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </form>


            <PackagesModal visible={visible} setvisible={setvisible}
                setcurrSubscription={setcurrSubscription} currSubscription={currSubscription}
                setcurrSubscriptionType={setcurrSubscriptionType} currSubscriptionType={currSubscriptionType} />

        </>
    );
}

export default BusinessBilling;
