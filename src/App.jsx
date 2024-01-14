
import Nav from './component/Nav'
import TodoApp from './Page/todoApp'
import Home from './Page/Home'
import DemoApp from './Page/DemoApp'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sigin from './Page/sigin'
import Login from './Page/login'
import { useState } from 'react'

function App() {
 

  const [location,setLocation] = useState('')
  

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-600 min-h-screen">
    
   

      <BrowserRouter>
      <Nav location={location} setLocation={setLocation } />
        <Routes>
          <Route path='TodoApp' element={<TodoApp location={location} setLocation={setLocation } />} />
          <Route index element={<Home location={location} setLocation={setLocation }/>} />
          <Route path='register' element={<Sigin location={location} setLocation={setLocation }/>} />
          <Route path='login' element={<Login location={location} setLocation={setLocation} />} />
          <Route path='DemoApp' element={<DemoApp/>} />
      </Routes>
      </BrowserRouter>
  
      </div>
  )
}






export default App












