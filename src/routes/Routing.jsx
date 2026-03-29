import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Notification from '../pages/Notification'
import Profile from '../pages/Profile.'
import Pin from '../pages/Pin'
import More from '../pages/More'
import Show from '../pages/Show'
export default function Routing(){

    return (

        <>
        
        <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/profile/:username' element={< Profile/>} />
        <Route path='/pin' element={<Pin />} />
        <Route path='/more' element={<More />} />
        <Route path='/post' element={<Show />} />
        <Route path='*' element={<h1>Page not found</h1>} />

      </Routes>


        </>
    )
}