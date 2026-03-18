
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/bottom-navbar/BottomNav'
import Home from './pages/Home'



function App() {


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='*' element={<h1>Page not found</h1>} />

      </Routes>

      <BottomNav />
    </>
  )
}

export default App
