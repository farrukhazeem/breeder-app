import React from 'react'
import { Upload, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function Charity(propss) {
    const { handleUpload, fileList, setfileList, setCurrentIndex, registerSteps } = propss

    const props = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setfileList(newFileList)
        },
        beforeUpload: file => {
            if (fileList.length < 9) {
                setfileList([...fileList, file])
            }
        },
    };

    return (
        <div className="btnAntd">
            <div style={{ marginTop: 20 }}></div>
            <span>Documents are required for verification of Charity Account</span>
            <div style={{ marginTop: 20 }}></div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />} style={{ textAlign: "center", width: 190 }}>Select Files</Button>
            </Upload>

            <Row gutter={5} style={{ marginTop: 20 }}>
                {/* <Col span={6}>
                    <Button
                        className="register-form-button backButton secondary-button"
                        onClick={() => { setCurrentIndex(registerSteps[1]); }}  >
                        Back
                            </Button>
                </Col> */}
                <Col span={24}>
                    <Button type="submit" htmlType="submit"
                        className="register-form-button secondary-button"
                        disabled={fileList.length === 0}
                        onClick={() => handleUpload()}
                    >
                        Submit
                        </Button>
                </Col>
            </Row>
        </div>
    )
}
