import React, { useState, useEffect } from "react";
import { Row, Col, Form, Space, } from "antd";
import Button from "../../../components/button/button";
import "../RegisterAnimalProduct.scss";
import FormGenerator from "../FormGenerator";
import { getUserId } from "../../../redux/actions/user_actions";
import moment from "moment";

function ProfileAnimalUpdate(props) {
  const { formStructure, animal, seteditModal, updateData } = props;
  console.log("formStructure", formStructure);
  console.log("animal", animal);
  const [categoryForm, setCategoryForm] = useState(null);
  const [userId, setUserId] = useState(getUserId());

  const [form] = Form.useForm();

  useEffect(() => {
    if (animal) {
      let data = animal.data;
      delete data.quantity;
      // data.birthdate = moment(data.birthdate);
      // formStu
      formStructure.formStructure
        .filter(
          (e) =>
            e.breedersId.map((bid) => bid._id).includes(userId) &&
            e.type === "date"
        )
        .forEach((value, index, array) => {
          data[value.name] = moment(data[value.name]);
        });

      console.log("The default form structure ", formStructure);
      form.setFieldsValue(data);
    }
    if (formStructure) {
      setCategoryForm(formStructure);
    }
  }, [animal, formStructure]);

  //const dispatch = useDispatch();

  const onFinishRegistered = (values) => {
    updateData(values);
    // let val2 = { ...animal.data, ...values }
    // var formData = new FormData();
    // formData.append("data", JSON.stringify(val2));
    // dispatch(EnableLoader());
    // dispatch(updateAnimal(formData, animal._id)).then((response) => {
    //     console.log(response);
    //     dispatch(DisableLoader());
    //     if (response.payload.status === 200) {
    //         message.success(response.payload.message);
    //         seteditModal(false)
    //     }
    //     else {
    //         message.error(response.payload.message);
    //     }
    // });
  };

  return (
    <div>
      <Form onFinish={onFinishRegistered} form={form}>
        <Row className="">
          <Col flex={4}></Col>
          <Col flex={0}>
            <Space>
              <Button
                className="secondary-button"
                onClick={() => window.location.reload()
                  //seteditModal(false)
                }
              >
                Discard
              </Button>

              <Button
                htmlType="submit"
                disabled={!categoryForm}
                className="secondary-button"
              >
                Update
              </Button>
            </Space>
          </Col>
        </Row>

        <div style={{ marginTop: 10 }}></div>
        <Row>
          {categoryForm && (
            <FormGenerator
              edit={true}
              formStructure={categoryForm.formStructure.filter((e) =>
                e.breedersId.map((bid) => bid._id).includes(userId)
              ).filter(e => !(e.name == 'quantity'))}
            />
          )}
        </Row>
      </Form>
    </div>
  );
}

export default ProfileAnimalUpdate;
