import React from "react"
import c from "classnames"
import styles from "./styles.module.css"
import OpinionItem from "../OpinionItem/OpinionItem"
import OpinionForm from "../OpinionForm/OpinionForm"
import AdviceInMyProfile from "./AdviceInMyProfile/AdviceInMyProfile"
import { useState } from "react"

const Opinions = ({
  profile, opinions, isMyProfile, 
  isOneDayAfter, newOpinion, setIsShowThanksPopup
}) => {
  const [isShowAdviceInMyProfile, setIsShowAdviceInMyProfile] = useState(true);

  return (
    <section className={c(styles.opinions, styles.section)}>
      <h2 className={styles.opinionsTitle}>Мнения</h2>
      {!isMyProfile && isOneDayAfter && <OpinionForm newOpinion={newOpinion} 
        profile={profile} setIsShowThanksPopup={setIsShowThanksPopup} 
      />}
      {isMyProfile && isShowAdviceInMyProfile && <AdviceInMyProfile 
        name={profile.name} setIsShowAdviceInMyProfile={setIsShowAdviceInMyProfile} 
      />}
      <div className={styles.opinionItemsContainer}>
        {opinions && opinions.length < 1 && 
          <p className={styles.noOpinions}>
            {isMyProfile ? 'You dont have any opinions' : 'User has no opinions'}
          </p>
        }
        {opinions && opinions.map(item => (
          <OpinionItem key={item.date} item={item} />
        ))}
      </div>
      {/* {!isMyProfile && isOneDayAfter && <OpinionForm newOpinion={newOpinion} 
        profile={profile} setIsShowThanksPopup={setIsShowThanksPopup} 
      />} */}
      {!isMyProfile && isOneDayAfter && <p className={styles.advice}>
        Вы уже оставляли мнение этому пользователю сегодня.
        Повторите завтра
      </p>}
      {/* {isMyProfile && (
        <p className={styles.advice}>
          {profile && profile.name && (
            <span className={styles.adviceName}>{profile.name}, </span>
          )}
          чтобы получать больше мнений, 
          делитесь сайтом в соц.сетях.
        </p>
      )} */}
    </section>
  )
}

export default Opinions