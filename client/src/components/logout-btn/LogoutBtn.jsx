import React from "react"
import { connect } from "react-redux"
import { logoutsUser } from "../../actions/auth"
import styles from './styles.module.css'
import logout from '../../img/logout.png'
import { Link } from "react-router-dom"

const LogoutBtn = (props) => {
  return (
    <Link to="/" onClick={props.logoutsUser}>
      <img className={styles.icon} src={logout} alt="logouts" />
    </Link>
  )
}

export default connect(null, {logoutsUser})(LogoutBtn)