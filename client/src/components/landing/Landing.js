import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Navigate to={`/@${auth.user.login}`} />
  }

  return (
    <div>
      <Link to={`/login`}>
        Login
      </Link>
      <Link to={`/register`}>
        Register
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Landing)
