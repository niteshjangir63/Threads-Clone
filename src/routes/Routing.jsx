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

import ProtectedRoute from './ProtectedRoute'
import SinglePost from '../components/SinglePost'
import PublicRoute from './PublicRoute'
import UpdateProfile from '../pages/UpdateProfile'
import Forgot from '../components/Forgot/Forgot'
import UpdatePassword from '../pages/UpdatePassword'
import OtpProtectedRoute from './OtpProtectedRoute'
export default function Routing() {
    let location = useLocation();

    return (

        <>

            <Routes>

                <Route path='/' element={<MiddleContainer pathName={location.pathname} />}>
                    <Route index element={<Home />} />


                    <Route path='search' element={<Search />} />
                    <Route path='/notification' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
                    <Route path='/profile/' element={<ProtectedRoute>< Profile /></ProtectedRoute>} />
                    <Route path='/profile/:username' element={< Profile />} />
                    <Route path='/pin' element={<Pin />} />
                    <Route path='/more' element={<More />} />
                    <Route path='/post' element={<Show />} />
                    <Route path='/post/:id' element={<SinglePost />} />
                    <Route path='*' element={<h1>Page not found</h1>} />
                    <Route path='/update/profile' element={<UpdateProfile />} />

                </Route>

                <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot' element={<Forgot />} />
                <Route path='/update-password' element={<OtpProtectedRoute><UpdatePassword /></OtpProtectedRoute>} />

            </Routes>


        </>
    )
}