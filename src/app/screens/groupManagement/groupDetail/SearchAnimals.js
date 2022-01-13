import React, { useState, useEffect } from "react";
import { Row, Col, Space, Typography, Avatar, Modal, Checkbox } from "antd";
import {
  EditFilled,
  SearchOutlined,
  UserOutlined,
  FilterFilled,
} from "@ant-design/icons";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import Card from "../../../components/card/card";
import "./GroupDetail.scss";

const { Text, Title } = Typography;

export default function SearchAnimals(props) {
  const { Animals, setAnimals } = props;
  const [tempGroupAnimal, settempGroupAnimal] = useState(null);
  const [filter, setFilter] = useState(null);

  const onChangeGroupCheckbox = (checkedValues) => {
    //console.log("checkedValuesGroup", checkedValues)
    // settempGroupAnimal()
    console.log(checkedValues);
  };

  const removeSelectedAnimalFromGroup = () => {
    let data = [];
    let GroupAnimaldata = tempGroupAnimal.map((t) => t._id);
    data = Animals.filterGroupAnimals.filter(
      (e) => GroupAnimaldata.indexOf(e._id) === -1
    );
    return data;
  };

  const onAddGroupAnimals = (animal, check) => {
    console.log(check);
    if (check.target.checked) {
      settempGroupAnimal(
        tempGroupAnimal ? [...tempGroupAnimal, ...[animal]] : [animal]
      );
    } else {
      settempGroupAnimal(
        tempGroupAnimal.filter((e) => !(e._id === animal._id))
      );
    }
  };

  const onAddToGroup = (addgroup) => {
    let data = Animals.filterGroupAnimals.filter((e) => e._id !== addgroup._id);
    setAnimals({
      ...Animals,
      ...{ filterGroupAnimals: data },
      ...{ saveAnimal: Animals.saveAnimal.concat([addgroup]) },
    });
  };

  const filterKeyPress = (ev) => {
    console.log(ev);
    setFilter(ev.target.value);
  };

  const filterSearch = (value) => {
    if (!filter) return value;
    if (
      value.categoryName.toLowerCase().search(filter.toLowerCase()) > -1 ||
      value.data.name.toLowerCase().search(filter.toLowerCase()) > -1
    ) {
      return value;
    } else {
      return null;
    }
  };

  const RemoveFromTempdata = (animal) => {
    if (tempGroupAnimal) {
      settempGroupAnimal(
        tempGroupAnimal.filter((e) => !(e._id === animal._id))
      );
    }
  }

  return (
    <>
      <Card className="primary-contrast-background">
        <Title level={3}>{props.title}</Title>
        <Row gutter={10}>
          <Col span={18}>
            <Input
              placeholder="Search animal"
              // onSearch={filterKeyPress}
              onChange={filterKeyPress}
              className="greybuttonsearch"
              prefix={<SearchOutlined />}
              suffix={<FilterFilled />}
            />
          </Col>
          <Col span={4}>
            <Button
              className="gd-items-card-btn"
              onClick={() => {
                console.log(tempGroupAnimal);
                props.mainButtonAction(tempGroupAnimal);
                settempGroupAnimal([]);
              }}
            >
              {props.mainButtonTitle}
            </Button>
          </Col>
        </Row>

        <div className="gd-items-card-list">
          <Checkbox.Group style={{ width: "100%" }} value={tempGroupAnimal}>
            {Animals &&
              Animals.filter(filterSearch).map((e) => (
                <Card className="gd-items-card" key={e._id}>
                  <Row>
                    <Col span={16}>
                      <div>
                        <Space className="gd-animal-card-item-space">
                          <Checkbox
                            onChange={(check) => onAddGroupAnimals(e, check)}
                            value={e}
                            defaultChecked={false}
                            checked={
                              tempGroupAnimal
                                ? tempGroupAnimal
                                  .map((a) => a._id)
                                  .includes(e._id)
                                : false
                            }
                          ></Checkbox>
                          <img
                            src={
                              e.image
                                ? e.image
                                : require("../../../../assets/images/familytree/Animal@2x.png")
                            }
                            width={"50"}
                            alt="logo"
                          />
                          <Space direction="vertical">
                            <Text strong>
                              {e.data?.name ? e.data?.name : e._id}
                            </Text>
                            <Text className="secondary-text">Group Name</Text>
                            <Text className="secondary-text">
                              Animal category:{" "}
                              <Text strong>{e.categoryName}</Text>
                            </Text>
                          </Space>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6} className="gd-animal-card-item-btn">
                      <Button
                        className="inner-white-btn"
                        onClick={() => { props.itemButtonAction(e); RemoveFromTempdata(e) }}
                      >
                        {props.itemButtonTitle}
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
          </Checkbox.Group>
        </div>
      </Card>
    </>
  );
}
