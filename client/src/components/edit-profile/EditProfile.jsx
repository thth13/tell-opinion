import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import * as yup from "yup"
import c from "classnames"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { editProfile, getCurrentProfile } from '../../actions/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from "./styles.module.css"
import AppBar from "../appbar/AppBar"
import ImagePreviewer from "../image-previewer/ImagePreviewer"

// TODO: валидация
const schema = yup.object({
  avatar: yup.mixed().test("fileSize", "The file size is too large", value => {
      if (typeof value === "string") return true
      if (!value.length) return true
      return value[0].size <= 2000000
    }).test("fileType", "File must be image type of JPEG or PNG", value => {
      if (typeof value === "string") return true
      return value && (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png"
    )})
  // email: yup.string().email().required(),
  // password: yup.string().required(),
}).required()

let EditProfile = ({user, profile, editProfile, getCurrentProfile}) => {
  useEffect(() => {
    if (profile === null) {
      getCurrentProfile()
    } 
  })

  const navigate = useNavigate()

  const {register, handleSubmit, reset, formState: { errors }} = useForm({
      resolver: yupResolver(schema),
        defaultValues: {
          name: profile && profile.name,
          description: profile && profile.description,
          avatar: profile && profile.avatar,
          instagram: profile && profile.social && profile.social.instagram,
          facebook: profile && profile.social && profile.social.facebook,
          youtube: profile && profile.social && profile.social.youtube,
          twitter: profile && profile.social && profile.social.twitter
        }
  })

  useEffect(() => {
    if (profile) {
      reset(profile)
    }
  }, [profile])

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

  let comeBack = () => {
    navigate(`/@${user.login}`)
  }

  return (
    <div>
      <AppBar/>
      <main className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backArrowButton} onClick={comeBack}>
            <span className={styles.backArrow}></span>
          </button>
          <h1 className={styles.mainTitle}>Редактирование профиля</h1>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.editWrapper}>
            <ImagePreviewer 
              avatar={profile && profile.avatar && `avatars/${profile.avatar}`}
              register={register}
              errors={errors}
            />
            <div className={styles.fieldsContainer}>
              <div className={styles.descriptionContainer}>
                <h2 className={c(styles.descriptionTitle, styles.descriptionTitleSmallHidden)}>Данные</h2>
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder="Name"
                  {...register("name")}
                />
                <textarea
                  className={c(styles.textArea, { [styles.error]: errors.password })}
                  placeholder="Description"
                  {...register("description")}
                />
              </div>
              <div className={styles.socialContainer}>
                <h2 className={styles.descriptionTitle}>Соц.сети</h2>
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder="Instagram"
                  {...register("instagram")}
                />
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder="Facebook"
                  {...register("facebook")}
                />
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder="YouTube"
                  {...register("youtube")}
                />
                <input
                  className={c(styles.fields, { [styles.error]: errors.password })}
                  placeholder="Twitter"
                  {...register("twitter")}
                />
              </div>
              <div className={styles.buttonsContainer}>
                <input className={styles.submitButton} type="submit" value="Сохранить изменения"/>
                <button className={styles.cancelButton} onClick={comeBack}>Выйти без изменений</button>
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
  profile: state.profile.profile
})

export default connect(mapStateToProps, {editProfile, getCurrentProfile})(EditProfile)