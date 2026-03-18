
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/bottom-navbar/BottomNav'
import Home from './pages/Home'
import Show from './pages/Show'



function App() {


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Show />} />
        <Route path='*' element={<h1>Page not found</h1>} />

      </Routes>

      <BottomNav />
    </>
  )
}

export default App
