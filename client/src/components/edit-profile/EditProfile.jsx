import React, {useEffect} from "react"
import {connect} from "react-redux"
import * as yup from "yup"
import c from "classnames"
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {editProfile, getMyProfile} from '../../actions/profile'
import {yupResolver} from '@hookform/resolvers/yup'
import styles from "./styles.module.css"
import AppBar from "../appbar/AppBar"
import ImagePreviewer from "../image-previewer/ImagePreviewer"
import {Helmet} from "react-helmet";

// TODO: валидация
const schema = yup.object({
  avatar: yup.mixed()
    .test("fileType", "File must be image type of JPEG or PNG", value => {
      if (value[0] === undefined) return true
      if (typeof value === "string") return true
      return value && (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png"
    )})
  // email: yup.string().email().required(),
  // password: yup.string().required(),
}).required()

const EditProfile = ({user, profile, editProfile, getMyProfile}) => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const {register, handleSubmit, reset, formState: { errors }} = useForm({
      resolver: yupResolver(schema),
        defaultValues: {
          name: profile && profile?.name,
          description: profile && profile?.description,
          avatar: profile && profile?.avatar,
          instagram: profile && profile?.social ? profile.social?.instagram : '',
          facebook: profile && profile?.social ? profile.social?.facebook : '',
          youtube: profile && profile?.social ? profile.social?.youtube : '',
          twitter: profile && profile?.social ? profile.social?.twitter : ''
        }
  })

  const onSubmit = async (data) => {
    const formData = new FormData()

    data.avatar && formData.append('avatar', data.avatar[0])
    data.name && formData.append('name', data.name)
    data.description && formData.append('description', data.description)
    data.instagram && formData.append('instagram', data.instagram)
    data.facebook && formData.append('facebook', data.facebook)
    data.youtube && formData.append('youtube', data.youtube)
    data.twitter && formData.append('twitter', data.twitter)

    await editProfile(formData)
    navigate('/')
  }

  const comeBack = () => {
    navigate(`/${user.login}`)
  }

  useEffect(() => {
    if (profile) {
      reset(profile)
    }
  }, [profile])
  
  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <div>
       <Helmet>
        {user && <title>Edit profile | Tell Opinion</title>}
      </Helmet>
      <AppBar/>
      <main className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backArrowButton} onClick={comeBack}>
            <span className={styles.backArrow}></span>
          </button>
          <h1 className={styles.mainTitle}>{t('profileEditing')}</h1>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.editWrapper}>
            <ImagePreviewer 
              avatar={profile && profile.avatar && `https://spaces.tell-opinion.com/${profile.avatar}`}
              register={register}
              errors={errors}
            />
            <div className={styles.fieldsContainer}>
              <div className={styles.descriptionContainer}>
                <h2 className={c(styles.descriptionTitle, styles.descriptionTitleSmallHidden)}>
                  {t('data')}
                </h2>
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder={t('namePlaceholder')}
                  {...register("name")}
                />
                <textarea
                  className={c(styles.textArea, { [styles.error]: errors.password })}
                  placeholder={t('descriptionPlaceholder')}
                  {...register("description")}
                />
              </div>
              <div className={styles.socialContainer}>
                <h2 className={styles.descriptionTitle}>{t('socialNetworks')}</h2>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputHint}>@</div>
                  <input
                    className={c(styles.fields, styles.userNameField, { [styles.error]: errors.password })}
                    placeholder="Instagram"
                    {...register("instagram")}
                  />
                </div>
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder={`Facebook ${t('link')}`}
                  {...register("facebook")}
                />
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder={`YouTube ${t('link')}`}
                  {...register("youtube")}
                />
                <div className={styles.inputWrapper}>
                  <div className={styles.inputHint}>@</div>
                  <input
                    className={c(styles.fields, styles.userNameField, { [styles.error]: errors.password })}
                    placeholder="Twitter"
                    {...register("twitter")}
                  />
                </div>
              </div>
              <div className={styles.buttonsContainer}>
                <input className={styles.submitButton} type="submit" value={t('saveChanges')}/>
                <button className={styles.cancelButton} onClick={comeBack}>{t('exitWithoutChange')}</button>
                <Link to="/changepassword"><button className={styles.changePasswordButton}>{t('changePassword')}</button></Link>
              </div>
            </div>
          </div>
        </form>
        <div className={styles.backgroundBox}></div>
      </main>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.myProfile
})

export default connect(mapStateToProps, {editProfile, getMyProfile})(EditProfile)