import React, { Suspense, useEffect } from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
// import ReactGA from 'react-ga'
import setAuthToken from './utils/setAuthToken'
import { connect } from "react-redux"
import { loadUser, logoutsUser } from './actions/auth'
import { LOGOUT } from './actions/types'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import RestorePassword from './components/auth/RestorePassword'
import Landing from './components/landing/Landing'
import Profile from './components/profile/Profile'
import EditProfile from './components/edit-profile/EditProfile'
import ChangePassword from './components/auth/ChangePassword'
import NewPassword from './components/auth/NewPassword'
import FindUsers from './components/find-users/FindUsers'

import './App.css'
import Home from './components/home/Home'
import LoadingScreen from './components/landing/LoadingScreen'

// const TRACKING_ID = 'G-Y3MT7ZXTS8'

// ReactGA.initialize(TRACKING_ID)

const App = ({loadUser, logoutsUser, auth: {isAuthenticated, loading}}) => {
  // let location = useLocation()

  const HomePage = () => {
    if (loading) {
      return <LoadingScreen />
    } else if (!loading) {
      return isAuthenticated ? <Home /> : <Landing />
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: HomePage(),
    },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/changepassword', element: <ChangePassword /> },
    { path: '/restorepassword', element: <RestorePassword /> },
    { path: '/editprofile', element: <EditProfile /> },
    { path: '/:username', element: <Profile /> },
    { path: '/resetpassword/:token', element: <NewPassword /> },
    { path: '/find', element: <FindUsers /> },
  ])

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    loadUser()

    window.addEventListener('storage', () => {
      if (!localStorage.token) logoutsUser()
    })
  }, [])

  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search)
  // }, [])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [location])

  return (
    <Suspense fallback={'Loading...'}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  error: state.profile.error,
})


export default connect(mapStateToProps, {loadUser, logoutsUser})(App)
