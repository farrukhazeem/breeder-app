import { Modal, Form, Typography, Row, Space, Col, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addAsParentChild,
  getAnimal,
  getAnimals,
} from "../../../redux/actions/animal_action";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";

import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";

const { Title, Text } = Typography;

function FamilyTreeAnimalModal(props) {
  console.log(props);
  // console.log(props.animal.family?.parent1[0]?._id);
  // console.log('existing animals');
  // console.log( [
  //   props.animal._id,
  //   props.animal.family?.parent1[0]?._id,
  //   props.animal.family?.parent2[0]?._id,
  //   ...props.animal.family?.children.map((e) => e._id),
  // ].filter((e) => e));
  // const [animals, setAnimals] = useState();
  // const [existingAnimals, setExistingAnimal] = useState(
  //   [
  //     props.animal._id,
  //     props.animal.family?.parent1[0]?._id,
  //     props.animal.family?.parent2[0]?._id,
  //     ...props.animal.family?.children.map((e) => e._id),
  //   ].filter((e) => e)
  // );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log('getting data');
  //  getAnimalData();
  // }, [props.animal]);



  // const getAnimalData = () => {
  //   dispatch(EnableLoader());
  //   dispatch(getAnimals()).then((response) => {
  //     console.log(response);
  //     dispatch(DisableLoader());
  //     if (response.payload.status === 200) {
  //       console.log(existingAnimals);
  //       setAnimals(
  //         response.payload.data
  //           ? response.payload.data
  //               .filter((e) => !existingAnimals.includes(e._id))

  //           : []
  //       );
  //       console.log('Response is : ');
  //       console.log(response.payload.data
  //         ? response.payload.data
  //             .filter((e) => !existingAnimals.includes(e._id))
  //             .filter(
  //               (e) =>
  //                 e.categoryId.parentId.name ===
  //                 props.animal.categoryId.parentId.name
  //             )
  //         : []);
  //     }
  //   });

  // }
  useEffect(() => {
    setfilterAnimal(props.allanimals)
  }, [props.allanimals])
  const [filterAnimal, setfilterAnimal] = useState([])

  const addAnimal = (type, animal) => {
    if (type === "parent") {
      if (!props.animal.family?.parent1[0]) {
        console.log("parent1");
        dispatch(EnableLoader());
        dispatch(
          addAsParentChild({
            animalId: animal._id,
            id: props.animal._id,
            type: "parent1",
          })
        ).then((response) => {
          console.log(response);
          dispatch(DisableLoader());
          if (response.payload.status === 200) {
            props.closeModal();
            props.refreshData(props.animal._id);
            // getAnimalData();
          }
        });
      } else {
        console.log("parent2");
        console.log("parent1");
        dispatch(EnableLoader());
        dispatch(
          addAsParentChild({
            animalId: animal._id,
            id: props.animal._id,
            type: "parent2",
          })
        ).then((response) => {
          console.log(response);
          dispatch(DisableLoader());
          if (response.payload.status === 200) {
            props.closeModal();
            props.refreshData(props.animal._id);
            // getAnimalData();
          }
        });
      }
    } else if (type === 'child') {
      dispatch(EnableLoader());
      dispatch(
        addAsParentChild({
          animalId: animal._id,
          id: props.animal._id,
          type: "child",
        })
      ).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          props.closeModal();
          props.refreshData(props.animal._id);
          // getAnimalData();
        }
      });
    }
  };

  const searchData = (e) => {
    let matched = []
    let search = e.target.value
    if (search !== "") {
      matched = props.allanimals.filter(e => e.data.name.startsWith(search))
      setfilterAnimal(matched)
    }
    else {
      setfilterAnimal(props.allanimals)
    }
  }

  const onFinish = () => { };
  return (
    <Modal
      visible={props.visible}
      footer={null}
      closable={false}
      centered={true}
    >
      <div>
        <Form onFinish={onFinish}>
          <Title level={3} strong>
            Add Animal
          </Title>

          <Row style={{ justifyContent: "center" }}>
            <Form.Item name="type" style={{ width: "100%" }}>
              <Input placeholder="Search" onChange={searchData} />
            </Form.Item>
          </Row>
          {filterAnimal &&
            filterAnimal.map((e) => (
              <Card
                className="gd-items-card"
                style={{ width: "100%", marginBottom: 10 }}
                key={e._id}
              >
                <Row>
                  <Col span={18}>
                    <div>
                      <Space className="gd-animal-card-item-space">

                        <img src={e.image ? e.image : require("../../../../assets/images/familytree/Animal@2x.png")} style={{ width: 60, height: 60, borderRadius: 40 }}
                          alt="logo"
                        />

                        <Space
                          direction="vertical"
                          style={{ textAlign: "left" }}
                        >
                          <Text strong>
                            {e.data?.name}
                          </Text>
                          <Text className="secondary-text">
                            Category: <Text strong>{e.categoryId.name}</Text>
                          </Text>
                          <Text className="secondary-text">{e.data?.sex}</Text>
                        </Space>
                      </Space>
                    </div>
                  </Col>
                  <Col span={6} className="gd-animal-card-item-btn">
                    <Button
                      className="inner-white-btn"
                      onClick={() => addAnimal(props.type, e)}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          {/* <Card className="gd-items-card" key={e._id}>
                                <Row>
                                    <Col span={16} >
                                        <div>
                                            <Space className='gd-animal-card-item-space'>
                                                <Checkbox value={e}></Checkbox>
                                                <img src={require('../../../../assets/images/familytree/parent1@2x.png')} width={'50'} alt="logo" />
                                                <Space direction="vertical">
                                                    <Text strong>{e._id}</Text>
                                                    <Text className="secondary-text">{e.groupName}</Text>
                                                    <Text className="secondary-text">Animal category: <Text strong>{e.name}</Text></Text>
                                                </Space>

                                            </Space>

                                        </div>
                                    </Col>
                                    <Col span={6} className='gd-animal-card-item-btn'>
                                        <Button className="inner-white-btn" onClick={() => onRemoveAnimal(e)}>Remove</Button>
                                    </Col>
                                </Row>
                            </Card> */}

          <br />

          <Button className="secondary-button" onClick={props.closeModal} style={{ justifyContent: "right" }}>
            Discard
            </Button>

        </Form>
      </div>
    </Modal>
  );
}

export default FamilyTreeAnimalModal;
