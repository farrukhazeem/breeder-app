import React, { useEffect } from 'react';
import { auth } from '../redux/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from '../redux/actions/loader_action';
import { getUserFromLocalStorage } from '../helpers/helperFuctions'
import routes from '../helpers/routes'
import { message } from 'antd'

export default function (ComposedClass, adminRoute = null, isSetupWizard = false) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // console.log(window.location);
            dispatch(EnableLoader())

            dispatch(auth()).then(async response => {
                console.log("auth response--->", response.payload)
                if (response.payload?.message === "Admin blocked your account") {
                    message.error(response.payload.message)
                    return props.history.push('/login');
                }
                dispatch(DisableLoader())
                if (isSetupWizard) {
                    if (await !response.payload.isAuth) {
                        props.history.push('/');
                    } else if (response.payload.isAdmin) {
                        return props.history.push('/admin/dashboard');
                    } else if (response.payload.data.setupWizardCompleted) {
                        if (props.location.state && props.location.state.isAllowed) {
                            return;
                        } else {
                            props.history.push('/main');
                        }
                    }
                } else {
                    if (await !response.payload.isAuth) {
                        props.history.push('/');
                    }
                    else if (response.payload.isAdmin) {
                        // return props.history.push('/admin/dashboard');
                    }
                    else if ((!response.payload.data.setupWizardCompleted)) {
                        props.history.push('/setupWizard');
                    }
                    else if (getUserFromLocalStorage() === "Individual") {
                        let Rout = routes.filter(e => e.notaccess !== getUserFromLocalStorage())
                        if (Rout.filter(e => window.location.pathname.includes(e.route)).length < 1
                            && window.location.pathname !== "/businessprofile" &&
                            !window.location.pathname.includes("/notification") &&
                            !window.location.pathname.includes("/settings")) {
                            props.history.push('/animal');
                        }
                    }
                }

            })

        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

