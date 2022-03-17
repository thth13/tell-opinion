import { connect } from "react-redux";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

let PrivateRoute = ({component, isAuthenticated, rest}) => {
  return (
    <Routes>
      <Route
      {...rest}
      element={
        isAuthenticated
          ? component
          : <Navigate to="/login"/>
      }
    />
    </Routes>
  )
}

let mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  component: ownProps.component,
  rest: ownProps
})

export default connect(mapStateToProps, null)(PrivateRoute)