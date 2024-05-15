/* eslint-disable no-unused-vars */
// import Main from '../Game'
// import Header from '../Header'
import React from 'react'
import './App.css'
import CurrentUserProvider from '../CurrentUserProvider/CurrentUserProvider'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Link, NavLink } from 'react-router-dom'

// Layout

import RootLayout from '../../layouts/RootLayout'
import ProfileLayout from '../../layouts/ProfileLayout'

//Pages
import Homepage from '../../pages/Homepage'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import ProfilePage, { profileLoader } from '../../pages/ProfilePage'
import NotFoundPage from '../../pages/NotFoundPage'
import NewPostPage from '../../pages/NewPostPage'
import SinglePostPage, { postLoader } from '../../pages/SinglePostPage'
import Logout from '../Logout/Logout'

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
        path='logout'
        element={<Logout />}
      ></Route>
      <Route
        path='profile'
        element={<ProfileLayout />}
      >
        <Route
          path=':id'
          element={<ProfilePage />}
          loader={profileLoader}
        />
        <Route
          path='NewPostPage'
          element={<NewPostPage />}
        />
      </Route>
      <Route
        path='posts/:id'
        element={<SinglePostPage />}
        loader={postLoader}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Route>
  )
)

function App() {
  return (
    <CurrentUserProvider>
      <div className='app'>
        <RouterProvider router={router} />
      </div>
    </CurrentUserProvider>
  )
}

export default App
