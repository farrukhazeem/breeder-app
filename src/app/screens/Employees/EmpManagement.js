import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Space, message, Typography, Modal } from "antd";
import Card from "../../components/card/card";
import Button from "../../components/button/button";
import {
  getAllEmp,
  removeEmp,
  getBreederEmployees,
} from "../../redux/actions/user_actions";
//import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action'
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";

const names = [
  "robwilliomsaon",
  "Robberthi",
  "alexa123",
  "williamson098",
  "alexa432",
  "carter456",
  "victoria09",
  "Sick123",
  "carter001",
  "victoria1990",
];
const { Text } = Typography;
export default function EmpManagement(props) {
  const dispatch = useDispatch();
  const [employees, setemployees] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(EnableLoader());
    dispatch(getBreederEmployees()).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setemployees(response.payload.data);
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const RemoveEmp = (id) => {
    console.log("removing empmloyee", id);
    const onOkCalled = () => {
      console.log("ok called");
      dispatch(EnableLoader());
      dispatch(removeEmp(id)).then((response) => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          loadData();
        } else {
          message.error(response.payload.message);
        }
      });
    };

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to remove employee?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: onOkCalled,
    });
  };

  return (
    <div>
      {/* <div className="primary-text primary-text-heading">              
               Employee Management
                
                <div style={{float:"right"}}>
                <Button  ><Link to={`/employee`}>Add a new Employee</Link></Button> 
                </div> 
           </div> */}

      <Row>
        <Col span={12} xs={24} md={12} className="textAlign-sm-box">
          <h2 className="primary-text primary-text-heading">
            Team Member Management
          </h2>
        </Col>
        <Col span={12} className="textAlign-md-box textAlign-sm-right">
          <Link to={"employees/add-employee"}>
            <Button className="secondary-button">Add a new Team Member</Button>
          </Link>
        </Col>
      </Row>

      <div className="br-form-list">
        <Row gutter={30}>
          {employees.map((emp) => (
            <Col xs={24} sm={12} md={8} lg={6} key={emp._id}>
              <Card className="form-list-card">
                <Space direction="vertical">
                  <img
                    src={
                      !emp.image
                        ? require("../../../assets/images/emp/men2.png")
                        : emp.image
                    }
                    style={{
                      borderRadius: "25px",
                      width: "50px",
                      height: "50px",
                    }}
                    alt="logo"
                  />
                  <Link to={`/employees/employee/${emp._id}`}>
                    <Text strong>{emp.name}</Text>
                  </Link>
                  <Text className="secondary-text">{emp.email}</Text>
                </Space>
                <div className="card-action">
                  <Row>
                    <Col span={12} className="editform">
                      <Link to={{ pathname: '/employees/edit-employee', state: { id: emp._id } }}>
                        <Text strong>Edit</Text>
                      </Link>
                    </Col>
                    <Col span={12}>
                      <Link>
                        <Text strong onClick={() => RemoveEmp(emp._id)}>
                          Remove
                        </Text>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
