import React from 'react'
// import useSWR, { mutate } from 'swr'
// import Spinner from '../components/Spinner/Spinner'
import Post from '../components/Post/Post'
import { NavLink } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
import './Pages.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ENDPOINT = 'https://wisdom-server-production.up.railway.app/api/posts'

export default function Homepage() {
  const { user } = React.useContext(currentUserContext)
  const navigate = useNavigate()
  const cookie = Cookies.get('loggedIn')
  console.log(user)
  console.log(cookie)
  if (user === null) {
    navigate('/login')
  }
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((response) => {
        setData(response.data.posts_list)
      })
      .catch((error) => {
        console.error('Error connecting to server:', error)
        console.log('comment was not pushed')
      })
  }, [user])

  return data.length > 0 ? (
    <div className='allPosts'>
      {data.map((post, index) => {
        return (
          <div
            className='individual_post'
            key={post._id}
          >
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

//! SWR FAILED ME:
// async function fetcher(endpoint) {
//   const response = await fetch(endpoint, {
//     method: 'GET',
//     credentials: 'include',
//   })

//   if (!response.ok) {
//     console.log('Error fetching data')
//   }
//   const json = await response.json()
//   console.log({ json })
//   console.log('fetched json')
//   return json.posts_list
// }

// export default function Homepage() {
//   const { user } = React.useContext(currentUserContext)
//   React.useEffect(() => {
//     const handleRouteChange = () => {
//       mutate(ENDPOINT) // Use SWR mutate function
//     }
//     handleRouteChange()
//   }, [user])

//   const { data, error, isLoading } = useSWR(ENDPOINT, fetcher)
//   if (isLoading) {
//     return (
//       <div className='spinnerContainer'>
//         <Spinner />
//       </div>
//     )
//   }
//   if (error) {
//     return <p className='error'>Something went wrong!</p>
//   }
//   if (data) {
//     return data.length > 0 ? (
//       <div className='allPosts'>
//         {data.map((post, index) => {
//           console.log('home' + post.likes.length)
//           return (
//             <div
//               className='individual_post'
//               key={post._id}
//             >
//               <Post post={post} />
//             </div>
//           )
//         })}
//       </div>
//     ) : (
//       user !== null && (
//         <>
//           <NavLink to={`/profile/${user?.user?._id}`}>Profile</NavLink>
//           <div>There are no posts yet!</div>
//         </>
//       )
//     )
//   }
// }
