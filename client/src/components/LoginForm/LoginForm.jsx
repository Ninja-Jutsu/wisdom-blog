/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginForm.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { currentUserContext } from '../CurrentUserProvider/CurrentUserProvider'

axios.defaults.withCredentials = true //allow exchange with backend

const MAX_AGE = 3 * 24 * 60 * 60

function LoginForm() {
  const cookie = Cookies.get('loggedIn')
  const { user, setUser } = React.useContext(currentUserContext)
  React.useEffect(() => {
    if (cookie === 'true') {
      console.log(cookie)
      console.log('cookie')

      axios.get('https://wisdom-server-production.up.railway.app/api/auth/current').then((res) => {
        setUser(res.data)
      })
    }
  }, [])

  const [err, setErr] = React.useState('')
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  }
  function onSubmit(data) {
    axios
      .post('https://wisdom-server-production.up.railway.app/api/auth/login', data)
      .then((response) => {
        const userData = response.data
        setUser(userData)
        Cookies.set('loggedIn', true)
        navigate('/')
      })
      .catch((error) => {
        console.log(error.response.data.err)
        setErr(error.response.data.err)
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email').required('Email is required'),
    password: Yup.string().min(5, ' Password must be at least 5 charts long').required('Password is required'),
  })
  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <fieldset>
            <legend>Login: </legend>
            <div className='fieldContainer'>
              <label htmlFor='email'>Email: </label>
              <ErrorMessage
                name='email'
                component='span'
              />
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email...'
              />
            </div>
            <div className='fieldContainer'>
              <label htmlFor='password'>Password: </label>
              <ErrorMessage
                name='password'
                component='span'
              />
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='password...'
              />
              <span>{err}</span>
            </div>
            <button
              className='submit_btn'
              type='submit'
            >
              Login
            </button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
