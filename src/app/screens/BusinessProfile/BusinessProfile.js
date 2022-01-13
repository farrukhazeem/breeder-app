import React, { useEffect, useState } from "react";
import { Tabs, message, Empty } from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import Aboutus from "./Aboutus";
import Gallery from "./components/Gallery";
import Allanimals from "../Animal/Allanimals";
import { userDetail } from "../../redux/actions/user_actions";
import { useDispatch } from "react-redux";
import { getAnimals, updateAnimalData } from "../../redux/actions/animal_action";
import ImageDragger from "../../components/ImageDragger";
import { baseUrl } from "../../config/globalConfig";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";


const { TabPane } = Tabs;

function BusinessProfile(props) {
  const names = [
    {
      image: require("../../../assets/images/AnimalProfile/1a.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1b.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1c.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1d.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1e.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1f.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1g.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1a.png"),
      category: "Dog",
    },
    {
      image: require("../../../assets/images/AnimalProfile/1b.png"),
      category: "Dog",
    },
  ];
  const dispatch = useDispatch();
  const [userinfo, setuserinfo] = useState({});
  const [featuredAnimal, setFeaturedAnimal] = useState([]);
  const [visibleUploadingModal, setvisibleUploadingModal] = useState(false);
  const [imageName, setImageName] = useState(null);

  useEffect(() => {
    dispatch(userDetail()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setuserinfo(response.payload.data);
      }
    });
    featuredAnimals();
  }, []);


  const featuredAnimals = () => {
    dispatch(EnableLoader());
    dispatch(getAnimals('Active', true)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setFeaturedAnimal(response.payload.data);
      }
    });
  }

  const refreshData = () => {
    dispatch(userDetail()).then((response) => {
      console.log(response);
      if (response.payload.status === 200) {
        setuserinfo(response.payload.data);
      }
    });
  };

  const changeImage = (type) => {
    setImageName(type);
    setvisibleUploadingModal(true);
  }


  const onGalleryUploadSuccess = () => {
    refreshData();
    setvisibleUploadingModal(false);
  }


  const updateFeaturedAnimal = (featured, animalId) => {
    dispatch(EnableLoader());
    dispatch(updateAnimalData({ featured }, animalId)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        setFeaturedAnimal(featuredAnimal.filter((animal) => !(animal._id === animalId)))
        // featuredAnimals();
      }
    });
  }

  return userinfo ? (
    <>
      <div className="relative-image">
        {userinfo.coverImage ?
          <a href={userinfo.coverImage} target="_blank">
            <img
              style={{ maxWidth: '110%' }}
              width={"115%"}
              height={"270px"}
              src={userinfo.coverImage}
              alt="Logo"
            />
          </a>
          :
          <img
            style={{ maxWidth: '110%' }}
            width={"115%"}
            height={"270px"}
            src={require("../../../assets/images/Cover Image@2x.png")}
            alt="Logo"
          />
        }

        <div>
          <EditOutlined onClick={() => changeImage('coverImage')} className='absolute-edit-cover-image' />
        </div>
        <img
          className="absolute-image"
          style={{}}
          width={"120"}
          height={"120"}
          src={userinfo.image ? userinfo.image : require("../../../assets/images/Business@2x.png")}
          alt="Logo"
          onClick={() => changeImage('image')}
        />


      </div>
      {/* <Space>
       
      </Space> */}
      <br /> <br />
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{ marginTop: "50px" }}
      >
        <TabPane tab="About us" key="1">
          <Aboutus />
        </TabPane>
        <TabPane tab="Gallery" key="2">
          <Gallery data={userinfo} refreshData={refreshData} />
        </TabPane>
        <TabPane tab="Featured Animal" key="3">
          {/* <div style={{ float: "right" }}>
            <Space>
              <Button className="secondary-button">Remove all</Button>
            </Space>
          </div> */}

          <h2 className="heading-top">Featured animals</h2>
          <br />

          {featuredAnimal[0] ? <Allanimals data={featuredAnimal} updateFeaturedAnimal={updateFeaturedAnimal} {...props} /> :
            <div style={{ width: "100%", marginTop: 30 }}>
              <Empty description={"No Data Found!"} />
            </div>
          }
        </TabPane>
      </Tabs>
      <ImageDragger {...{ multiple: false, ratio: imageName === 'coverImage' ? 3.5 / 1 : 1 / 1, data: { action: `${baseUrl}/user/image/upload`, name: 'file', body: { name: imageName } }, visible: visibleUploadingModal, onSuccess: onGalleryUploadSuccess, close: () => setvisibleUploadingModal(false) }} />

    </>
  ) : null;
}

export default BusinessProfile;
