import React, { useEffect } from 'react';
import { auth } from '../redux/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from '../redux/actions/loader_action';
export default function (ComposedClass, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            if (!localStorage.getItem('w_auth')) return props.history.push('/login');

            dispatch(EnableLoader())

            dispatch(auth()).then(async response => {
                dispatch(DisableLoader())
                if (await !response.payload.isAuth) {
                    props.history.push('/login')
                } else {
                    props.history.push('/main');
                }
            })

        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

