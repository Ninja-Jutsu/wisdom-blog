/* eslint-disable no-unused-vars */
import React from 'react'
import SignupForm from '../components/SignupForm'
import Cookies from 'js-cookie'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'

function SignupPage() {
  const { user } = React.useContext(currentUserContext)
  return <div>{user == null ? <SignupForm /> : 'You are already logged in'}</div>
}

export default SignupPage
