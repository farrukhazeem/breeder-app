import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Space,
  Form,
  Select,
  Divider,
  Tabs,
  List,
  Modal,
  message,
} from "antd";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import Card from "../../../components/card/card";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import CustomerModal from "./CustomerModal";
import "./SalesManagement.scss";
import { useDispatch } from "react-redux";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import { getSale, graphData, payInstallment, softRemoveInvoice, invoiceReminderEmail } from "../../../redux/actions/sales_action";
import moment from "moment";
import InvoiceTemplate from "../../../components/Invoice";
import jsPDF from "jspdf";
import Html2Canvas from 'html2canvas';
import { getAllBreeder } from "../../../redux/actions/user_actions";
import constants from "../../../config/constants";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const types = ["All time", "Today", "This week", "This year"];


function SalesManagement(props) {
  const [modalCustomervisible, setmodalCustomervisible] = useState(false);
  const [saleData, setSaleData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [selectedTime, setSelectedTime] = useState('All time');
  const [tabIndex, setTabIndex] = useState(1);
  const [filterSalesHistory, setfilterSalesHistory] = useState([])
  //const [graphData, setgraphData] = useState([]);

  const [viewInvioceModalVisible, setviewInvioceModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState({ upcomingPayment: '', saleHistory: '', customer: '', invoice: '' });
  const [breederId, setBreederId] = useState(localStorage.getItem('userId'));
  const [graphChartData, setgraphChartData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getData("upcomming", selectedTime);

    getGraphData(breederId, 'all', null, null);
    getBreedersForCustomer('');
  }, []);



  useEffect(() => {
    if (filterSalesHistory.length > 1) {
      let data = []
      let count = filterSalesHistory.map(e => e.price)
      let name = filterSalesHistory.map((e, index) => index + 1)
      for (let index = 0; index < count.length; index++) {
        data.push({ "price": count[index], "name": name[index] })
      }
      //setgraphData(data)
    }
  }, [filterSalesHistory])


  const getBreedersForCustomer = (keyword) => {
    dispatch(EnableLoader());
    dispatch(getAllBreeder(keyword)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setCustomerData(
          response.payload.data.filter((e) => !(e._id === props.user._id))
        );
      }
    });
  }
  const mapData = (data) => {
    return { ...data, name: `${data._id.day} ${constants.months[data._id.month]}`, Amount: data.amount };
    // return {...data, name: `${constants.months[data._id.month]}`, count: data.amount};
  }
  const getGraphData = (breederId, type, startDate, endDate) => {
    dispatch(EnableLoader());
    dispatch(graphData(breederId, type, startDate, endDate)).then(response => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setgraphChartData(response.payload.data.map(e => mapData(e)));
        console.log(response.payload.data.map(e => mapData(e)));
      }
    });
  }





  const getData = (type, saleTime) => {
    let time = saleTime;
    let startDate, endDate;
    if (saleTime === 'All time') {
      time = 'all';
      startDate = 'all';
      endDate = 'all';
    } else if (saleTime === 'Today') {
      startDate = moment(new Date()).format('YYYY-MM-DD');
      endDate = startDate;
    } else if (saleTime === 'This week') {
      startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
      endDate = moment(new Date()).format('YYYY-MM-DD');
      console.log('Start Date : ', startDate, ' End Date : ', endDate);
    } else if (saleTime === 'This year') {
      startDate = moment().startOf('year').format('YYYY-MM-DD');
      endDate = moment(new Date()).format('YYYY-MM-DD');
      console.log('Start Date : ', startDate, ' End Date : ', endDate);
    }







    dispatch(EnableLoader());
    setIsLoading(true);
    dispatch(getSale(type, time, startDate, endDate)).then((response) => {
      setIsLoading(false);
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        if (type === "invoice") {
          setInvoices(response.payload.data);
        } else {
          setSaleData(response.payload.data);
          setfilterSalesHistory(response.payload.data)
        }
      }
    });
  };

  const ChangeModalCustomer = () => {
    setmodalCustomervisible(!modalCustomervisible);
  };

  const operations = () => {
    return (
      <Button
        className="secondary-button width-123"
        onClick={() => props.history.push("/sales/new-sale")}
      >
        Add new sale
      </Button>
    );
  };

  const upcomingPayments = () => {
    const filterData = (data) => {
      if (!searchKeyword.upcomingPayment) return data;
      if (!(data.saleUniqueId.toString().toLowerCase().search(searchKeyword.upcomingPayment.toLowerCase()) === -1)) return data;
      if (!(data.totalPrice.toString().toLowerCase().search(searchKeyword.upcomingPayment.toLowerCase()) === -1)) return data;
      if (!(data.buyerId.name.toString().toLowerCase().search(searchKeyword.upcomingPayment.toLowerCase()) === -1)) return data;
      if (!(data.buyerId.email.toString().toLowerCase().search(searchKeyword.upcomingPayment.toLowerCase()) === -1)) return data;
      return null;
    }
    return (
      <div className="sale-mag-upcomming-payment-body">
        <Input
          placeholder="What are you looking for?"
          className="greybuttonsearch2"
          prefix={<SearchOutlined />}
          value={searchKeyword.upcomingPayment}
          onChange={(ev) => setSearchKeyword({ ...searchKeyword, upcomingPayment: ev.target.value })}
        />
        <div>{orderCard(saleData.filter(filterData), true)}</div>
      </div>
    );
  };

  const saleHistory = () => {
    const filterData = (data) => {
      if (!searchKeyword.saleHistory) return data;
      if (!(data.saleUniqueId.toString().toLowerCase().search(searchKeyword.saleHistory.toLowerCase()) === -1)) return data;
      if (!(data.totalPrice.toString().toLowerCase().search(searchKeyword.saleHistory.toLowerCase()) === -1)) return data;
      if (!(data.buyerId.name.toString().toLowerCase().search(searchKeyword.saleHistory.toLowerCase()) === -1)) return data;
      if (!(data.buyerId.email.toString().toLowerCase().search(searchKeyword.saleHistory.toLowerCase()) === -1)) return data;
      return null;
    }



    return (
      <div className="sale-mag-sale-history-body">
        <Input
          placeholder="What are you looking for?"
          className="greybuttonsearch2"
          prefix={<SearchOutlined />}
          value={searchKeyword.saleHistory}
          onChange={(ev) => setSearchKeyword({ ...searchKeyword, saleHistory: ev.target.value })}
        />
        {graphChartData && graphChartData.length > 0 ?
          <div className="chart">
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={graphChartData}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Amount ($)', angle: '-90', dx: -24 }} />
                <Tooltip />
                <Bar
                  dataKey="Amount"

                  barSize={12}
                  background={"gray"}
                  radius={[20, 20, 0, 0]}
                  fill="#503A9F"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          :
          null}

        <div>{/* Image here ... */}</div>
        <div>{orderCard(saleData.filter(filterData))}</div>
      </div>
    );
  };

  const customersRenderer = () => {
    const filterData = (data) => {
      if (!searchKeyword.customer) return data;
      if (!(data.email.toString().toLowerCase().search(searchKeyword.customer.toLowerCase()) === -1)) return data;
      if (!(data.city.toString().toLowerCase().search(searchKeyword.customer.toLowerCase()) === -1)) return data;
      if (!(data.state.toString().toLowerCase().search(searchKeyword.customer.toLowerCase()) === -1)) return data;
      if (!(data.name.toString().toLowerCase().search(searchKeyword.customer.toLowerCase()) === -1)) return data;
      if (!(data.phone.toString().toLowerCase().search(searchKeyword.customer.toLowerCase()) === -1)) return data;

      return null;
    }
    return (
      <div className="sale-mag-customers-body">
        <Row>
          <Col span={12}>
            <Input
              placeholder="What are you looking for?"
              className="greybuttonsearch2"
              prefix={<SearchOutlined />}
              value={searchKeyword.customer}
              onChange={(ev) => setSearchKeyword({ ...searchKeyword, customer: ev.target.value })}
            />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button
              onClick={() => ChangeModalCustomer()}
              className="secondary-button"
            >
              + Add Contact
            </Button>
          </Col>
        </Row>

        <div>
          {/* {orderCard(paymentOrders, true)} */}
          {customerList(filterData)}
        </div>

        <CustomerModal
          modalCustomervisible={modalCustomervisible}
          ChangeModalCustomer={ChangeModalCustomer}
          getBreedersForCustomer={getBreedersForCustomer}
        />
      </div>
    );
  };

  const customerList = (filterData) => {
    return (
      <List
        size="large"
        dataSource={customerData.filter(filterData)}
        renderItem={(item) => <List.Item>{customerItem(item)}</List.Item>}
      />
    );
  };

  const customerItem = (item) => {
    return (
      <Row className="customer-item sales-mg-data-grid">
        <Col span={18}>
          <Link to={{ pathname: "/sales/customer/profile", state: { item } }}>
            <Row gutter={20}>
              <Col span={7}>
                <Space direction="vertical">
                  <Text className="secondary-text">Name</Text>
                  <Text strong className='primary-color'>{item.name}</Text>
                </Space>
              </Col>
              <Col span={7}>
                <Space direction="vertical">
                  <Text className="secondary-text">Email</Text>
                  <Text>{item.email}</Text>
                </Space>
              </Col>
              <Col span={7}>
                <Space direction="vertical">
                  <Text className="secondary-text">Phone</Text>
                  <Text>{item.phone}</Text>
                </Space>
              </Col>
              {/* <Col>
                <Space direction="vertical">
                  <Text className="secondary-text">Total Purchase</Text>
                  <Text>{item.totalPurchase}</Text>
                </Space>
              </Col> */}
            </Row>
          </Link>
        </Col>
        <Col span={6} className="action-btn-col">
          <Space>

            <Button className="inner-primary-btn primary-background primary-contrast-text">
              <Link to={{ pathname: "/sales/customer/profile", state: { item } }}>View Profile</Link>
            </Button>
          </Space>
        </Col>
      </Row>
    );
  };

  const invoicesRenderer = () => {
    return (
      <div className="sale-mag-invoice-body">
        <Input
          placeholder="What are you looking for?"
          className="greybuttonsearch2"
          prefix={<SearchOutlined />}
          value={searchKeyword.invoice}
          onChange={(ev) => setSearchKeyword({ ...searchKeyword, invoice: ev.target.value })}
        />
        <div>{/* Image here ... */}</div>
        <div>{invoiceList()}</div>
      </div>
    );
  };


  const invoiceFilterData = (data) => {

    if (!searchKeyword.invoice) return data;
    if (!(data.invoiceNumber.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
    if (!(data.buyerId.name.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
    if (!(data.saleId.saleUniqueId.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;

    if (data.installmentId) {
      if (data.installmentId.isPaid) {
        if (!('paid'.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
      } else {
        if (!('due'.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
      }
    } else {
      if (data.saleId.isPaid) {
        if (!('paid'.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
      } else {
        if (!('due'.toString().toLowerCase().search(searchKeyword.invoice.toLowerCase()) === -1)) return data;
      }
    }

    return null;
  }

  const invoiceList = () => {
    return (
      <div>
        <List
          size="large"
          dataSource={invoices.filter(invoiceFilterData)}
          renderItem={(item) => <List.Item>{invoiceItem(item)}</List.Item>}
        />
        {/* <div style={{ width: "100%", textAlign: "center" }}>
            <Pagination
              style={{ width: "100%" }}
              simple
              defaultCurrent={2}
              total={50}
            />
          </div> */}
      </div>
    );
  };

  const tabChangeEvent = (event) => {
    console.log(event);
    setTabIndex(event);
    if (event == 1) getData("upcomming", selectedTime);
    if (event == 2) getData("history", selectedTime);
    if (event == 4) getData("invoice", selectedTime);
    // if(event === 4) getData('invoice')
    return;
  };

  const downloadInvoice = () => {

    const input = document.getElementById('page-wrap-invoice');
    Html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, -100, -100);
      pdf.save("download.pdf");

    });
    // var doc = new jsPDF();

    // doc.fromHTML(ReactDOM.render(<InvoiceTemplate data={selectedInvoice} />));
    // doc.save('mydocument.pdf');
  }

  const payInvoice = (invoice) => {
    if (invoice.installmentId) {
      dispatch(EnableLoader());
      dispatch(payInstallment(invoice.installmentId._id, invoice.saleId._id, "installment")).then(response => {
        dispatch(DisableLoader());
        console.log(response);
        getData('invoice', selectedTime);
        setviewInvioceModalVisible(false);
      })
    } else {
      console.log('in else');
      dispatch(EnableLoader());
      dispatch(payInstallment(invoice.saleId._id, invoice.saleId._id, "sale")).then(response => {
        dispatch(DisableLoader());
        console.log(response);
        getData('invoice', selectedTime);
        setviewInvioceModalVisible(false);
      })
    }
  }

  const ViewInvoice = () => {
    return (
      <Modal
        visible={viewInvioceModalVisible && selectedInvoice}
        footer={null}
        closable={false}
        centered
        width={850}
      >
        {/* || (!selectedInvoice.installmentId && !selectedInvoice.saleId.isPaid) */}
        {selectedInvoice &&
          (selectedInvoice.installmentId ?
            ((selectedInvoice.installmentId && !selectedInvoice.installmentId.isPaid)) && (<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button className="secondary-button" onClick={() => payInvoice(selectedInvoice)}>
                Mark as paid
            </Button>
            </Space>) :
            ((!selectedInvoice.saleId.isPaid)) && (<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button className="secondary-button" onClick={() => payInvoice(selectedInvoice)}>
                Mark as paid
          </Button>
            </Space>)
          )

        }

        <InvoiceTemplate data={selectedInvoice} />
        <Space style={{ marginTop: 20 }}>
          <Button className="secondary-button" onClick={() => setviewInvioceModalVisible(false)}>
            Cancel
          </Button>
          <Button className="secondary-button" onClick={() => downloadInvoice(false)}>
            Download
          </Button>
        </Space>
      </Modal>
    );
  };

  const onSoftDeleteInvoice = (id) => {
    dispatch(EnableLoader());
    dispatch(softRemoveInvoice(id)).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getData("invoice", selectedTime);
      }
    });
  }

  const InvoiceReminderEmail = (data) => {
    dispatch(EnableLoader());
    dispatch(invoiceReminderEmail(data)).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message)
      }
      else {
        message.error(response.payload.message)
      }
    });
  }

  const invoiceItem = (item) => {
    // debugger
    return (
      <Row className="invoice-item sales-mg-data-grid">
        <Col span={18}>
          <Row gutter={20}>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Invoice Number</Text>
                <Text>{item.invoiceNumber}</Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Client Name</Text>
                <Text>{item.buyerId.name}</Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Date</Text>
                <Text>{moment(item.createdAt).format("DD MMM, YYYY")}</Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Amount</Text>
                <Text>
                  ${item.installmentId ? item.installmentId.amount : item.saleId.totalPrice}
                  {/* $
                  {item.saleId.price +
                    item.saleId.price * (item.saleId.tax / 100)} */}
                </Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Status</Text>
                <Text>{item.installmentId ? (item.installmentId.isPaid ? 'Paid' : 'Due') : (item.saleId.isPaid ? "Paid" : "Due")}</Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Type</Text>
                <Text>{item.installmentId ? 'Installment' : 'Sales'}</Text>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Text className="secondary-text">Sale Id</Text>
                <Text>{item.saleId.saleUniqueId}</Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={6} className="action-btn-col">
          <Space>
            {item.installmentId && !item.installmentId.isPaid ||
              !item.saleId.isPaid ?
              < Button onClick={() => InvoiceReminderEmail(item)}>Send invoice reminder</Button>
              : null
            }
            <Button
              className="inner-primary-btn primary-background primary-contrast-text"
              onClick={() => {
                setviewInvioceModalVisible(true);
                setSelectedInvoice(item);
              }}
            >
              View
            </Button>
            {/* <Button onClick={() => onSoftDeleteInvoice(item._id)} className="inner-primary-btn primary-background primary-contrast-text">
              Remove
            </Button> */}
          </Space>
        </Col>
      </Row >
    );
  };

  const orderCard = (data, isInvoiceReminder = false) => (
    <div>
      {data[0] ? (
        data.map((item) => (
          <Card className="order-card">
            <Row>
              <Col span={20}>
                <Space direction="vertical">
                  <Title level={4}>{item.saleUniqueId}</Title>
                  <Text className="secondary-text" strong>
                    Sold on:{" "}
                    <Text strong>
                      {moment(item.createdAt).format("DD MMM, YYYY")}
                    </Text>
                  </Text>
                  <Text className="secondary-text" strong>
                    Total amount:{" "}
                    <Text strong>
                      {/* {item.price + item.price * (item.tax / 100)} */}
                      ${item.totalPrice}
                    </Text>
                  </Text>
                  <Text className="secondary-text">
                    Sold to: <Text>{item.buyerId.name}</Text>
                  </Text>
                </Space>
              </Col>
              <Col span={4} className="action-detail">
                <Space>
                  <Button
                    className="inner-primary-btn primary-background primary-contrast-text"
                    onClick={() => {
                      props.history.push({
                        pathname: "/sales/order-detail",
                        state: { id: item._id },
                      });
                    }}
                  >
                    Details
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
          <></>
        )}
    </div>
  );

  const handleChangetime = (value) => {
    console.log(value);
    if (tabIndex == 1) getData("upcomming", value);
    if (tabIndex == 2) getData("history", value);
    if (tabIndex == 4) getData("invoice", value);
  }

  return (
    <div className="sale-mag-main">
      <Row>
        <Col span={8}>
          <h2 className="primary-text primary-text-heading">
            Sales Management
          </h2>
        </Col>
        <Col span={8}>
          <h2 className="secondary-text primary-text-heading">
            Total Sales: <span className="primary-text">${saleData.reduce((acc, cv) => acc + parseInt(cv.totalPrice), 0)}</span>
          </h2>
        </Col>
        <Col span={8}>
          <Row gutter={12}>
            <Col span={16} style={{ textAlign: "right", marginTop: 9 }}>
              <Text strong>Showing sales from</Text>
            </Col>
            <Col span={8}>
              <Form.Item name="status">
                <Select
                  defaultValue="All time"
                  placeholder="Select time"
                  className="customSelect"
                  onChange={handleChangetime}
                >
                  {types.map((name) => (
                    <Option value={name}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{ margin: "auto" }} />

      {/* <Row>
                <Col span={20} > */}
      <Tabs tabBarExtraContent={operations()} onChange={tabChangeEvent}>
        <TabPane tab="Upcoming Payments" key="1">
          {upcomingPayments()}
        </TabPane>
        <TabPane tab="Sales History" key="2">
          {saleHistory()}
        </TabPane>
        <TabPane tab="Customers" key="3">
          {customersRenderer()}
        </TabPane>
        <TabPane tab="Invoices" key="4">
          {invoicesRenderer()}
        </TabPane>
      </Tabs>
      {/* </Col>
                <Col span={4} className="opration-col">
                   
                </Col> */}
      {/* </Row> */}
      {ViewInvoice()}
    </div>
  );
}

export default SalesManagement;
