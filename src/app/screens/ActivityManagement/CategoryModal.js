import React, { useEffect } from "react";
import { Row, Modal, Typography, Form, Space, message, Radio } from "antd";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
const { Title } = Typography;

function CategoryModal(props) {
  const [form] = Form.useForm();
  const {
    modalCategoryvisible,
    ChangeModalCategory,
    AddCategory,
    categoryName,
    UpdateCategoty,
  } = props;

  useEffect(() => {
    form.resetFields();
  }, [categoryName]);

  const onFinish = (values) => {
    if (!categoryName) {
      form.resetFields();
      AddCategory(values.category);
    } else {
      UpdateCategoty(values.category, categoryName._id);
    }
    ChangeModalCategory();
  };
  return (
    <>
      <Modal
        visible={modalCategoryvisible}
        footer={null}
        closable={false}
        centered={true}
      >
        <div style={{ paddingRight: "20px" }}>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              ["category"]: categoryName && categoryName.name ? categoryName.name : categoryName,
            }}
          >
            <Title level={3} strong>
              {categoryName ? `Update Category` : "Add Category"}
            </Title>

            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select category!",
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z ]+$/i),
                    message: "numbers and special characters not allowed"
                  },
                ]}
              >

                <Input placeholder="Enter category" style={{ width: 450 }} />
              </Form.Item>
            </Row>
            <br />
            <Space>
              <Button
                className="secondary-button"
                onClick={() => { ChangeModalCategory(); form.resetFields(); }}
              >
                Discard
              </Button>
              <Button className="secondary-button" htmlType="submit">
                {categoryName ? "Update" : "Add"}
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default CategoryModal;
