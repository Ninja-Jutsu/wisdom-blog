/* eslint-disable no-unused-vars */
import React from 'react'
import './Layouts.css'
import { Outlet, NavLink } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
import { useNavigate } from 'react-router-dom'

export default function RootLayout() {
  const { user } = React.useContext(currentUserContext)
  const [isLogged, setIsLogged] = React.useState('')
  React.useEffect(() => {
    if (user !== null) {
      setIsLogged('isLogged')
    }
  }, [user])
  return (
    <div className='root-layout'>
      <header>
        <nav className={`headerNav ${isLogged}`}>
          <div className='homeBtn buttons-font'>
            {user !== null && (
              <>
                <NavLink to='/'>Home</NavLink>
                <NavLink to={`/profile/${user.user._id}`}>{user.user.username}</NavLink>
                <NavLink to={`/logout`}>Logout</NavLink>
              </>
            )}
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
