import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
// import ReactGA from 'react-ga';
import store from './store'
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
import ChangePassword from './components/auth/ChangePassword'
import NewPassword from './components/auth/NewPassword'
import FindUsers from './components/find-users/FindUsers'

import './App.css'

// const TRACKING_ID = "G-Y3MT7ZXTS8";

// ReactGA.initialize(TRACKING_ID);

const App = () => {
  let location = useLocation();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    store.dispatch(loadUser())

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({type: LOGOUT})
    })
  }, [])



  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/restorepassword" element={<RestorePassword />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/:username" element={<Profile />} />
        <Route exact path="/resetpassword/:token" element={<NewPassword />} />
        <Route exact path="/find" element={<FindUsers />} />
      </Routes>
    </Provider>
  )
}

export default App
