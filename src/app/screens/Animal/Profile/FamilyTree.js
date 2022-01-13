import React from 'react';
import Families from './Families';
import Button from '../../../components/button/button';
import { Space, Row, Col, Modal } from 'antd';
import { Link } from 'react-router-dom'
import Card from '../../../components/card/card'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
import { deleteParent, addAsParentChild, deleteChild } from '../../../redux/actions/animal_action';

const parentnames = [{ name: 'parentname 1', image: "Animal@2x.png" }, { name: 'parentname 2', image: "parent2@2x.png" }];
const childnames = [{ name: 'childname 1', image: "Child1@2x.png" }, { name: 'childname 2', image: "Child2@2x.png" }];
function FamilyTree({ data, refreshData, existingAnimal }) {

    const dispatch = useDispatch()

    const removeAnimal = (animal) => {

        const onOkCancel = () => {
            console.log('in remove animal function');
            if (data.family?.parent1[0]?._id === animal._id) {
                console.log('this is parent 1');
                console.log(animal);
                dispatch(EnableLoader());
                dispatch(deleteParent(data._id, 'parent1')).then(response => {
                    dispatch(DisableLoader());
                    console.log(response);
                    if (response.payload.status === 200) {
                        refreshData(data._id);
                    }
                })
            } else if (data.family?.parent2[0]?._id === animal._id) {
                console.log('this is parent 2');
                console.log(animal);
                dispatch(EnableLoader());
                dispatch(deleteParent(data._id, 'parent2')).then(response => {
                    dispatch(DisableLoader());
                    console.log(response);
                    if (response.payload.status === 200) {
                        refreshData(data._id);
                    }
                })
            } else {
                console.log('this is parent 2');
                console.log(animal);
                dispatch(EnableLoader());
                dispatch(deleteChild(data._id, animal._id)).then(response => {
                    dispatch(DisableLoader());
                    console.log(response);
                    if (response.payload.status === 200) {
                        refreshData(data._id);
                    }
                })
            }
        }

        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to remove?",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: onOkCancel
        });
    }


    return (
        <div>
            {/* <div style={{ position: "absolute", right: "15px" }}>
                <Space>
                    <Button>QR Code</Button>
                    <Button>Remove Animal</Button>
                </Space>
            </div> */}

            <h2 className="heading-top">Parent</h2>
            <br />
            <Families refreshData={refreshData} removeAnimal={removeAnimal} existingAnimals={existingAnimal} parent={true} animal={data} names={[data.family?.parent1[0], data.family?.parent2[0]].filter(n => n)} />

            {/* {
              (<Card onClick={() => {console.log('add animal')}} style={{ width: '400px', height: "218px", margin: "10px" }}>
                <br />
                <div style={{ width: '100%', height: '100%', textAlign: "center", marginTop: "50px" }}>
                    <PlusOutlined style={{ background: 'var(--primary-color)', borderRadius: 20, padding: 5 }} />
                </div>
            </Card>)
            } */}
            <br />

            <h2 className="heading-top">Child</h2>
            <Families refreshData={refreshData} child={true} removeAnimal={removeAnimal} existingAnimals={existingAnimal} animal={data} names={data.family?.children} />

            {/* <Card onClick={() => {console.log('add animal')}} style={{ width: '400px', height: "218px", margin: "10px" }}>
                <br />
                <div style={{ width: '100%', height: '100%', textAlign: "center", marginTop: "50px" }}>
                    <PlusOutlined style={{ background: 'var(--primary-color)', borderRadius: 20, padding: 5 }} />
                </div>
            </Card> */}
        </div>
    )
}

export default FamilyTree;

