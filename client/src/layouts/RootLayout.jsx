import React from 'react'
import Cookies from 'js-cookie'
import { Outlet, NavLink } from 'react-router-dom'
export default function RootLayout() {
  const isLogged = Cookies.get('loggedIn')
  return (
    <div className='root-layout'>
      <header>
        <nav className='headerNav'>
          <NavLink to='/'>Home</NavLink>
          {/* {!isLogged && } */}
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Sign-up</NavLink>
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
