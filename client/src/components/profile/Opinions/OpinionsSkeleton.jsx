import React from "react"
import c from "classnames"
import {useTranslation} from 'react-i18next'
import styles from "./styles.module.css"
import OpinionItemSkeleton from "../OpinionItem/OpinionItemSkeleton"

const OpinionsSkeleton = () => {
  const {t} = useTranslation()
  
  return (
    <section className={c(styles.opinions, styles.section)}>
      <h2 className={styles.opinionsTitle}>{t('opinionsTitle')}</h2>
      <div className={styles.opinionItemsContainer}>
        <OpinionItemSkeleton />
        <OpinionItemSkeleton />
      </div>
    </section>
  )
}

export default OpinionsSkeleton
