import { Outlet } from 'react-router-dom'
import React from 'react'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
export default function ProfileLayout() {
  const { user } = React.useContext(currentUserContext)
  return (
    <div>
      {/* <p id='main-header'>User params</p> */}
      <Outlet />
    </div>
  )
}
