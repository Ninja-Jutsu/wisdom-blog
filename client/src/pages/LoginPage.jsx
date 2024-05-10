/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true

function LoginPage() {
  const [isNotLogged, setIsNotLogged] = React.useState(false)
  const isCookie = Cookies.get('loggedIn')
  React.useEffect(() => {
    if (isCookie) {
      console.log('/profile')
    } else {
      setIsNotLogged(true)
    }
  }, [isCookie])
  return <div>{isNotLogged && <LoginForm />}Login Page</div>
}

export default LoginPage
