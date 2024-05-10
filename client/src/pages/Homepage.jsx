import React from 'react'
import useSWR from 'swr'
import Spinner from '../components/Spinner/Spinner'
import Post from '../components/Post/Post'
import { NavLink } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
import './Pages.css'

const ENDPOINT = 'http://localhost:5000/api/posts'

async function fetcher(endpoint) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    console.log('Error fetching data')
  }
  const json = await response.json()
  return json.posts_list
}

export default function Homepage() {
  const { user } = React.useContext(currentUserContext)
  const { data, error, isLoading } = useSWR(ENDPOINT, fetcher)
  if (isLoading) {
    return (
      <div className='spinnerContainer'>
        <Spinner />
      </div>
    )
  }
  if (error) {
    return <p>Something went wrong!</p>
  }
  if (data) {
    return data.length > 0 ? (
      <div className='allPosts'>
        {user !== null && (
          <NavLink to={`/profile/${user?.user?._id}`}>Profile</NavLink>
        )}
        {data.map((post, index) => {
          return (
            <div key={index}>
              <Post post={post} />
            </div>
          )
        })}
      </div>
    ) : (
      user !== null && (
        <>
          <NavLink to={`/profile/${user?.user?._id}`}>Profile</NavLink>
          <div>There are no posts yet!</div>
        </>
      )
    )
  }
}
