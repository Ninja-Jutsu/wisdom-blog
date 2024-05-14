/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import Cookies from 'js-cookie'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
axios.defaults.withCredentials = true

function LoginPage() {
  const { user } = React.useContext(currentUserContext)
  return <div>{user == null && <LoginForm />}</div>
}

export default LoginPage
