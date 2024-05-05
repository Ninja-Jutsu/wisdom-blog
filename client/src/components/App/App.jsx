/* eslint-disable no-unused-vars */
// import Main from '../Game'
// import Header from '../Header'
import React from 'react'
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
import Home from '../../pages/Home'
import Login from '../../pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootLayout />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      {/* <Route
        path='/api/posts/:id'
        element={<Post />}
      /> */}
      {/* <Route /> */}
    </Route>
  )
)

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
