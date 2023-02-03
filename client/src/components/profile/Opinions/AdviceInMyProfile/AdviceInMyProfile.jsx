import React, {useState} from 'react'
import copyIcon from '../../../../img/copy-icon.svg'
import {useTranslation} from 'react-i18next'
import styles from './styles.module.css'

const AdviceInMyProfile = ({name, setIsShowAdviceInMyProfile, login}) => {
  const {t} = useTranslation()
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  const closeAdvice = () => {
    setIsShowAdviceInMyProfile(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`https://tell-opinion.com/${login}`)
    setShowCopiedTooltip(true)
    setTimeout(() => setShowCopiedTooltip(false), 3000);
  }

  return (
    <div className={styles.adviceInMyProfile}>
      <button className={styles.closeAdviceButton} onClick={closeAdvice}></button>
      {name && <span className={styles.adviceName}>{name}, </span>}
      {name ? t('t') : t('T')}{t('toReceiveOpinions')}
      <span onClick={copyLink} className={styles.link}>
        Your link: https://tell-opinion.com/{login}
        <img className={styles.copyIcon} src={copyIcon} alt='Copy link icon' />
      </span>
        {showCopiedTooltip && 
          <div className={styles.copiedTooltip}>{t('copied')}</div>
        }
    </div>
  )
}

export default AdviceInMyProfile