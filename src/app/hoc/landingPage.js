import React, { useEffect } from 'react';
import { auth } from '../redux/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from '../redux/actions/loader_action';
import { message } from 'antd'

export default function (ComposedClass, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            if (!localStorage.getItem('w_auth')) return props.history.push('/');
            dispatch(EnableLoader())
            dispatch(auth()).then(async response => {
                dispatch(DisableLoader())
                if (response.payload?.message === "Admin blocked your account") {
                    message.error(response.payload.message)
                    return props.history.push('/');
                }
                if (await !response.payload.isAuth) {
                    props.history.push('/')
                }
                else {
                    if (response.payload.isAdmin) return props.history.push('/admin/dashboard')
                    else props.history.push('/dashboard');
                }
            })

        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

