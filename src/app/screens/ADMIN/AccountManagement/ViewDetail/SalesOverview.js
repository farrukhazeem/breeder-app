import React, { useEffect, useState } from "react";
import CardSticker from '../../../../components/stickers/PieChartCard';
import { Row, Col, Space, Select } from 'antd';
import { CartesianGrid, XAxis, YAxis, AreaChart, Tooltip, Area } from 'recharts';
import Card from '../../../../components/card/card'
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../../../redux/actions/loader_action";
import { graphData } from "../../../../redux/actions/sales_action";
import moment from 'moment';
import constants from "../../../../config/constants";
const { Option } = Select;

export default function SalesOverview(props) {
    const [timeselect, settimeselect] = useState('');
    const [showrange, setshowrange] = useState("This year");
    const [breederId, setBreederId] = useState(props.breeder._id);

    const [dashboardGraphData, setdashboardGraphData] = useState([]);

    const dispatch = useDispatch();

    const selecttime = [{ name: 'This year', }, { name: 'Today', },
    { name: 'Yesterday', },
    // { name: 'This week(Sun-Today)', },
    { name: 'This month', }, { name: 'This week', },
        // { name: 'All time', },
    ]
    const saleStateValuesAnimal = [
        { percentage: props.animalStatics.myProductSoldPercentage, totalCount: props.animalStatics.totalProductsSold ? props.animalStatics.totalProductsSold : 0, title: 'Total products sold' },
        { percentage: props.animalStatics.myAnimalSoldPercentage, totalCount: props.animalStatics.totalAnimalsSold, title: 'Total animals sold' },
        { percentage: props.animalStatics.myTotalAmountReceivedPercentage, totalCount: `$ ${props.animalStatics.totalAmountReceived}`, title: 'Total amount received' },
        {
            percentage: props.animalStatics.mytotalSalePercentage, totalCount: `$ ${props.animalStatics.totalSaleAmount}`, title: 'Total sales amount'
        },
    ]

    // const saleStateValuesProduct = [
    //     { percentage: props.animalStatics.myProductSoldPercentage, totalCount: props.animalStatics.totalProductsSold, title: 'Total product sold' },
    //     { percentage: props.animalStatics.myTotalAmountReceivedPercentage, totalCount: `$ ${props.animalStatics.totalAmountReceived}`, title: 'Total product received' },
    //     {
    //         percentage: props.animalStatics.mytotalSalePercentage, totalCount: `$ ${props.animalStatics.totalSaleAmount}`, title: 'Total product amount'
    //     },
    // ]

    useEffect(() => {
        const startDate = moment().startOf('year').format('YYYY-MM-DD');
        const endDate = moment(new Date()).format('YYYY-MM-DD');
        // console.log('Start Date : ', startDate, ' End Date : ', endDate);
        getGraphData(breederId, 'custom', startDate, endDate)
    }, []);


    const SaleStateStickers = (data, name) => {
        return (
            <div className="" style={{ marginTop: 20 }}>
                <div className="secondary-text fw-100" style={{ marginBottom: 0 }}>Animal & Product Stats</div>
                <Row>
                    {data.map(e => <Col sm={24} lg={8} xl={8}><div style={{ padding: 3 }} className="cardSticker"><CardSticker style={{ minHeight: "110px" }} totalCount={e.totalCount} percentage={e.percentage} titleText={e.title}></CardSticker></div></Col>)}
                </Row>
            </div>
        )
    }

    const renderLineChart = (
        <AreaChart width={600} height={300} data={dashboardGraphData}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#5dd8db" fill="#3b99fa" />
        </AreaChart>
    );

    const mapData = (data) => {
        return { ...data, name: `${data._id.day} ${constants.months[data._id.month]}`, count: data.amount };
    }

    const getGraphData = (breederId, type, startDate, endDate) => {
        dispatch(EnableLoader());
        dispatch(graphData(breederId, type, startDate, endDate)).then(response => {
            dispatch(DisableLoader());
            // console.log(response);
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

            if (value === "This year") {
                const startDate = moment().startOf('year').format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                // console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)
            } else if (value === "Today") {
                const date = moment(new Date()).format('YYYY-MM-DD');
                // console.log(date);
                getGraphData(breederId, 'custom', date, date)
            } else if (value === "Yesterday") {
                const date = moment(new Date((new Date()).setDate(new Date().getDate() - 1))).format('YYYY-MM-DD');
                // console.log(date);
                getGraphData(breederId, 'custom', date, date)
            } else if (value === "This month") {
                const startDate = moment().startOf('month').format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                // console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)
            }
            else if (value === "This week") {
                const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
                const endDate = moment(new Date()).format('YYYY-MM-DD');
                // console.log('Start Date : ', startDate, ' End Date : ', endDate);
                getGraphData(breederId, 'custom', startDate, endDate)
            }
        }
        //console.log(`selected ${ value }`)
    }

    return (
        <div >

            <Card
                style={{ width: "100%;", height: "auto", minWidth: "300px", marginTop: "10px", }}
                className="primary-contrast-background">
                <Row>
                    <Col span={3} style={{ alignSelf: "center", }}>
                        <Space direction="vertical">
                            <span className="primary-text fw-100">$ {dashboardGraphData.reduce((acc, cv) => acc + parseInt(cv.amount), 0)}</span>
                            <span className="primary-text">Total Sales</span>
                        </Space>
                    </Col>

                    <Col span={21}>
                        <div style={{ position: "absolute", right: 0 }}>
                            <Select placeholder="select" defaultValue="This year" onChange={handleChangetime}
                                className="customSelect" style={{ minWidth: "130px" }}>
                                {["This year", "Today", "This week", "This month"].map(type => (
                                    <Option value={type}>{type}</Option>
                                ))}
                            </Select>
                        </div>
                        <div style={{ marginTop: 20 }}></div>

                        {renderLineChart}
                    </Col>
                </Row>

            </Card>

            {SaleStateStickers(saleStateValuesAnimal, "Animal")}

            {/* {SaleStateStickers(saleStateValuesProduct, "Product")} */}
        </div>
    )
}
