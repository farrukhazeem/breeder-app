import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, Row, Col, Select, DatePicker, Space } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import SubDashboard from './SubDashboard'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import './Dashboard.scss';
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../redux/actions/loader_action';
import { dashbaordAnalysis } from '../../redux/actions/user_actions';
import { dashbaoardSale, graphData } from '../../redux/actions/sales_action';
import moment from 'moment';
import constants from '../../config/constants';

const { RangePicker } = DatePicker;

const { Option } = Select;


const names = [{ name: "Total animals", logo: "Total_Animals@2x.png", no: "2000", total: 'aliveQuantity' },
{ name: "Alive", logo: "Alive@2x.png", no: "200", total: 'aliveQuantity' },
{ name: "Sick", logo: "Sick@2x.png", no: "100", total: 'sickQuantity' },
{ name: "Dead", logo: "Dead@2x.png", no: "20", total: 'deadQuantity' },
{ name: "Pregnant", logo: "Pregnant@2x.png", no: "20", total: 'pregnantQuantity' },
]

const productNames = [{ name: "Total products", logo: "Total_Products@2x.png", no: "2000", total: 'goodCondition' },
{ name: "Good Condition", logo: "Good_Product@2x.png", no: "200", total: 'goodCondition' },
{ name: "Expired", logo: "Expired_Product@2x.png", no: "100", total: 'expired' },
{ name: "Damaged", logo: "Damaged_Product@2x.png", no: "20", total: 'damaged' },
{ name: "Sold", logo: "Product_Sold@2x.png", no: "20", total: 'sold' },
]

const sales = [{ name: 'Sold', logo: "Animal Sold@2x.png", no: "20", total: 'animalSold' },
// { name: 'Cancelled Sales', logo: "Canceled Sales@2x.png", no: "20", total: 'cancelledSales' },
{ name: 'Sales Amount', logo: "Sales Amount@2x.png", no: "$ 20", total: 'salesAmount' },
{ name: 'Amount Received', logo: "Amount Received@2x.png", no: "$ 20", total: 'amountReceived' },
{ name: 'Total Receivables', logo: "Total Receivables@2x.png", no: "$ 20", total: 'totalReceivables' },
]

const selecttime = [{ name: 'Custom', }, { name: 'Today', },
{ name: 'Yesterday', },
// { name: 'This week(Sun-Today)', },
{ name: 'Last 7 days', },
{ name: 'Last week', }, { name: 'Last 14 days', }, { name: 'Last 30 days', },
{ name: 'This month', }, { name: 'Last month', },
    // { name: 'All time', },
]

