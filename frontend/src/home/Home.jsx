import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {

    const {authUser} = useAuth();
  return (
    <div>
      Hii {authUser.username}
    </div>
  )
}

export default Home
