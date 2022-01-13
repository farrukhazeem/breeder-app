import React, { useState, useEffect } from "react";
import { Typography, List, Space, message, Modal, Radio, Row, Col } from "antd";
import Card from "../../components/card/card";
import Button from "../../components/button/button";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  getSubscriptions,
  createSubscriberSimple,
} from "../../redux/actions/subscription_action";
//import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action'
import { useDispatch } from "react-redux";
import "./Subscription.scss";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { getSubscribedPackageOfBreeder } from "../../redux/actions/subscription_action";
import {
  getBreederEmployees,
  itemCount,
} from "../../redux/actions/user_actions";
import ChangePackageWizard from "./ChangePackageWizard";
import { getProduct } from "../../redux/actions/product_action";
import { getAnimals } from "../../redux/actions/animal_action";
import BusinessBilling from './BusinessBilling'
import { auth } from "../../redux/actions/user_actions";
import ConfirmCheckout from './ConfirmCheckout'

const { Title } = Typography;

function Subscription(props) {
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false)

  const [allsubscriptions, setallsubscriptions] = useState([]);
  const [subscription, setsubscription] = useState({ subscriptionId: "" });
  const [currSubscription, setCurrentSubscription] = useState();
  const [
    changePackageWizardModalEnable,
    setchangePackageWizardModalEnable,
  ] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [products, setProduct] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [dataCount, setDataCount] = useState({});
  const [tabIndex, setTabIndex] = useState("monthly");

  useEffect(() => {
    ListSubscription();
    getSubscribedPackage();
    // getItemsCount();
  }, []);

  const getItemsCount = async () => {
    return new Promise((resolve, reject) => {
      dispatch(itemCount()).then((response) => {
        resolve(response);
      });
    });
  };

  const getSubscribedPackage = () => {
    dispatch(EnableLoader());
    dispatch(
      getSubscribedPackageOfBreeder(localStorage.getItem("userId"))
    ).then((response) => {
      dispatch(DisableLoader());
      console.log(response, "getSubscribedPackageOfBreeder");
      if (response.payload.status === 200) {
        setCurrentSubscription(response.payload.data);
      }
    });
  };

  const ListSubscription = () => {
    dispatch(getSubscriptions()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setallsubscriptions(response.payload.data);
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const getAnimalsData = () => {
    console.log("fetchnig animal");
    return new Promise((resolve, reject) => {
      dispatch(getAnimals()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          setAnimal(response.payload.data);
          resolve(response.payload.data);
        }
      });
    });
  };

  const getProductsData = () => {
    return new Promise((resolve, reject) => {
      dispatch(getProduct()).then((response) => {
        if (response.payload.status === 200) {
          setProduct(response.payload.data);
          console.log(response.payload.data, "<<--product");
          resolve(response.payload.data);
        }
      });
    });
  };

  const getEmployeeData = () => {
    console.log("fetchnig employee");
    return new Promise((resolve, reject) => {
      dispatch(getBreederEmployees()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          setEmployee(response.payload.data);
          resolve(response.payload.data);
        }
      });
    });
  };

  const SubscribePackage = (data) => {
    dispatch(EnableLoader());
    dispatch(createSubscriberSimple(data)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setvisible(false); setdetail({});
        // message.success(response.payload.message)
        setchangePackageWizardModalEnable(false);
        Modal.success({
          title: "Package Changed Successfully!",
          content: "Package has been updated successfully!"//response.payload.message,
        });
        setsubscription({
          ...subscription,
          ...{ subscriptionId: response.payload.data.subscriptionId },
        });
        getSubscribedPackage();
        getData()
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const [detail, setdetail] = useState({})

  const subscribeClicked = async (data) => {
    dispatch(EnableLoader());
    setdetail(data)
    // const onOkClicked = async () => {
    const resultCount = await getItemsCount();
    // alert(resultCount.payload.data.productCount);
    if (
      resultCount.payload.data.animalCount > data.allowedAnimal ||
      resultCount.payload.data.employeeCount > data.allowedEmp ||
      resultCount.payload.data.productCount > data.allowedProduct
    ) {
      // message.error('You are not allowed');
      setDataCount(resultCount.payload.data);
      dispatch(EnableLoader());
      Promise.all([
        getAnimalsData(),
        getProductsData(),
        getEmployeeData(),
      ]).then(([myanimals, myproducts, myemployees]) => {
        dispatch(DisableLoader());
        setSelectedPackage(data);
        setchangePackageWizardModalEnable(true);
      });
    } else {
      dispatch(DisableLoader());
      setvisible(true)
      return

    }
    //};
    // Modal.confirm({
    //   title: "Change Package",
    //   content: "Are you sure you want to change the package?",
    //   onOk: onOkClicked,
    // });
  };


  const creditCard = props.user?.userData?.data?.creditCard ? props.user?.userData?.data.creditCard[0] : null;
  const changePkg = () => {
    SubscribePackage({
      type: tabIndex,
      subscriptionId: detail._id,
      userType: "breeder",
    });
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    dispatch(EnableLoader());
    dispatch(auth()).then(response => {
      dispatch(DisableLoader())
    });
  }

  const SubscriptionPackageInfo = (data) => {

    return (
      // <Card className={data._id === packageValue.packageId ? "primary-background" : ""}>
      <Card
        style={{ height: 335 }}
        className={
          currSubscription && currSubscription.subscriptionId?._id === data._id
            && currSubscription.type === tabIndex
            ? "primary-background"
            : ""
        }
        key={data._id}
      >
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical">
            {/* <img className="textAlign-sm-box" width={'20'} src={require(`../../../assets/images/subscription/${data.icon}`)} alt="Logo" /> */}
            {/* <Title className={data._id === packageValue.packageId ? "white-text" : ""} level={4}>{data.name}</Title> */}
            {/* <div className={data._id === packageValue.packageId ? "white-text fs-150" : "secondary-text fs-150"}>${data.pricePerMonth}/month</div> */}
            <Space>
              <Title
                className={
                  currSubscription &&
                    currSubscription.subscriptionId._id === data._id
                    && currSubscription.type === tabIndex
                    ? "white-text"
                    : ""
                }
                level={2}
              >
                {data.type}
              </Title>
              {currSubscription &&
                currSubscription.subscriptionId._id === data._id
                && currSubscription.type === tabIndex
                ? (
                  <img
                    src={require(`../../../assets/images/icons/completed.png`)}
                    style={{ width: 25, height: 25, borderRadius: 20 }}
                  />
                ) : (
                  <div></div>
                )}
            </Space>
            <Title
              className={
                currSubscription &&
                  currSubscription.subscriptionId._id === data._id
                  && currSubscription.type === tabIndex
                  ? "white-text"
                  : ""
              }
              level={4}
            >
              {data.name}
            </Title>
            <div
              className={
                currSubscription &&
                  currSubscription.subscriptionId._id === data._id
                  && currSubscription.type === tabIndex
                  ? "white-text fs-150"
                  : ""
              }
            >
              <div className={"fs-130"}>$ {(tabIndex === 'monthly') ? data.monthlyPrice : (tabIndex === 'yearly') ? data.yearlyPrice : data.lifetimePrice}/ {(tabIndex === 'monthly') ? "month" : (tabIndex === 'yearly') ? "year" : "lifetime"}</div>
            </div>
          </Space>
        </div>

        <div
          style={{
            marginTop: 20,
            height: 110,
            ...(currSubscription &&
              currSubscription.subscriptionId._id === data._id
              ? { height: 120 }
              : { height: 140 }),
          }}
        >
          {/* <div className={data._id === packageValue.packageId ? "white-text" : ""}> */}
          <div
            className={
              currSubscription &&
                currSubscription.subscriptionId._id === data._id
                && currSubscription.type === tabIndex
                ? "white-text"
                : ""
            }
          >
            <p>
              <ArrowRightOutlined /> {data.description}
            </p>
            {data.allowedAnimal > 0 && (
              <p>
                <ArrowRightOutlined /> Allowed animal {data.allowedAnimal}
              </p>
            )}
            {data.allowedEmp > 0 && (
              <p>
                <ArrowRightOutlined /> Allowed employees {data.allowedEmp}
              </p>
            )}
            {data.allowedProduct > 0 && (
              <p>
                <ArrowRightOutlined /> Allowed products {data.allowedProduct}
              </p>
            )}
          </div>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
          {/* {(data._id === packageValue.packageId) ? (
                        <Button className="secondary-button" block disabled><CheckOutlined /> Activated</Button>
                    ) : (
                            <Button className="secondary-button" block onClick={() => { setPackageValue({ packageId: data.__id }) }}>Subscribe</Button>
                        )} */}
          <Button
            className="secondary-button"
            block
            disabled={
              currSubscription &&
              currSubscription.subscriptionId._id === data._id
              && currSubscription.type === tabIndex
            }
            onClick={() => {
              subscribeClicked(data);
            }}
          >
            {currSubscription &&
              currSubscription.subscriptionId._id === data._id
              && currSubscription.type === tabIndex
              ? "Subscribed"
              : "Subscribe"}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div>


      <h2 className="primary-text">
        {" "}
        <b className="primary-text-heading">Subscription </b>
      </h2>
      <div className="primary-text fs-120">
        Your <span style={{ fontWeight: 'bold' }}>{currSubscription ? currSubscription.subscriptionId.name : null}
        </span>{" "}
        ({currSubscription?.type})
           Package is Currently Activated.
      </div>

      <div className="setting-radio-btn-switch" style={{ marginTop: 20 }}>
        <Radio.Group
          value={tabIndex}
          onChange={(index) => {
            setTabIndex(index.target.value);
          }}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value={"monthly"}>Monthly</Radio.Button>
          <Radio.Button value={"yearly"}>Yearly</Radio.Button>
          <Radio.Button value={"lifetime"}>Lifetime</Radio.Button>
        </Radio.Group>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        className="subscription-list-main"
        dataSource={
          tabIndex === "monthly" ? allsubscriptions.filter(e => e.monthlyPrice || e.monthlyPrice === 0) :
            tabIndex === "yearly" ? allsubscriptions.filter(e => e.yearlyPrice || e.yearlyPrice === 0) :
              allsubscriptions.filter(e => e.lifetimePrice || e.lifetimePrice === 0)
        }
        renderItem={(item) => (
          <List.Item>{SubscriptionPackageInfo(item)}</List.Item>
        )}
      />

      <ChangePackageWizard
        visible={changePackageWizardModalEnable}
        closeModal={() => {
          setchangePackageWizardModalEnable(false);
          setSelectedPackage(null);
        }}
        animal={animal}
        product={products}
        employee={employee}
        counts={dataCount}
        refreshAnimal={() => getAnimalsData()}
        refreshProduct={() => getProductsData()}
        refreshEmployee={() => getEmployeeData()}
        subscribeClick={() => subscribeClicked(selectedPackage)}
        selectedPackage={selectedPackage}
        animalCountDiff={animal.length - selectedPackage?.allowedAnimal}
        productCountDiff={products.length - selectedPackage?.allowedProduct}
        employeeCountDiff={employee.length - selectedPackage?.allowedEmp}
      />


      <Modal visible={visible} footer={null} style={{ minWidth: 1000 }}
        closable={false}>
        {creditCard ?
          <ConfirmCheckout visible={visible} setvisible={setvisible} creditCard={creditCard}
            detail={detail} tabIndex={tabIndex} changePkg={changePkg} />
          :
          <BusinessBilling visible={visible} setvisible={setvisible}
            detail={detail} tabIndex={tabIndex} changePkg={changePkg} />
        }

      </Modal>

    </div>
  );
}

export default Subscription;
