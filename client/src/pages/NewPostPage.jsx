import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
axios.defaults.withCredentials = true //allow exchange with backend

export default function NewPostPage() {
  const { user } = React.useContext(currentUserContext)
  if (user !== null) {
  }
  const userId = user.user._id.toString()
  const navigate = useNavigate()
  const initialValues = {
    title: '',
    desc: '',
    user: userId,
  }
  function onSubmit(data) {
    console.log(data)
    axios
      .post('http://localhost:5000/api/posts/create', data)
      .then((response) => {
        console.log('Post added with:' + data)
        navigate('/')
      })
      .catch((error) => {
        console.error('Error connecting to server:', error)
        console.log('/errorFetchPage')
        // Handle errors appropriately (e.g., redirect to login if unauthorized)
      })
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(5, ' Title must be at least 5 charts long'),
    desc: Yup.string().required('Description is required'),
    user: Yup.string(),
  })
  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label htmlFor='title'>Title: </label>
          <ErrorMessage
            name='title'
            component='span'
          />
          <Field
            // autoComplete='off'
            id='title'
            name='title'
            placeholder='title...'
          />
          <label htmlFor='desc'>Description: </label>
          <ErrorMessage
            name='desc'
            component='span'
          />
          <Field
            // autoComplete='off'
            id='desc'
            name='desc'
            placeholder='Description...'
          />
          <Field
            id='user'
            name='user'
            style={{ display: 'none' }}
          />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}