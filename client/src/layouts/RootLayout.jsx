import React from 'react'
import Cookies from 'js-cookie'
import './Layouts.css'
import { Outlet, NavLink } from 'react-router-dom'
import axios from 'axios'

let isLogged = Cookies.get('loggedIn')

export default function RootLayout() {
  const [user, setUser] = React.useState(null)
  let className = isLogged ? 'isLogged' : ''
  console.log('RootLayout' + user)

  React.useEffect(() => {
    if (isLogged) {
      axios.defaults.withCredentials = true
      axios
        .get('http://localhost:5000/api/auth/current')
        .then((res) => {
          console.log(res.data.user)
          setUser(res.data.user)
        })
        .catch((err) => console.log(err))
    }
  }, [])
  return (
    <div className='root-layout'>
      <header>
        <nav className={`headerNav ${className}`}>
          <div className='homeBtn poetsen-one-regular'>
            <NavLink to='/'>Home</NavLink>
            {user !== null && (
              <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
            )}
          </div>

          {!isLogged && (
            <div className='loginSignup poetsen-one-regular'>
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
