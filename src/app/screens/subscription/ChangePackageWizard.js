import { Modal, Space, Tabs, Typography } from 'antd';
import Button from '../../components/button/button';
import React from 'react'
import AnimalProductList from '../AnimalProductList/AnimalProductList';
import EmployeeDisplayList from './EmployeeDisplayList';
const { TabPane } = Tabs;

function ChangePackageWizard(props) {
  console.log(props);

  return (
    <Modal
      visible={props.visible}
      footer={null}
      closable={false}
      centered={true}
      width={1000}
    >
      <div>
        <div>
          <Typography.Text>Kindly Archive - {props.animalCountDiff > 0 ? props.animalCountDiff : 0} animal(s), {props.productCountDiff > 0 ? props.productCountDiff : 0} product(s), {props.employeeCountDiff > 0 ? props.employeeCountDiff : 0} employee(s)</Typography.Text>
          <Tabs>
            <TabPane tab="Animals" key="1">
              <AnimalProductList itemtype="animal" isPackageChange={true} data={props.animal ? props.animal : []} refreshData={props.refreshAnimal} />
            </TabPane>
            <TabPane tab="Products" key="2">
              <AnimalProductList itemtype="product" isPackageChange={true} data={props.product ? props.product : []} refreshData={props.refreshProduct} />
            </TabPane>
            <TabPane tab="Employees" key="3">
              <EmployeeDisplayList itemtype="employee" isPackageChange={true} data={props.employee ? props.employee : []} refreshData={props.refreshEmployee} />
            </TabPane>
          </Tabs>
        </div>
        <Space>

          <Button className="secondary-button" onClick={props.closeModal} style={{ justifyContent: "right" }}>
            Discard
            </Button>
          <Button className="secondary-button" disabled={(props.animalCountDiff > 0 || props.productCountDiff > 0 || props.employeeCountDiff > 0)} onClick={props.subscribeClick} style={{ justifyContent: "right" }}>
            Subscribe
            </Button>

        </Space>
      </div>
    </Modal>
  )
}


export default ChangePackageWizard;
