import React from 'react'
import styles from './styles.module.css'
import Skeleton from 'react-loading-skeleton'

const OpinionItemSkeleton = () => (
  <div className={styles.opinionItem}>
    <div className={styles.headOpinion}>
      <span className={styles.opinionDateSkeleton}><Skeleton /></span>
    </div>
    <p className={styles.opinionBody}><Skeleton count={3} /></p>
  </div>
)

export default OpinionItemSkeleton
