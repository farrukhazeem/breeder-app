import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, message } from 'antd';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import './GroupDetail.scss';
import AssignEmp from './AssignEmp';
import ModalAssignEmployee from './ModalAssignEmployee'
import SearchAnimals from './SearchAnimals'
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
import { getAnimals } from '../../../redux/actions/animal_action';
import { getBreederEmployees } from '../../../redux/actions/user_actions';
import { createGroup, getGroup, updateGroup } from '../../../redux/actions/group_action';
import moment from 'moment';
const { Text } = Typography;


export default function GroupDetail2(props) {

    const [empAddModal, setempAddModal] = useState(false)

    const [groupName, setgroupName] = useState({ saveName: "", editName: false })
    // const [Employees, setEmployees] = useState({ saveEmp: [], totalEmployees: totalEmployees, filterEmployees: totalEmployees })
    // const [Animals, setAnimals] = useState({ saveAnimal: [], remainingAnimals: [], totalAnimals: totalAnimals, filterGroupAnimals: totalAnimals })
    const dispatch = useDispatch();



    const [animals, setAnimals] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [selectedAnimals, setSelectedAnimals] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [group, setGroup] = useState(null);

    const isGroupCreate = () => {
        if (window.location.pathname === "/groups/create") {
            return true
        } else {
            return false;
        }
    }

    const isGroupDetail = () => {
        if (window.location.pathname === "/groups/detail") {
            return true
        } else {
            return false;
        }
    }
    useEffect(() => {

        if (isGroupDetail()) {
            dispatch(EnableLoader());
            dispatch(getGroup(props.location.state.id)).then((response) => {
                console.log(response);
                if (response.payload.status === 200) {
                    setGroup(response.payload.data);
                    setgroupName({ ...groupName, ...{ saveName: response.payload.data.name } });
                    getData(true, response.payload.data);
                } else {
                    message.error(response.payload.message);
                }
            })
        } else {
            getData(false);
        }



    }, [])


    const getData = (isDetail, groupData) => {
        console.log(groupData);
        dispatch(getAnimals()).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                if (isDetail) {
                    const animalArr = groupData.animals.map(e => e.id);
                    setAnimals(response.payload.data.filter(e => !(animalArr.includes(e._id))));
                    setSelectedAnimals(response.payload.data.filter(e => (animalArr.includes(e._id))));
                } else {
                    setAnimals(response.payload.data);
                }
            }
        })

        dispatch(getBreederEmployees()).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                if (isDetail) {
                    const employeeArr = groupData.employees.map(e => e.id);
                    setEmployees(response.payload.data);
                    setSelectedEmployee(response.payload.data.filter(e => (employeeArr.includes(e._id))));
                } else {
                    setEmployees(response.payload.data);
                }
            }
        })
    }





    const addAnimalToSelectedAnimal = (animal, isMultiple) => {
        if (isMultiple) {
            if (animal) {
                const idArr = animal.map(e => e._id);
                setSelectedAnimals(selectedAnimals ? [...selectedAnimals, ...animal] : animal);
                setAnimals(animals.filter((a) => !idArr.includes(a._id)));
            }
        } else {
            console.log('single selected animal');
            console.log(animal);
            setSelectedAnimals(selectedAnimals ? [...selectedAnimals, ...[animal]] : [animal]);
            setAnimals(animals.filter((a) => !(animal._id === a._id)));
            // debugger;
            console.log(selectedAnimals);
            console.log(animals);

        }
    }


    const removeAnimalFromSelectedAnimal = (animal, isMultiple) => {

        if (isMultiple) {
            if (animal && animal.length > 0) {
                const idArr = animal.map(e => e._id);
                setAnimals(animals ? [...animals, ...animal] : animal);
                setSelectedAnimals(selectedAnimals.filter((a) => !idArr.includes(a._id)))
            }
        } else {
            setAnimals(animals ? [...animals, ...[animal]] : [animal]);
            setSelectedAnimals(selectedAnimals.filter((a) => !(animal._id === a._id)));
            console.log(animals);
            console.log(selectedAnimals);
        }

    }

    const removeEmployee = (data) => {
        setSelectedEmployee(selectedEmployee.filter(e => !(e._id === data._id)))
    }

    const onSave = () => {
        // console.log("saved Animals", Animals.saveAnimal)
        // console.log("saved Emp", Employees.saveEmp)
        if (isGroupCreate()) {
            console.log('create');
            if (!groupName.saveName) {
                message.error('Name is required');
                return;
            }
            else if (!groupName.saveName.match(/^[ a-zA-Z]+$/)) {
                message.error('Group Name must contain only characters');
                return;
            }
            else {
                dispatch(EnableLoader());
                dispatch(createGroup({ name: groupName.saveName, animals: selectedAnimals ? selectedAnimals.map(e => ({ id: e._id })) : [], employees: selectedEmployee ? selectedEmployee.map(e => ({ id: e._id })) : [] })).then(response => {
                    console.log(response);
                    dispatch(DisableLoader());
                    if (response.payload.status === 200) {
                        message.success(response.payload.message);
                        props.history.push('/groups')
                    }
                })
            }
        } else if (isGroupDetail()) {
            console.log('create');
            if (!groupName.saveName) {
                message.error('Name is required');
                return;
            }
            else if (!groupName.saveName.match(/^[ a-zA-Z]+$/)) {
                message.error('Group Name must contain only characters');
                return;
            }
            else {
                dispatch(EnableLoader());
                dispatch(updateGroup(props.location.state.id, { name: groupName.saveName, animals: selectedAnimals ? selectedAnimals.map(e => ({ id: e._id })) : [], employees: selectedEmployee ? selectedEmployee.map(e => ({ id: e._id })) : [] })).then(response => {
                    console.log(response);
                    dispatch(DisableLoader());
                    if (response.payload.status === 200) {
                        message.success(response.payload.message);
                        props.history.push('/groups')
                    }
                })
            }
        }
    }

    return (
        <div>

            <Row>

                <Col xl={8} md={24} sm={24} xs={24} lg={8} xxl={8}>

                    {isGroupCreate() ?
                        (

                            <Input placeholder="Enter Group name" style={{ width: "80%" }}
                                defaultValue={groupName.saveName} onChange={(e) => setgroupName({ ...groupName, ...{ saveName: e.target.value } })} onBlur={() => setgroupName({ ...groupName, ...{ editName: !groupName.editName } })} />
                        ) :
                        (
                            groupName.editName === true ?

                                <Input placeholder="Enter Group name" style={{ width: "80%" }} defaultValue={groupName.saveName} onChange={(e) => setgroupName({ ...groupName, ...{ saveName: e.target.value } })} onBlur={() => setgroupName({ ...groupName, ...{ editName: !groupName.editName } })} />

                                :

                                < h2 className="primarytext primary-text-heading">{groupName.saveName}
                                    <img style={{ marginLeft: "5px", marginBottom: "5px" }} width={'30'} src={require('../../../../assets/images/edit.png')} alt="edit" onClick={() => setgroupName({ ...groupName, ...{ editName: !groupName.editName } })} /></h2>


                        )
                    }

                </Col>
                <Col xl={8} md={24} sm={24} xs={24} lg={8} xxl={8}>
                    <Space size={30}>
                        <Space direction='vertical'>
                            <Text className="secondary-text" strong>Animal</Text>
                            <Text strong>{selectedAnimals ? selectedAnimals.length : 0}</Text>
                        </Space>
                        {
                            (isGroupDetail() && group) && (
                                <>
                                    <Space direction='vertical'>
                                        <Text className="secondary-text" strong>Created on</Text>
                                        <Text strong>{moment(group.createdAt).format("DD MMM, YYYY")}</Text>
                                    </Space>
                                    <Space direction='vertical'>
                                        <Text className="secondary-text" strong>Last updated</Text>
                                        <Text strong>{moment(group.updatedAt).format("DD MMM, YYYY")}</Text>
                                    </Space>
                                </>
                            )
                        }
                    </Space>
                </Col>
                <Col xl={8} md={24} sm={24} xs={24} lg={8} xxl={8}>
                    <Space className="gd-space-btn">
                        <Button className="secondary-button" htmlType="submit" block onClick={onSave}>{isGroupDetail() ? 'Save' : 'Create'}</Button>
                        <Button className="secondary-button" block onClick={() => { props.history.push('/groups') }}>Discard</Button>
                    </Space>
                </Col>

            </Row>

            <Row gutter={{ xs: 0, sm: 0, md: 10, lg: 12, xl: 12, xxl: 12 }} className='groupdt-animal-add-remove'>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    {/* <AnimalsInGroup Animals={Animals} setAnimals={(animal) => setAnimals(animal)} /> */}
                    <SearchAnimals Animals={selectedAnimals} title="Animals In Group" mainButtonTitle="Remove" mainButtonAction={(animal) => removeAnimalFromSelectedAnimal(animal, true)} itemButtonTitle="Remove" itemButtonAction={(animal) => removeAnimalFromSelectedAnimal(animal, false)} setAnimals={(animal) => setAnimals(animal)} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} >
                    <SearchAnimals Animals={animals} title="Search Animals" mainButtonTitle="Add" mainButtonAction={(animal) => addAnimalToSelectedAnimal(animal, true)} itemButtonTitle="Add to group" itemButtonAction={(animal) => addAnimalToSelectedAnimal(animal, false)} setAnimals={(animal) => setAnimals(animal)} />
                </Col>
            </Row>

            <AssignEmp Employees={employees ? employees : []} selectedEmployee={selectedEmployee} setEmployees={(emp) => setEmployees(emp)} removeEmployee={removeEmployee} setempAddModal={(emp) => setempAddModal(emp)} empAddModal={empAddModal} />
            <ModalAssignEmployee setempAddModal={(emp) => setempAddModal(emp)} empAddModal={empAddModal} Employees={employees ? employees : []} selectedEmployee={selectedEmployee} setEmployees={(emp) => setSelectedEmployee(emp)} />
        </div >
    )
}
