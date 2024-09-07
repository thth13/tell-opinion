import React, {useState, useEffect} from 'react'
import {addAnswer} from '../../../actions/profile'
import DeleteOpinionPopup from '../../delete-opinion/DeleteOpinionPopup'
import TrashIcon from '@skbkontur/react-icons/Trash'
import {useTranslation} from 'react-i18next'
import { MenuItem, Kebab } from '@skbkontur/react-ui'
import {connect} from 'react-redux'
import styles from './styles.module.css'
import moment from 'moment'

const OpinionItem = ({profile, item, auth: {user}}) => {
  const {t} = useTranslation()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [handleDeleteOpinionPopup, setHandleDeleteOpinionPopup] = useState(false)

  const deleteOpinion = () => {
    setHandleDeleteOpinionPopup(true)
    // Toast.push(t('deleted'))
  }

  useEffect(() => {
    if (user && user.login ===  profile.profile.login) {
      setIsMyProfile(true)
    }
  }, [user, profile])

  return (
    <div key={item.date} className={styles.opinionItem}>
      <div className={styles.headOpinion}>
        <span className={styles.opinionDate}>{moment(item.date).fromNow()}</span>
        {handleDeleteOpinionPopup && 
          <DeleteOpinionPopup
            opinionId={item._id}
            setHandleDeleteOpinionPopup={setHandleDeleteOpinionPopup}
          />
        }
        {isMyProfile && 
          <Kebab size='medium'>
           {/* <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
             Report
           </MenuItem> */}
           <MenuItem
             icon={<TrashIcon />}
             onClick={deleteOpinion}
           >
             {t('delete')}
           </MenuItem>
          </Kebab>
        }
    </div>
      <p className={styles.opinionBody}>{item.text}</p>
      {item.answer && <p className={styles.opinionAnswer}>{item.answer}</p>}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {addAnswer})(OpinionItem)