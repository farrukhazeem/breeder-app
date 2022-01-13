import React,{useState} from 'react';
import { Row,Col,Modal} from 'antd';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom'
import './modal.scss';


function SuccessRegister() {

    const [visible, setVisible] = useState(true);

     return(
        <div>
       
            <Modal footer={null} closable={false} bodyStyle={{borderRadius:"200px"}}
            visible={visible} 
            >
             <h2 className="primary-text"> <b className="primary-text-heading">Your Dog is Registered</b></h2>
             <h2 className="primary-text"> <b className="primary-text-heading">Its animal Id is "here"</b></h2>

             <div id="outer">
                <div class="inner"><Button className="secondary-button" onClick={()=> window.location.reload()}>Add a new Animal</Button></div>
                <div class="inner"><Button className="secondary-button"><Link to={"/animal/profile"}>View Profile</Link></Button></div>
                </div>
          
            <Link to={"/animal"}><h3 className="primary-text"><u>Return to animal management</u></h3></Link>
            </Modal>
        
      </div>

     )
}
export default SuccessRegister;