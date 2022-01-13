import React, { useEffect, useState } from "react";
import { Row, Col, Tabs } from "antd";
import Profilepage from "./Profilepage";
import FamilyTree from "./FamilyTree";
import HealthRecord from "./HealthRecord";
import Gallery from "./Gallery";
import { connect, useDispatch } from "react-redux";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import { getAnimal } from "../../../redux/actions/animal_action";

const { TabPane } = Tabs;

function Profile(props) {
  console.log(props);
  const [animal, setAnimal] = useState(null);
  const [existingAnimals, setExistingAnimal] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!props.location.state) return props.history.push('/animal')
    refreshData(props.location.state.id);
  }, []);

  const refreshData = (id) => {
    dispatch(EnableLoader());
    dispatch(getAnimal(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setAnimal(response.payload.data);
        setExistingAnimal([
          response.payload.data._id,
          response.payload.data.family?.parent1[0]?._id,
          response.payload.data.family?.parent2[0]?._id,
          ...response.payload.data.family?.children.map((e) => e._id),
        ].filter((e) => e))
      }
    });
  }
  const callback = (key) => {
    console.log(key);
  };
  return (
    <div>
      {/* <Row>
                <Col>
                    Animal Management > <b className="primary-text">View Profile</b>
                </Col>
            </Row> */}

      <Tabs defaultActiveKey="1" onChange={callback} tabPosition="top">
        {animal && (
          <>
            <TabPane tab="Profile" key="1">
              <Profilepage data={animal} refreshData={refreshData} {...props} />
            </TabPane>
            <TabPane tab="Family Tree" key="2">
              <FamilyTree data={animal} existingAnimal={existingAnimals} refreshData={refreshData} />
            </TabPane>
            <TabPane tab="Health Record" key="3">
              <HealthRecord data={animal} refreshData={refreshData} />
            </TabPane>

            <TabPane tab="Gallery" key="4">
              <Gallery data={animal} refreshData={refreshData} />
            </TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
