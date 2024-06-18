import logo from '../../img/logo.svg'
import styles from './styles.module.css'

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <img className={styles.logo} src={logo} alt="Loading..." />
    </div>
  )
}

export default LoadingScreen