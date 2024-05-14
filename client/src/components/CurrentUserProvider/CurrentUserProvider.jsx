import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
let isLogged = Cookies.get('loggedIn')

export const currentUserContext = React.createContext()
function CurrentUserProvider({ children }) {
  const [user, setUser] = React.useState(null)
  // React.useEffect(() => {
  //   if (isLogged) {
  //     axios.defaults.withCredentials = true
  //     axios
  //       .get('http://localhost:5000/api/auth/current')
  //       .then((res) => {
  //         console.log(res)
  //         setUser(res.data)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [])
  console.log('Provider rerender')
  return (
    <currentUserContext.Provider value={{ user, setUser }}>
      {children}
    </currentUserContext.Provider>
  )
}

export default CurrentUserProvider
