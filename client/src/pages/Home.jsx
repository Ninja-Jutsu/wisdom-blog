import React from 'react'
import axios from 'axios'

export default  function Home() {
    const [allPosts, setAllPosts] = React.useState([])
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/posts').then(response => {
            console.log(response.data.loginPage)
        })
    }, [])
  return (
    <div>
        HOME COMPONENT 
    </div>
  )
}

