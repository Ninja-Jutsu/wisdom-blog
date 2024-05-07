import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
export default function RootLayout() {
  return (
    <div className='root-layout'>
      <header>
        <nav className='headerNav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Sign-up</NavLink>
          <NavLink to={`/profile/`}>Profile</NavLink>
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