export default function Dashboard() {

    const [showrange, setshowrange] = useState("Last 7 days");
    const [breederId, setBreederId] = useState(localStorage.getItem('userId'));
    const [selectedType, setSelectedType] = useState('animal');
    const [animalData, setAnimalData] = useState({
        aliveQuantity: 0,
        animalSold: 0,
        deadQuantity: 0,
        pregnantQuantity: 0,
        sickQuantity: 0
    });

    const [productData, setProductData] = useState({
        expired: 0,
        goodCondition: 0,
        damaged: 0,
        sold: 0,
    })

    const [salesData, setSalesData] = useState({
        animalSold: 0,
        cancelledSales: 0,
        salesAmount: 0,
        amountReceived: 0,
        totalReceivables: 0,
    });

    const [dashboardGraphData, setdashboardGraphData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(EnableLoader());
        dispatch(dashbaordAnalysis("animal")).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                if (response.payload.data.animal[0]) {
                    setAnimalData(response.payload.data.animal[0])
                }
            }
        });
        getDashboardSale('animal');
        const startDate = moment(new Date((new Date()).setDate(new Date().getDate() - 7))).format('YYYY-MM-DD');
        const endDate = moment(new Date()).format('YYYY-MM-DD');
        console.log('Start Date : ', startDate, ' End Date : ', endDate);
        getGraphData(breederId, 'custom', startDate, endDate)
        // dispatch(graphData())
    }, []);


    const mapData = (data) => {
        // return {...data, name: `${data._id.day} ${constants.months[data._id.month]}`, count: data.amount};
        return { ...data, name: `${constants.months[data._id.month]}`, count: data.amount };

    }

    const getDashboardSale = (type) => {
        dispatch(EnableLoader());
        dispatch(dashbaoardSale(localStorage.getItem('userId'), type)).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                let data = response.payload.data;
                if (data) {
                    setSalesData({
                        animalSold: data.reduce((acc, cv) => acc + cv.animals.reduce((a_acc, a_cv) => a_acc + a_cv.quantity, 0), 0),
                        salesAmount: Math.round(data.reduce((acc, cv) => acc + cv.totalPrice, 0)),
                        amountReceived: Math.round(data.reduce((acc, cv) => {
                            if (cv.isInstallment) {
                                return acc + cv.installments.reduce((i_acc, i_cv) => {
                                    if (i_cv.isPaid) {
                                        return i_acc + i_cv.amount;
                                    } else {
                                        return i_acc;
                                    }
                                }, 0) + cv.downpayment;
                            } else {
                                if (cv.isPaid) {
                                    return acc + cv.totalPrice;
                                } else {
                                    return acc;
                                }
                            }
                        }, 0)),
                        totalReceivables: data.reduce((acc, cv) => {
                            if (cv.isInstallment) {
                                return acc + cv.installments.reduce((i_acc, i_cv) => {
                                    if (!i_cv.isPaid) {
                                        return i_acc + i_cv.amount;
                                    } else {
                                        return i_acc;
                                    }
                                }, 0);
                            } else {
                                if (!cv.isPaid) {
                                    return acc + cv.totalPrice;
                                } else {
                                    return acc;
                                }
                            }
                        }, 0),
                    })
                }
            }
        });
    }

    const getData = (type) => {
        dispatch(EnableLoader());
        dispatch(dashbaordAnalysis(type)).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                if (response.payload.data.animal[0]) {
                    if (type === "animal") {
                        setAnimalData(response.payload.data.animal[0]);
                    } else if (type === "product") {
                        setProductData(response.payload.data.animal[0]);
                    }
                }
            }
        });
    }

    const changeInventoryMenu = (type) => {
        setSelectedType(type);
        getData(type);
    }

    const menuInventory = (
        <Menu>
            <Menu.Item onClick={() => changeInventoryMenu('animal')}>
                Animal Inventory
            </Menu.Item>
            <Menu.Item onClick={() => changeInventoryMenu('product')}>Product Inventory</Menu.Item>
        </Menu>
    );

    const getGraphData = (breederId, type, startDate, endDate) => {
        dispatch(EnableLoader());
        dispatch(graphData(breederId, type, startDate, endDate)).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setdashboardGraphData(response.payload.data.map(e => mapData(e)));
            }
        });
    }

    const handleChangetime = (value) => {
        setshowrange(value);
        if (value == "Custom") {

        }
        else {

            if (value === "Today") {
                const date = moment(new Date()).format('YYYY-MM-DD');
                console.log(date);
                getGraphData(breederId, 'custom', date, date)
            } else if (value === "Yesterday") {
                const date = moment(new Date((new Date()).setDate(new Date().getDate() - 1))).format('YYYY-MM-DD');
                console.log(date);
                getGraphData(breederId, 'custom', date, date)
            } else if (value === "This week(Sun-Today)") {
                // consoe
            } else if (value === "Last 7 days") {
                const startDate = moment(new Date((new Date()).setDate(new Date().getDate() - 7))).format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)
            } else if (value === "Last week") {
                const startDate = moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD');
                const endDate = moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)

            } else if (value === "Last 14 days") {
                const startDate = moment(new Date((new Date()).setDate(new Date().getDate() - 14))).format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)

            } else if (value === "Last 30 days") {
                const startDate = moment(new Date((new Date()).setDate(new Date().getDate() - 30))).format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)

            } else if (value === "This month") {
                const startDate = moment().startOf('month').format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)

            } else if (value === "Last month") {
                const startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
                const endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
                console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)

            }
        }
        //console.log(`selected ${value}`)
    }

    const getPath = (x, y, width, height) => `M${x},${y + height}
    C${x + width / 2},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
    Z`;
    const TriangleBar = (props) => {
        const {
            fill, x, y, width, height,
        } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    const onRangeChange = (ev) => {
        const startDate = ev[0].format('YYYY-MM-DD');
        const endDate = ev[1].format('YYYY-MM-DD');
        console.log('Start Date : ', startDate, ' End Date : ', endDate);
        getGraphData(breederId, 'custom', startDate, endDate)
    }

    return (
        <div className="dashboard-body">

            <Row >
                <Col span={12} xs={24} md={7} className="textAlign-sm-box">
                    <h2 className="primary-text primary-text-heading">Dashboard</h2>
                </Col>

                <Col span={12} xs={0} md={7}></Col>
                <Col span={12} xs={24} md={10} className="textAlign-sm-box textAlign-sm-right">


                    <Space>
                        <Select style={{ minWidth: "150px" }} onChange={handleChangetime}
                            placeholder="Select time"
                            allowClear className="customSelect"
                            value={showrange}
                        >
                            {selecttime.map((e) => (
                                <Option value={e.name} key={e.name}>{e.name}</Option>
                            ))}

                        </Select>
                        <RangePicker onChange={onRangeChange} style={{ padding: 8, borderRadius: 8 }} disabled={(showrange === 'Custom') ? "disabled" : ""} />

                    </Space>


                </Col>
            </Row>
            <br />
            {/* {dashboardGraphData.length > 0 && */}
            <div className="chart">
                <ResponsiveContainer width={'100%'} height={300}>
                    <BarChart data={dashboardGraphData} >
                        <CartesianGrid />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Amount ($)', angle: '-90', className: 'dashbaordGraphYAxis', dx: -24 }} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        {/* <Legend /> */}
                        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                        <Bar dataKey="count" barSize={12} background={'gray'} radius={[20, 20, 0, 0]} fill="#503A9F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* } */}
            <br />

            <div>

                <SubDashboard names={sales} data={salesData} />
            </div>





            <div>
                <div className="primary-text">
                    <Dropdown overlay={menuInventory}>
                        <Link className="primary-text" onClick={e => e.preventDefault()}>
                            <span className="primary-text-span">{selectedType === "animal" ? "Animal Inventory" : "Product Inventory"}</span><CaretDownFilled />
                        </Link>
                    </Dropdown>
                </div>

                <SubDashboard names={(selectedType === 'animal') ? names : productNames} data={(selectedType === 'animal') ? animalData : productData} />
            </div>

        </div>
    )
}
