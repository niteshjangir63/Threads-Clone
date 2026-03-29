import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Notification from '../pages/Notification'
import Profile from '../pages/Profile'
import Pin from '../pages/Pin'
import More from '../pages/More'
import Show from '../pages/Show'
import MiddleContainer from '../components/PostContainer/MiddleContainer'
import Login from '../pages/Login'
import Register from '../pages/Register'
export default function Routing() {
    let location = useLocation();

    return (

        <>

            <Routes>

                <Route path='/' element={<MiddleContainer pathName={location.pathname} />}>
                    <Route index element={<Home />} />

    
        <Route path='search' element={<Search />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/profile' element={< Profile/>} />
        <Route path='/pin' element={<Pin />} />
        <Route path='/more' element={<More />} />
        <Route path='/post' element={<Show />} />
        <Route path='/login' element={<Show />} />
        <Route path='*' element={<h1>Page not found</h1>} />

                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>


        </>
    )
}