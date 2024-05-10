import React from 'react'
// import Cookies from 'js-cookie'
// import axios from 'axios'
// axios.defaults.withCredentials = true
export const currentUserContext = React.createContext()
function CurrentUserProvider({ children }) {
  const [user, setUser] = React.useState(null)
  console.log(user)
  return (
    <currentUserContext.Provider value={{ user, setUser }}>
      {children}
    </currentUserContext.Provider>
  )
}

export default CurrentUserProvider
