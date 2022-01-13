import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, Modal, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import './GroupDetail.scss';

const { Text, Title } = Typography;

export default function ModalAssignEmployee(props) {
    let { setempAddModal, empAddModal, Employees, selectedEmployee, setEmployees } = props
    const [tempEmp, settempEmp] = useState(props.selectedEmployee);
    const [keyword, setKeyword] = useState(null);

    const onChangeEmpCheckbox = (checkedValues) => {
        //console.log("checkedValues", checkedValues)
        settempEmp(checkedValues)
    }
    const onAddEmp = () => {
        // setEmployees({ ...Employees, ...{ saveEmp: tempEmp } })
        if (tempEmp) {
            setempAddModal(!empAddModal)
        }
        props.setEmployees(tempEmp);
    }

    useEffect(() => {
        settempEmp(props.selectedEmployee)
    }, [props.selectedEmployee])

    const FilterEmp = (name) => {
        // let data = [];
        // if (name !== "") {
        //     data = Employees.filterEmployees.filter(e => e.name.indexOf(name) === 0)
        //     data = [...data, ...tempEmp];
        //     data = data.filter((item, pos) => data.indexOf(item) === pos)
        //     //console.log(data)
        // }
        // else { data = Employees.totalEmployees }
        // setEmployees({ ...Employees, ...{ filterEmployees: data } })
        setKeyword(name);

    }


    const filterData = (e) => {
        if (!keyword) {
            return e;
        } else {
            if (e.name.toLowerCase().search(keyword.toLowerCase()) > -1) {
                return e;
            } else {
                return null;
            }
        }
    }
    const changeCheckbox = (data, event) => {
        if (event.target.checked) {
            settempEmp(tempEmp ? [...tempEmp, ...[data]] : [data]);
        } else {
            if (tempEmp)
                settempEmp(tempEmp.filter(e => !(e._id === data._id)));
        }
    }


    return (
        <Modal
            title="Assign Employee"
            visible={empAddModal}
            closable={false}
            centered={true}
            footer={null}
            className="assignemp-modal"
        >
            <div>
                <Title level={3} strong>Assign employee</Title>
                <div className="gd-assignemp-inner-main">
                    <div>
                        <Text strong>Select employee</Text>
                    </div>
                    <div>
                        <Input prefix={<SearchOutlined />} className="greybuttonsearch" placeholder="Search..." onChange={(e) => FilterEmp(e.target.value)} value={keyword} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <div>
                            <Checkbox.Group style={{ width: '100%' }} value={tempEmp}>
                                <Row>
                                    {Employees && Employees.filter(filterData).map((e) =>
                                        <Col span={24} key={e._id}>
                                            <Checkbox onChange={(event) => changeCheckbox(e, event)} checked={(tempEmp && tempEmp[0]) ? tempEmp.map(a => a._id).includes(e._id) : false} value={e} >{e.name}</Checkbox>
                                        </Col>
                                    )}

                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>

                </div>
                <div className="actionbuttons">
                    <Space>
                        <Button className="secondary-button" onClick={() => { setempAddModal(!empAddModal); }}>Discard</Button>
                        <Button className="secondary-button" onClick={() => { onAddEmp(); }}>Add</Button>
                    </Space>
                </div>
            </div>
        </Modal>
    )
}
