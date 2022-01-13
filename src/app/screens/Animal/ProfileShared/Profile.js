import React, { useEffect, useState } from "react";
import { Layout, Result, Space, Tabs, Radio } from "antd";
import Profilepage from "./Profilepage";
import FamilyTree from "./FamilyTree";
import HealthRecord from "./HealthRecord";
import Gallery from "./Gallery";
import { useDispatch } from "react-redux";
import Button from "../../../components/button/button";
import { Link } from "react-router-dom";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import { getAnimal } from "../../../redux/actions/animal_action";
import './profile.scss'

const { TabPane } = Tabs;

function Profile(props) {
  console.log(props);
  const [animal, setAnimal] = useState(null);
  const [existingAnimals, setExistingAnimal] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    refreshData(window.location.pathname.split("/").pop());
  }, []);
  const [isPrivate, setisPrivate] = useState(false);

  const refreshData = (id) => {
    dispatch(EnableLoader());
    dispatch(getAnimal(id)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        setAnimal(response.payload.data);

        if (response.payload.data.isPrivate) {
          setisPrivate(true);
        }
        setExistingAnimal(
          [
            response.payload.data._id,
            response.payload.data.family?.parent1[0]?._id,
            response.payload.data.family?.parent2[0]?._id,
            ...response.payload.data.family?.children.map((e) => e._id),
          ].filter((e) => e)
        );
      }
    });
  };

  const [type, setType] = useState('Profile');

  return (
    <Layout theme="light" style={{ minHeight: '100vh' }} className="PrimaryBackSmall">
      <div className={"publicProfileHeader"}>
        <div className={"headerData"}>
          <img className={"headerImg"}
            src={require("../../../../assets/images/Logo_Logly.png")}
            width={190}
          />
        </div>
        <div style={{ float: "right" }} className='dv-link smallBoxHide'>
          <Space >
            {localStorage.getItem("w_auth") ? (
              <Link to={'/dashboard'} className={"right-link"}>Dashboard</Link>
            ) : (
                <Link to={'/login'} className={"right-link"}>Login</Link>
              )}
          </Space>
        </div>
      </div>

      <div style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }} className="smallLeftRight" >

        <div className="textAlign-md-box-layer setting-radio-btn-switch-profile" >

          <Radio.Group value={type} onChange={(e) => setType(e.target.value)} >
            <Radio.Button value="Profile">Profile</Radio.Button>
            <Radio.Button value="Gallery">Gallery</Radio.Button>
            <Radio.Button value="Health">Health</Radio.Button>
            <Radio.Button value="Family">Family</Radio.Button>
          </Radio.Group>
        </div>
        {animal && !isPrivate && (
          <div style={{ marginTop: 30 }}>
            {type === "Profile" ?
              <Profilepage
                data={animal}
                refreshData={refreshData}
                {...props}
              />
              :
              type === "Gallery" ?
                <Gallery data={animal} refreshData={refreshData} />
                :
                type === "Health" ?
                  <HealthRecord data={animal} refreshData={refreshData} />
                  :
                  <FamilyTree
                    data={animal}
                    existingAnimal={existingAnimals}
                    refreshData={refreshData}
                  />
            }
          </div>
        )
        }


        {/* <Tabs defaultActiveKey="1" onChange={callback} tabPosition="top">
          {animal && !isPrivate && (
            <>
              <TabPane tab="Profile" key="1">
                <Profilepage
                  data={animal}
                  refreshData={refreshData}
                  {...props}
                />
              </TabPane>
              <TabPane tab="Gallery" key="2">
                <Gallery data={animal} refreshData={refreshData} />
              </TabPane>


              <TabPane tab="Health Record" key="3">
                <HealthRecord data={animal} refreshData={refreshData} />
              </TabPane>

              <TabPane tab="Family Tree" key="4">
                <FamilyTree
                  data={animal}
                  existingAnimal={existingAnimals}
                  refreshData={refreshData}
                />
              </TabPane>

            </>
          )}
        </Tabs> */}

        {isPrivate ? (
          <Result
            status="403"
            title="Animal profile is private"
            subTitle="Sorry, you are not authorized to see this profile."
            extra={
              <Button className="secondary-button">
                <Link to={"/"}>Home</Link>
              </Button>
            }
          />
        ) : null}
      </div>
    </Layout >
  );
}

export default Profile;
