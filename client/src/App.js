import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store'
// import RoutesPage from './components/routing/Routes'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import RestorePassword from './components/auth/RestorePassword'
import Landing from './components/landing/Landing'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import {LOGOUT} from './actions/types'
import Profile from './components/profile/Profile'

import './App.css'

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

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
          <Route exact path="/@:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
