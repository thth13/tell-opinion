import * as yup from "yup"
import c from 'classnames'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { editProfile } from '../../actions/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './styles.module.css'
import AppBar from '../appbar/AppBar'
import ImagePreviewer from "../image-previewer/ImagePreviewer"

const schema = yup.object({
  // email: yup.string().email().required(),
  // password: yup.string().required(),
}).required();

const EditProfile = ({auth: {user}, profile: {profile}, editProfile}) => {
  const navigate = useNavigate()

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: profile && profile.name,
      description: profile && profile.description,
      instagram: profile && profile.social && profile.social.instagram,
      facebook: profile && profile.social && profile.social.facebook,
      youtube: profile && profile.social && profile.social.youtube,
      twitter: profile && profile.social && profile.social.twitter
    }
  });

  const onSubmit = data => {
    editProfile(data)
    
    navigate('/')
  };

  return (
    <div className={styles.body}>
      <AppBar />
      <h2>Edit profile</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <span>Login: {user && user.login}</span>
        <span>Email: {user && user.email}</span>
        <span>Avatar: {user && user.avatar}</span>
        <span>Change password link</span>

        {/* <input
          type="file"
          {...register("avatar")}
        /> */}
        <ImagePreviewer />
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
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {editProfile})(EditProfile)