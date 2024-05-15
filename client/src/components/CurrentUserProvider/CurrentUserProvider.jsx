import React from 'react'

export const currentUserContext = React.createContext()
function CurrentUserProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [value, setValue] = React.useState(1)
  // console.log('Provider rerender')
  return (
    <currentUserContext.Provider value={{ user, setUser, value, setValue }}>{children}</currentUserContext.Provider>
  )
}

export default CurrentUserProvider
