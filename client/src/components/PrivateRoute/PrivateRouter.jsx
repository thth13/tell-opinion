import { connect } from "react-redux";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

let PrivateRoute = ({component, auth, user, rest}) => {
  debugger
  return (
    <Routes>
      <Route
      {...rest}
      render={() => (auth !== null && user !== null)
        ? component
        : <Navigate to="/login"/>
      }
    />
    </Routes>
  )
}

let mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  component: ownProps.component,
  rest: ownProps
})

export default connect(mapStateToProps, null)(PrivateRoute);