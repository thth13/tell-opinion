import {useState, useEffect} from 'react'
import {Helmet} from "react-helmet"
import {connect} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {getUserList, loadMoreUsers} from '../../actions/profile'
import {useTranslation} from 'react-i18next'
import {BottomScrollListener} from 'react-bottom-scroll-listener'
import  {  useBottomScrollListener  }  from  'react-bottom-scroll-listener' ;
import { Link } from 'react-router-dom'
import noAvatar from "../../img/noAvatar.png"
import AppBar from "../appbar/AppBar"

import styles from './styles.module.css'
import Navbar from '../navbar/Navbar'

const FindUsers = ({getUserList, userList, user, loadMoreUsers}) => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onChange = e => {
    setUserName(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
 
   getUserList(userName)
  }

  const loadMore = async () => {
    setIsLoading(true)
    await loadMoreUsers(userName, userList.length)
    setIsLoading(false)
  }
  useBottomScrollListener(loadMore);

  useEffect(() => {
    getUserList()
  }, [getUserList])

  const comeBack = () => {
    navigate(`/`)
  }

  return (
    <>
      <Helmet>
        <title>Find users | Tell Opinion</title>
      </Helmet>
      <AppBar />
      <main className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backArrowButton} onClick={comeBack}>
            <span className={styles.backArrow}></span>
          </button>
          <h1 className={styles.mainTitle}>{t('userList')}</h1>
        </header>
        <form onSubmit={onSubmit} className={styles.searchForm}>
          <input
            className={styles.field}
            value={userName}
            onChange={onChange}
            placeholder={t('findUser')}
          />
          <button className={styles.findButton} type='submit'>{t('find')}</button>
        </form>
        {userList && userList.map((item, i) => (
          <Link to={`/${item.login}`}>
            <div className={styles.userBlock}>
              <img
                src={item && item.avatar ? `https://spaces.tell-opinion.com/${item.avatar}` : noAvatar}
                alt='avatar'
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <h3 className={styles.userLogin}>{item.login}</h3>
                <span className={styles.span}>{item.name && item.name}</span>
                <span className={styles.span}>{item.description && item.description}</span>
              </div>
            </div>
          </Link>
        ))}
        {/* <div ref={scrollRef}>Callback will be invoked when this container is scrolled to bottom.</div>; */}

        {/* <button style={{marginBottom: 500}} onClick={loadMore}>klic</button> */}
        {/* {!isLoading && <BottomScrollListener onBottom={loadMore} />} */}
      </main>
      <Navbar />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userList: state.profile.userList
})

export default connect(mapStateToProps, {getUserList, loadMoreUsers})(FindUsers)