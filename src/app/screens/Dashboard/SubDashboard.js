import React from 'react'
import { Row, Col } from 'antd';
//import { DownOutlined } from '@ant-design/icons';
import Card from '../../components/card/card';


function SubDashboard(props) {
    const { names, data } = props;
    console.log(data, names, "<<---");
    return (
        <div style={{ marginBottom: 15 }}>
            <Row justify="space-between">
                {data && names.map(each => (
                    <Col className="textAlign-sm-box">
                        <Card className="" style={{ padding: "0px", height: "190px", marginTop: "20px ", width: "190px" }} >
                            <div style={{ textAlign: "center" }}>
                                <img className="logoImg" style={{ background: "transparent" }} height={30} src={require(`../../../assets/images/icons/${each.logo}`)} alt="Logo" />
                            </div>
                            <div style={{ textAlign: "center" }} className="primary-text primary-text-heading">{data[each.total]}</div>
                            <div style={{ textAlign: "center" }} className="secondary-text fs-130">{each.name}</div>

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
    // return (
    //     <div style={{marginBottom: 15}}>
    //         <Row justify="space-between">
    //             {names.map(each => (
    //                 <Col span={4}>
    //                     <Card className="" style={{marginTop:"20px " }} >
    //                         <div style={{ textAlign: "center" }}>
    //                             <img className="logoImg" style={{ background: "transparent" }} height={30} src={require(`../../../assets/images/icons/${each.logo}`)} alt="Logo" />
    //                         </div>
    //             <div style={{ textAlign: "center" }} className="primary-text primary-text-heading">{each.no}</div>
    //                         <div style={{ textAlign: "center" }} className="secondary-text fs-130">{each.name}</div>

    //                     </Card>
    //                 </Col>
    //             ))}
    //         </Row>
    //     </div>
    // )
}
export default SubDashboard;