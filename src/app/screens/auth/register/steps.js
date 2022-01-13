import React,{useState} from "react";
import { Steps, Button, message,Row,Col } from 'antd';
import Register from './register'

const { Step } = Steps;

const steps = [
  {
    
    content: <Register/>,
  },
  {
    
    content: 'Second-content',
  },
  {
   
    content: 'Last-content',
  },
];

function MainRegister(props) {

  const [current, setcurrent] = useState(0)

  const Results = () => (
    <div >Already a member? <a href="/login">Login </a></div>
  )

  
    return (
      <div>
           <Row >
            <Col span={12} style={{backgroundColor:"black"}}><div></div></Col>


            <div className="app">
          <Col span={12} >

          <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
              <div>
            <Button type="primary" onClick={() => setcurrent(current + 1)}>
              Continue
            </Button>
            { current === 0 ? <Results /> : null }
            </div>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '' }} onClick={() => setcurrent(current - 1)}>
              Back
            </Button>
          )}
        </div>
        </Col>

        </div>
        </Row>
      </div>
    );
  
}

export default MainRegister