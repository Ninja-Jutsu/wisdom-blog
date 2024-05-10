/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'

function ProfilePage() {
  const { user } = React.useContext(currentUserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const newUser = useLoaderData()
  return user !== null ? (
    <div>
      <h1>{newUser?.user.username}</h1>
      {user.user._id === newUser.user._id && (
        <Link to={'/Profile/NewPostPage'}>Create Post</Link>
      )}
    </div>
  ) : (
    navigate('/NotFoundPage')
  )
}

export async function profileLoader({ params }) {
  const { id } = params
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: 'GET',
    credentials: 'include', // 'include' is equivalent to true
  })
  const json = await response.json()
  return json
}
export default ProfilePage
