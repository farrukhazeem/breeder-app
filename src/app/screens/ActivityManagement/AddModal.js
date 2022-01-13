import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Typography,
  Form,
  Space,
  Input,
  Select,
  Radio,
  Checkbox,
} from "antd";
import Button from "../../components/button/button";
import RadioGroup from "../../components/radio/RadioGroup";
import SelectButton from "../../components/selectButton/SelectButton";
import moment from "moment";
import animal_reducer from "../../redux/reducers/animal_reducer";
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const year = moment().year("YYYY");
let allyears = [];
for (let index = 0; index < 10; index++) {
  allyears.push(moment().year() + index);
}
allyears = allyears.map(String);

const allmonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const allperiods = ["Daily", "Weekly", "Montly", "Yearly", "Once"];
const alldays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const alltypes = ["Alive", "Dead", "Pregnant", "All"];
const alltimes = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
];

function AddModal(props) {
  const {
    modalvisible,
    ChangeModal,
    AddActivity,
    EditActivity,
    activityData,
    animals,
    employees,
    groups,
    currentCategory,
  } = props;
  console.log(props.groups);
  const [form] = Form.useForm();
  const [Frequency, setFrequency] = useState("");
  const [assignToType, setAssignToType] = useState("Animal");
  const [isAssignEmployee, setIsAssignEmployee] = useState(false);
  useEffect(() => {
    form.resetFields();
    setFrequency(activityData.period);
  }, [activityData]);

  const onFinish = (values) => {
    console.log(values);
    console.log(activityData);
    if (activityData) {
      EditActivity({ ...activityData, ...values });
    } else {
      // activityData.employeeId =  [localStorage.getItem('userId')];
      console.log(activityData);
      console.log({
        ...values,
        employeeId: (values.employeeId && values.employeeId[0]) ? values.employeeId : [localStorage.getItem('userId')],
        categoryId: currentCategory._id,
        categoryName: currentCategory.name,
      });
      console.log("not exist");
      AddActivity({
        ...values,
        employeeId: (values.employeeId && values.employeeId[0]) ? values.employeeId : [localStorage.getItem('userId')],
        categoryId: currentCategory._id,
        categoryName: currentCategory.name,
      });
      form.resetFields();
    }
    ChangeModal();
  };

  const onValueChangeEvent = (event) => {
    if (event.assignToType) {
      setAssignToType(event.assignToType);
    }
  };

  const changeAssignToType = (ev) => {
    console.log(ev.target.value);
    if (ev.target.value === "Animal") {
      form.setFieldsValue({
        animalId: activityData.animalId,
        employeeId: activityData.employeeId,
      });
    } else if (ev.target.value === "Group") {
      form.setFieldsValue({ groupId: activityData.groupId });
    }
  };

  const changeIsEmployeeAssign = (ev) => {
    console.log(ev.target.value);
    setIsAssignEmployee(ev.target.value);
  }

  return (
    <>
      <Modal visible={modalvisible} footer={null} closable={false} centered>
        <div style={{ paddingRight: "20px" }} id="area">
          <Form
            onFinish={onFinish}
            form={form}
            initialValues={{
              ["name"]: activityData.name,
              ["categoryType"]: activityData.categoryType,
              ["description"]: activityData.description,
              ["addgroup"]: activityData.addgroup,
              ["time"]: activityData.time,
              ["timePeriod"]: activityData.timePeriod,
              ["period"]: activityData.period,
              ["years"]: activityData.years,
              ["days"]: activityData.days,
              ["months"]: activityData.months,
              ["assignToType"]: activityData.assignToType
                ? activityData.assignToType
                : assignToType,
              ["employeeId"]: activityData.employeeId,
              ["groupId"]: activityData.groupId,
              ["animalId"]: activityData.animalId,
              ['isAssignEmployee']: isAssignEmployee
            }}
            onValuesChange={onValueChangeEvent}
          >
            <Title level={3} strong>
              Create Activity
            </Title>
            <Row>
              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  Item name:
                </div>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input name!", },
                    {
                      pattern: new RegExp(/^[a-zA-Z ]+$/i),
                      message: "only characters are allowed"
                    },
                  ]}
                >
                  <Input
                    autoComplete={"off"}
                    style={{ width: "85%" }}
                    placeholder="Input Item name"
                    className="textAlign-sm-marginLeft customInput"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  Item type:
                </div>
                <Form.Item
                  name="categoryType"
                  rules={[
                    {
                      required: true,
                      message: "Please input item type!",
                    },
                  ]}
                >
                  <Select
                    getPopupContainer={() => document.getElementById("area")}
                    className="textAlign-sm-marginLeft customSelect leftAlignData"
                    style={{ width: "90%" }}
                    placeholder="Please select type"
                  >
                    {currentCategory &&
                      currentCategory.subType &&
                      currentCategory.subType.map((type) => (
                        <Option value={type} label={type}>
                          {type}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Description:
            </div>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input item description!",
                },
              ]}
            >
              <TextArea
                id="textarea"
                row={3}
                style={{ width: "91%", fontFamily: "Arial" }}
                placeholder="Input description"
                className="textAlign-sm-marginLeft customInput"
              />
            </Form.Item>

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              {getUserFromLocalStorage() !== "Individual" ? `Assign Animal/Groups:` : `Assign Animal`}
            </div>
            <Row
              className="primary-text fs-120 textAlign-sm-modalleft"
              style={{ justifyContent: "center" }}
            >
              <Form.Item name="assignToType">
                <RadioGroup onChange={changeAssignToType}>
                  <Radio value="Animal">Animal</Radio>
                  {getUserFromLocalStorage() !== "Individual" && <Radio value="Group">Group</Radio>}

                </RadioGroup>
              </Form.Item>
            </Row>

            {assignToType === "Animal" ? (
              <>
                <Row>
                  <Col xs={24}>
                    <Form.Item
                      name="animalId"
                      rules={[
                        {
                          required: true,
                          message: "Please select one atleast!",
                        },
                      ]}
                    >
                      <Select
                        getPopupContainer={() =>
                          document.getElementById("area")
                        }
                        className="textAlign-sm-marginLeft customSelect leftAlignData"
                        mode="multiple"
                        style={{ width: "90%" }}
                        placeholder="Please select animals"
                      >
                        {animals.map((animal) => (
                          <Option value={animal._id} label={animal.data?.name}>
                            {animal.data?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <div className="primary-text fs-120 textAlign-sm-modalleft" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>Assign Team Member:</div>
                  <div>
                    <Row
                      className="primary-text fs-120 textAlign-sm-modalleft"
                      style={{ justifyContent: "center" }}
                    >
                      <Form.Item name="isAssignEmployee">
                        <RadioGroup onChange={changeIsEmployeeAssign}>
                          <Radio value={true}>True</Radio>
                          <Radio value={false}>False</Radio>
                        </RadioGroup>
                      </Form.Item>
                    </Row>
                  </div>
                </div>
                {
                  isAssignEmployee ? (
                    <Row>
                      <Col xs={24}>
                        <Form.Item
                          name="employeeId"
                          rules={[
                            {
                              required: true,
                              message: "Please select one atleast!",
                            },
                          ]}
                        >
                          <Select
                            getPopupContainer={() =>
                              document.getElementById("area")
                            }
                            className=" textAlign-sm-marginLeft customSelect leftAlignData"
                            style={{ width: "90%" }}
                            mode="multiple"
                            placeholder="Please select team members"
                          >
                            {employees.map((employee) => (
                              <Option value={employee._id} label={employee.name}>
                                {employee.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }


              </>
            ) : (
                <Row>
                  <Col xs={24}>
                    <Form.Item
                      name="groupId"
                      rules={[
                        {
                          required: true,
                          message: "Please select one atleast!",
                        },
                      ]}
                    >
                      <Select
                        className="textAlign-sm-marginLeft customSelect leftAlignData"
                        mode="multiple"
                        style={{ width: "90%" }}
                        placeholder="Please select group"
                      >
                        {groups.map((group) => (
                          <Option value={group._id} label={group.name}>
                            {group.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}



            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Frequency:
            </div>
            <Row className="primary-text fs-120 textAlign-sm-modalleft">
              <div>
                <Form.Item
                  name="period"
                  rules={[
                    {
                      required: true,
                      message: "Please select period!",
                    },
                  ]}
                >
                  <RadioGroup onChange={(e) => setFrequency(e.target.value)}>
                    {allperiods.map((period) => (
                      <Radio value={period}>{period}</Radio>
                    ))}
                  </RadioGroup>
                </Form.Item>
              </div>
            </Row>

            <Row className="primary-text fs-120 textAlign-sm-modalleft">
              <br />
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please select atleast one time!",
                  },
                ]}
              >
                <Checkbox.Group>
                  {alltimes.map((time, index) => (
                    <SelectButton value={time} title={time} index={index} />
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </Row>

            <Row
              className="primary-text fs-120 textAlign-sm-modalleft"
              style={{ justifyContent: "center" }}
            >
              <Form.Item
                name="timePeriod"
                rules={[
                  {
                    required: true,
                    message: "Please select meridiem!",
                  },
                ]}
              >
                <RadioGroup>
                  <Radio value="A.M">A.M</Radio>
                  <Radio value="P.M">P.M</Radio>
                </RadioGroup>
              </Form.Item>
            </Row>

            {Frequency === "Weekly" ||
              Frequency === "Montly" ||
              Frequency === "Yearly" ? (
                <Row className="primary-text fs-120 textAlign-sm-modalleft">
                  <br />
                  <Form.Item
                    name="days"
                    rules={[
                      {
                        required: true,
                        message: "Please select atleast one day!",
                      },
                    ]}
                  >
                    <Checkbox.Group>
                      {alldays.map((day, index) => (
                        <SelectButton
                          value={day}
                          title={day}
                          index={index + alltimes.length}
                        />
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </Row>
              ) : (
                <div></div>
              )}

            {Frequency === "Montly" || Frequency === "Yearly" ? (
              <Row className="primary-text fs-120 textAlign-sm-modalleft">
                <br />
                <Form.Item
                  name="months"
                  rules={[
                    {
                      required: true,
                      message: "Please select atleast one month!",
                    },
                  ]}
                >
                  <Checkbox.Group>
                    {allmonths.map((time, index) => (
                      <SelectButton
                        value={time}
                        title={time}
                        index={index + alltimes.length + alldays.length}
                      />
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Row>
            ) : (
                <div></div>
              )}

            {Frequency === "Yearly" && (
              <Row className="primary-text fs-120 textAlign-sm-modalleft">
                <br />
                <Form.Item
                  name="years"
                  rules={[
                    {
                      required: true,
                      message: "Please select atleast one time!",
                    },
                  ]}
                >
                  <Checkbox.Group>
                    {allyears.map((time, index) => (
                      <SelectButton
                        value={time}
                        title={time}
                        index={
                          index +
                          alltimes.length +
                          alldays.length +
                          allmonths.length
                        }
                      />
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Row>
            )}

            <Space>
              <Button className="secondary-button" onClick={ChangeModal}>
                Discard
              </Button>
              <Button className="secondary-button" htmlType="submit">
                {activityData ? "Update" : "Add"}
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AddModal;
