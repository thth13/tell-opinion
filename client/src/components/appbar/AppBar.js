import {Link} from 'react-router-dom'
import styles from './styles.module.css'
import homeIcon from '../../img/home.png'
import searchIcon from '../../img/search.png'
import editProfileIcon from '../../img/edit.png'
import LogoutBtn from '../logout-btn/LogoutBtn'

const AppBar = () => (
  <div className={styles.appBar}>
    <Link to="/"><img className={styles.icon} src={homeIcon} alt="home" /></Link>
    <Link to="/search"><img className={styles.icon} src={searchIcon} alt="search" /></Link>
    <Link to="/editProfile"><img className={styles.icon} src={editProfileIcon} alt="edit profile" /></Link>
    <LogoutBtn/>
  </div>
)

export default AppBar