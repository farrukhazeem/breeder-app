import React, { useState, useEffect } from "react";
import { Row, Col, Form, Space, Select, message, List, Modal, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import SubActivity from "./SubActivity";
import AddModal from "./AddModal";
import AddType from "./AddType";
import CategoryModal from "./CategoryModal";
import {
  addActivity,
  editActivity,
  getAllActivityData,
} from "../../redux/actions/activity_action";
import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action'
import { useDispatch, useSelector } from "react-redux";
import {
  addCategorySubType,
  createCategory, updateCategory, deleteCategory
} from "../../redux/actions/category_action";
import { getAnimals } from "../../redux/actions/animal_action";
import { getBreederEmployees } from "../../redux/actions/user_actions";
import { getAllGroups } from "../../redux/actions/group_action";
import { getForms } from "../../redux/actions/form_action";

const { Option } = Select;


function ActivityManagement() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const [modalvisible, setmodalvisible] = useState(false);
  const [modaltype, setmodaltype] = useState(false);
  const [modalCategoryvisible, setmodalCategoryvisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  //---activity--//
  const [allActivities, setallActivities] = useState([]);
  const [activityData, setactivityData] = useState([]);

  const [animals, setAnimals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [groups, setGroups] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [activitiesFilter, setActivitiesFilter] = useState('all');

  const [categoryName, setcategoryName] = useState("");


  useEffect(() => {
    // dispatch(getCategoriesByType("activity")).then((respnose) => {});
    getDataAnimal();
    getData();
  }, []);

  const getDataAnimal = async () => {
    setloader(true)
    // dispatch(EnableLoader());
    //console.log('calling animal form fetch');
    dispatch(getForms("animal")).then((response) => {
      //console.log('Form fetched ---- ');
      //console.log(response);
      if (response.payload.status === 200) {
        let filterBy = response.payload.data.filter(e => (e.breedersId.includes(localStorage.getItem('userId')))).map(e => e.categoryId._id)
        //console.log('form fetched --- ');
        // dispatch(EnableLoader());
        dispatch(getAllActivityData()).then((response) => {
          //console.log('activity data fetched  --- ');
          //console.log(response);
          setloader(false)
          // dispatch(DisableLoader())
          if (response.payload.status === 200) {
            setallActivities(response.payload.data.filter(e => (e.animals?.some(r => filterBy.includes(r)) || e.isDefault === false)))
            //console.log("matched", response.payload.data)

          } else {
            message.error(response.payload.message);
          }
        });
      }
      else {
        setloader(true)
        // dispatch(EnableLoader());
        dispatch(getAllActivityData()).then((response) => {
          setloader(false)
          // dispatch(DisableLoader())
          if (response.payload.status === 200) {
            setallActivities(response.payload.data)
            //console.log("matched", response.payload.data)

          } else {
            message.error(response.payload.message);
          }
        })
      }
    }).catch(error => {
      //console.log(error);
    });
  };

  const getData = () => {
    // dispatch(EnableLoader())
    dispatch(getAnimals()).then((resultAnimal) => {
      //console.log(resultAnimal);
      if (resultAnimal.payload.status === 200) {
        setAnimals(resultAnimal.payload.data);
      }
    });
    dispatch(getBreederEmployees()).then((resultEmployee) => {
      //console.log(resultEmployee);
      if (resultEmployee.payload.status === 200) {
        setEmployees(resultEmployee.payload.data);
      }
    });

    dispatch(getAllGroups()).then((resultGroup) => {
      //console.log(resultGroup);
      if (resultGroup.payload.status === 200) {
        setGroups(resultGroup.payload.data);
      }
    });
  };

  const ChangeModal = (item = "") => {
    setactivityData(item);
    setmodalvisible(!modalvisible);
  };
  const AddActivity = (values) => {
    dispatch(addActivity(values)).then((response) => {
      //dispatch(DisableLoader());
      if (response.payload.status === 200) {
        getDataAnimal();
        message.success(response.payload.message);
      } else {
        message.error(response.payload.message);
      }
    });
  };
  const EditActivity = (values) => {
    dispatch(editActivity(values._id, values)).then((response) => {
      //dispatch(DisableLoader());
      if (response.payload.status === 200) {
        getDataAnimal();
        message.success(response.payload.message);
      } else {
        message.error(response.payload.message);
      }
    });
  };
  //----//


  const refreshData = () => {
    getDataAnimal();
  }

  ///type
  const ChangeModalType = () => {
    setmodaltype(!modaltype);
  };
  const AddActivityType = (typeName) => {
    dispatch(addCategorySubType(typeName, currentCategory._id)).then((response) => {
      dispatch(DisableLoader());
      //console.log(response);
      if (response.payload.status === 200) {
        getDataAnimal();
        message.success(response.payload.message);
      } else {
        message.error(response.payload.message);
      }
    });
  };
  ///

  //for category
  const ChangeModalCategory = (categoryName = "") => {
    setcategoryName(categoryName)
    setmodalCategoryvisible(!modalCategoryvisible);
  };

  const AddActivityCategory = (categoryName) => {
    //message.success(categoryName)
    dispatch(
      createCategory({ name: categoryName, active: true, type: "activity" })
    ).then((response) => {
      //dispatch(DisableLoader());
      if (response.payload.status === 200) {
        getDataAnimal()
        message.success(response.payload.message);
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const changeActivitiesFilter = (data) => {
    //console.log(data);
    setActivitiesFilter(data);
  }


  const UpdateContactCategory = (categoryName, id) => {
    // dispatch(EnableLoader());
    setloader(false)
    let value = {};
    value.name = categoryName
    dispatch(updateCategory(id, value)).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message)
        getDataAnimal()
      }
      else {
        message.error(response.payload.message)
      }
    })
  }




  const DeleteCategory = (id) => {

    const onOkCalled = () => {
      //deleteCategoriesById(id)
      dispatch(EnableLoader());
      dispatch(deleteCategory(id)).then(response => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message)
          getDataAnimal()
        }
        else {
          message.error(response.payload.message)
        }
      });
    };


    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove category?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });

  }


  const categoriesTopBar = (activitiesItem) => {
    // //console.log("activitiesItem.activities>>", activitiesItem);
    // //console.log(user.userData);
    return (
      <div>
        <Row>
          <Col xs={24} className="textAlign-sm-box">
            <Space>
              <span className="primary-text primary-text-heading ">
                {activitiesItem.name}
              </span>

              {!activitiesItem.isDefault && <img onClick={() => ChangeModalCategory(activitiesItem)} width={'30'} src={require('../../../assets/images/edit.png')} alt="edit" />}

              {!activitiesItem.isDefault && <img width={'30'} onClick={() => DeleteCategory(activitiesItem._id)} src={require('../../../assets/images/delete2.png')} alt="delete" />}
            </Space>

            <div className="textAlign-sm-right textAlign-margintop-neg ">
              <Space>
                <Button
                  onClick={() => {
                    setCurrentCategory(activitiesItem);
                    ChangeModalType();
                  }}
                >
                  Add Type
                </Button>
                <Button onClick={() => {
                  setCurrentCategory(activitiesItem);
                  ChangeModal();
                }}>Add Item</Button>
              </Space>
            </div>
          </Col>
        </Row>

        <List
          size="large"
          dataSource={user.userData ? activitiesItem.activities.filter(e => e.breederId === user.userData.data._id)
            : activitiesItem.activities}
          renderItem={(item) => <List.Item>{ItemRenderer(item, activitiesItem)}</List.Item>}
        />
        <br />
      </div >
    );
  };

  const ItemRenderer = (item, activitiesItem) => {
    return <SubActivity name={"Feed"} refreshData={refreshData} setCategory={() => setCurrentCategory(activitiesItem)} ChangeModal={ChangeModal} item={item} />;
  };

  const filterActivities = (item) => {
    if (activitiesFilter === 'all') return item;
    return item._id === activitiesFilter ? item : null;
  }

  const filterData = (item) => {
    if (!keyword) return item;
    if (!(item.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return item;
    const itemactivitites = item.activities.filter(e => (!(e.categoryType.toLowerCase().search(keyword.toLowerCase()) === -1) || !(e.description.toLowerCase().search(keyword.toLowerCase()) === -1) || !(e.name.toLowerCase().search(keyword.toLowerCase()) === -1)));
    if (itemactivitites[0]) return { ...item, activities: itemactivitites }
    return null;
  }
  //


  const inputKeywordChange = (event) => {
    //console.log(event.target.value);
    setKeyword(event.target.value);
  }

  const [loader, setloader] = useState(true)

  return (
    <Spin size="large" style={{ position: 'fixed', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} spinning={loader}>
      <Row>
        <Col xs={24} lg={8} className="textAlign-sm-box">
          <h2 className="primary-text primary-text-heading">
            Activity Management
          </h2>
        </Col>

        <Col xs={24} lg={8} className="textAlign-sm-box">
          <Row>
            <Col xs={24} lg={20} className="primary-text">
              <Input
                onChange={inputKeywordChange}
                placeholder="Search animal"
                className="greybuttonsearch"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Col>

        <br />
        <Col xs={24} lg={8} className="textAlign-sm-box textAlign-md-right">
          <Space>
            <div style={{ marginTop: "-20px" }} className="hide-sm-box">
              <span className="primary-text">Showing</span>
            </div>
            <Form.Item name="animal">
              <Select
                style={{ minWidth: 200 }}
                defaultValue="All Activities"
                placeholder="Select animal"
                className="customSelect"
                onChange={changeActivitiesFilter}
              >
                <Option value={'all'}>{'All Activities'}</Option>
                {allActivities.map((type) => (
                  <Option value={type._id}>{type.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <div style={{ marginTop: "-20px" }}>
              <Button
                className="secondary-button"
                onClick={() => ChangeModalCategory()}
              >
                Add Category
              </Button>
            </div>
          </Space>
        </Col>
      </Row>

      {allActivities.filter(filterActivities).filter(filterData).map((item) => categoriesTopBar(item))}

      <AddType
        modaltype={modaltype}
        ChangeModalType={ChangeModalType}
        AddType={(typeName) => AddActivityType(typeName)}
      />

      {currentCategory && <AddModal
        modalvisible={modalvisible}
        ChangeModal={ChangeModal}
        AddActivity={(values) => AddActivity(values)}
        EditActivity={(values) => EditActivity(values)}
        activityData={activityData}
        animals={animals}
        employees={employees}
        groups={groups}
        currentCategory={currentCategory}
      />}

      <CategoryModal UpdateCategoty={(categoryName, id) => UpdateContactCategory(categoryName, id)}
        modalCategoryvisible={modalCategoryvisible}
        ChangeModalCategory={() => ChangeModalCategory()} categoryName={categoryName}
        AddCategory={(categoryName) => AddActivityCategory(categoryName)}
      />
    </Spin>
  );
}

export default ActivityManagement;
