import React from 'react';
import Navbar from './components/navbar';
import "./App.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost'
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    
    
     
   
    
   
    <Routes>
    <Route path="/" element={<Home/>} />
     <Route path="/Home" element={<Home/>} />
     <Route path="/Login" element={<Login/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Profile" element={<Profile/>} />
     <Route path="/CreatePost" element={<CreatePost/>} />
    </Routes>
    </BrowserRouter>
    </>

  )
}

export default App;
