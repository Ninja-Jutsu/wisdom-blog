/* eslint-disable no-unused-vars */
import React from 'react'
import SignupForm from '../components/SignupForm'
import Cookies from 'js-cookie'

function SignupPage() {
  const isLogged = Cookies.get('loggedIn')
  return <div>{!isLogged ? <SignupForm /> : 'You are already logged in'}</div>
}

export default SignupPage
