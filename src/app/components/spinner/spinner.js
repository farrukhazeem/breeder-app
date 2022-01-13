import React, { } from 'react';
import { Spin, } from 'antd';
import { connect } from 'react-redux';

function Spinner(props) {
    return (
        <div>

            <Spin size="large" style={{ position: 'fixed', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} spinning={props.loader.isLoading}>
                {props.children}
            </Spin>

        </div>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);
    return { loader: state.loader };
}

export default connect(mapStateToProps)(Spinner);
