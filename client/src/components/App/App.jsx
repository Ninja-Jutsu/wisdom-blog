/* eslint-disable no-unused-vars */
// import Main from '../Game'
// import Header from '../Header'
import React from 'react'
import axios from 'axios'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link,
  NavLink,
} from 'react-router-dom'

// Layout

import RootLayout from '../../layouts/RootLayout'
import ProfileLayout from '../../layouts/ProfileLayout'

//Pages
import Homepage from '../../pages/Homepage'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import ProfilePage, { profileLoader } from '../../pages/ProfilePage'
import CurrentUserProvider from '../CurrentUserProvider/CurrentUserProvider'
const ENDPOINT = 'http://localhost:5000/api/auth/current'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootLayout />}
    >
      <Route
        index
        element={<Homepage />}
      />
      <Route
        path='login'
        element={<LoginPage />}
      />
      <Route
        path='signup'
        element={<SignupPage />}
      />
      <Route
        path='profile'
        element={<ProfileLayout />}
      >
        <Route
          path=':id'
          element={<ProfilePage />}
          loader={profileLoader}
        />
      </Route>
    </Route>
  )
)

function App() {
  return (
    <div className='app'>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </div>
  )
}

export default App
