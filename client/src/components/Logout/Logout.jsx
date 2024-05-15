import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUserContext } from '../CurrentUserProvider/CurrentUserProvider'
import Cookies from 'js-cookie'

function Logout() {
  const { user, setUser } = React.useContext(currentUserContext)
  const navigate = useNavigate()
  axios.get('https://wisdom-server-production.up.railway.app/api/auth/logout').then((res) => {
    console.log(res)
    setUser(null)
    Cookies.set('loggedIn', false)
    navigate('/')
  })
  return <div></div>
}

export default Logout
