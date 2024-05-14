/* eslint-disable no-unused-vars */
import React from 'react'
import Cookies from 'js-cookie'
import './Layouts.css'
import { Outlet, NavLink } from 'react-router-dom'
import axios from 'axios'
import CurrentUserProvider, { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
let isLogged = Cookies.get('loggedIn')

export default function RootLayout() {
  const { user } = React.useContext(currentUserContext)
  const [isLogged, setIsLogged] = React.useState('')

  React.useEffect(() => {
    if (user !== null) {
      setIsLogged('isLogged')
    }
  }, [])
  return (
    <div className='root-layout'>
      <header>
        <nav className={`headerNav ${isLogged}`}>
          <div className='homeBtn buttons-font'>
            <NavLink to='/'>Home</NavLink>
            {user !== null && <NavLink to={`/profile/${user.user._id}`}>{user.user.username}</NavLink>}
          </div>

          {user === null && (
            <div className='loginSignup'>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/signup'>Sign-up</NavLink>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

// async function profileLoader(){
//   axios.get()
// }
