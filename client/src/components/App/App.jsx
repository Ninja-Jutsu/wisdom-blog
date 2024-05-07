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

//Pages
import Homepage from '../../pages/Homepage'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import ProfilePage from '../../pages/ProfilePage'
import CurrentUserProvider from '../CurrentUserProvider/CurrentUserProvider'

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
        path='profile/:id'
        element={<ProfilePage />}
      />
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
