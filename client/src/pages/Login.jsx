/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true;

function Login() {
  const [isLogged, setIsLogged] = React.useState({})
  const isCookie = Cookies.get('jwt2')
  React.useEffect(() => {
    if (isCookie) {
      console.log('/profile')
    } else {
      axios.get('http://localhost:5000/api/auth/login').then((response) => {
        setIsLogged(response.data)
      })
    }
  }, [isCookie])
  return <div>{isLogged.link && <LoginForm />}</div>
}

export default Login
