
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/bottom-navbar/BottomNav'
import Create from './components/create-post/Create'
import Routing from './routes/Routing'




function App() {

  const [display,setDisplay] = useState(false);

    function handleCreate(){

      
        setDisplay(prev => !prev);

    }
  


  return (
    <>
      <Navbar handleClick={handleCreate}/>
      <Routing/>
      <BottomNav />
      {
        display && <Create handleClick={handleCreate}/>
      }
    </>
  )
}

export default App
