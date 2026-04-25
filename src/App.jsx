import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/bottom-navbar/BottomNav'
import Routing from './routes/Routing'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from "react";
import { socket } from "./socket";
import toast from "react-hot-toast";
import { AuthContext } from './context/AuthContext';



function App() {

  const {authUser} = useContext(AuthContext);


  useEffect(()=>{

    if(authUser){


      socket.emit("joinUser",authUser._id)
    }

  },[authUser])

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Notification received:", data);
      toast.success(data.message);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);



  return (
    <>

      <Toaster position='top-center' />

      <Navbar />
      <Routing />
      <BottomNav />

    </>
  )
}

export default App
