import React, {useEffect} from "react"
import c from "classnames"
import styles from "./styles.module.css"
import OpinionItem from "../OpinionItem/OpinionItem"
import OpinionForm from "../OpinionForm/OpinionForm"
import AdviceInMyProfile from "./AdviceInMyProfile/AdviceInMyProfile"
import {BottomScrollListener} from 'react-bottom-scroll-listener';
import {useState} from "react"

const Opinions = ({
  profile, opinions, isMyProfile, 
  isOneDayAfter, newOpinion, setIsShowThanksPopup,
  opinionsLength, loadMore
}) => {
  const [isShowAdviceInMyProfile, setIsShowAdviceInMyProfile] = useState();
  
  const closeAdviceInMyprofile = () => {
    setIsShowAdviceInMyProfile(false);
    localStorage.setItem('adviceClosed', false)
  }

  useEffect(() => {
    if (!localStorage.adviceClosed)  {
      setIsShowAdviceInMyProfile(true)
    } else {
      setIsShowAdviceInMyProfile(false)
    }
  }, [])

  return profile && (
    <section className={c(styles.opinions, styles.section)}>
      <h2 className={styles.opinionsTitle}>Opinions</h2>
      {!isMyProfile && isOneDayAfter && 
        <OpinionForm
          newOpinion={newOpinion} 
          profile={profile}
          setIsShowThanksPopup={setIsShowThanksPopup} 
        />
      }
      {isMyProfile && isShowAdviceInMyProfile &&
        <AdviceInMyProfile 
          name={profile.name}
          setIsShowAdviceInMyProfile={closeAdviceInMyprofile} 
        />
      }
      {!isMyProfile && !isOneDayAfter && <p className={styles.advice}>
        You have already left an opinion for this user today.
        Repeat tomorrow
      </p>}
      <div className={styles.opinionItemsContainer}>
        {opinions && opinions.length < 1 && 
          <p className={styles.noOpinions}>
            {isMyProfile ? 'You don`t have any opinions' : 'User has no opinions'}
          </p>
        }
        {opinions && opinions.map(item => (
          <OpinionItem key={item.date} item={item} />
        ))}
        {opinionsLength !== opinions.length &&
          <BottomScrollListener onBottom={loadMore} />
        }
      </div>
    </section>
  )
}

export default Opinions