import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store'
// import RoutesPage from './components/routing/Routes'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import {LOGOUT} from './actions/types'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import RestorePassword from './components/auth/RestorePassword'
import Landing from './components/landing/Landing'
import Profile from './components/profile/Profile'
import EditProfile from './components/edit-profile/EditProfile'
import Search from './components/search/Search'

import './App.css'
import ImagePreviewer from './components/image-previewer/ImagePreviewer'

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      // TODO: тут всё ок? Может это должно быть вне условия
      store.dispatch(loadUser())
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({type: LOGOUT})
    })
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/restorepassword" element={<RestorePassword />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/@:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
