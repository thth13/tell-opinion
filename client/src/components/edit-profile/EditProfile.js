import * as yup from "yup"
import c from 'classnames'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { editProfile, getCurrentProfile } from '../../actions/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './styles.module.css'
import AppBar from '../appbar/AppBar'
import ImagePreviewer from "../image-previewer/ImagePreviewer"

// TODO: валидация
const schema = yup.object({
  avatar: yup.mixed().test("fileSize", "The file size is too large", value => {
      if (!value.length) return true
      return value[0].size <= 2000000
    }).test("fileType", "File must be image type of JPEG or PNG", value => {
      return value && (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png"
      )
    })
  // email: yup.string().email().required(),
  // password: yup.string().required(),
}).required()

const EditProfile = ({user, profile, editProfile, getCurrentProfile}) => {
  useEffect(() => {
    if (profile === null) {
      getCurrentProfile()
    } 
  })
  
  console.log(profile)
  console.log(user)

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

  return (
    <div className={styles.body}>
      <AppBar />
      <h2>Edit profile</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <span>Login: {user && user.login}</span>
        <span>Email: {user && user.email}</span>
        <ImagePreviewer
          avatar={profile && profile.avatar && `avatars/${profile.avatar}`}
          register={register}
          errors={errors}
        />
        <input
          className={c(styles.fields, { [styles.error]: errors.password })}
          placeholder="Name"
          {...register("name")}
        />
        <input
          className={c(styles.fields, { [styles.error]: errors.password })}
          placeholder="Description"
          {...register("description")}
        />
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
        <button className={styles.saveButton}>Save profile</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile
})

export default connect(mapStateToProps, {editProfile, getCurrentProfile})(EditProfile)