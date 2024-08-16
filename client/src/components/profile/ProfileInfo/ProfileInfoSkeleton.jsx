import React from 'react'
import c from 'classnames'
import styles from './styles.module.css'
import Skeleton from 'react-loading-skeleton'

const ProfileInfoSkeleton = () => (
  <section className={c(styles.info, styles.section)}>
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper}>
        <Skeleton className={styles.avatarWrapper}/>
      </div>
    </div>
    <div className={styles.nameSkeleton}><Skeleton /></div>
    <div className={styles.nickNameSkeleton}><Skeleton /></div>
    <div className={styles.descriptionSkeleton}><Skeleton /></div>
    <div className={styles.contactsSkeleton}>
      <Skeleton className={styles.contactsSkeletonItem} />
    </div>
  </section>
)

export default ProfileInfoSkeleton
