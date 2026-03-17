import { useState } from 'react'
import PostContainer from './components/PostContainer/PostContainer'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/bottom-navbar/BottomNav'

function App() {
  

  return (
    <>
    <Navbar/>
      <PostContainer/>
      <BottomNav/>
    </>
  )
}

export default App
