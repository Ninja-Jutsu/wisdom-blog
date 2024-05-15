/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useLoaderData, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'

function ProfilePage() {
  const { user } = React.useContext(currentUserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const newUser = useLoaderData()
  return user !== null ? (
    <div className='user_container'>
      <div className='user_details'>
        <h2>{newUser?.user.username}</h2>
        <p>{newUser.user_posts.length} Posts</p>
        {user.user._id === newUser.user._id && (
          <Link
            className='newPost_btn'
            to={'/Profile/NewPostPage'}
          >
            Create Post
          </Link>
        )}
      </div>
      <div className='profile_posts'>
        {newUser.user_posts.map((post) => {
          return (
            <Link
              className='user_post'
              to={`/posts/${post._id}`}
              key={post._id}
            >
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  ) : (
    navigate('/NotFoundPage')
  )
}

export async function profileLoader({ params }) {
  const { id } = params
  const response = await fetch(`https://wisdom-server-production.up.railway.app/api/users/${id}`, {
    method: 'GET',
    credentials: 'include', // 'include' is equivalent to true
  })
  const json = await response.json()
  return json
}
export default ProfilePage
