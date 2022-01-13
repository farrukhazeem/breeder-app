import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";
import { DisableLoader, EnableLoader } from "../redux/actions/loader_action";
import { auth } from "../redux/actions/user_actions";

function PrivateRoute({ children, ...rest }) {
  console.log(rest);
  const dispatch = useDispatch();
  //   const [auth, setAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('w_auth')) return rest.history.push('/admin/login');

    dispatch(EnableLoader())

    dispatch(auth()).then(async response => {
      dispatch(DisableLoader())
      if (await !response.payload.isAuth) {
        return rest.history.push('/admin/login');
        // props.history.push('/login')
        // setAuth(false);
      } else {
        if (!response.payload.isAdmin) return rest.history.push('/dashboard')

        // setAuth(true);
        setIsLoaded(true);
        // props.history.push('/admin');
      }
    })

  }, [dispatch, rest.history])

  return isLoaded ? (
    <Route
      {...rest}
      render={({ location }) => children}
    //   <Redirect to={{pathname: "/admin/settings", state: {from: location}}}/>
    // render={({ location }) =>
    //   fakeAuth.isAuthenticated ? (
    //     children
    //   ) : (
    //     <Redirect
    //       to={{
    //         pathname: "/login",
    //         state: { from: location }
    //       }}
    //     />
    //   )
    // }
    />
  ) : null;
}

const mapStateToProps = (states) => {
  return { user: states.user };
}


export default withRouter(PrivateRoute);
// export default PrivateRoute;