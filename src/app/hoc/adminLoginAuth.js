import React, { useEffect, useState } from 'react';
import { auth } from '../redux/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from '../redux/actions/loader_action';
export default function (ComposedClass, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const [isLoaded, setIsLoaded] = useState(false);
        const dispatch = useDispatch();

        useEffect(() => {
            console.log(window.location);
            
            if(!localStorage.getItem('w_auth')) return props.history.push('/admin/login');
            
            dispatch(EnableLoader())

            dispatch(auth()).then(async response => {
                console.log("auth response--->", response.payload)
                dispatch(DisableLoader())
                setIsLoaded(true);
                if(response.payload.isAdmin) return props.history.push('/admin/dashboard')

                if (await !response.payload.isAuth) {
                    props.history.push('/admin/login')
                } else {
                    props.history.push('/dashboard');
                }
            })

        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        );
        // return null;
   
    }
    return AuthenticationCheck
}

