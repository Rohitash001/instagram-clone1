import React,{useEffect,createContext,useReducer} from 'react';
import Navbar from './components/navbar';
import "./App.css"
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'

const userContext = createContext();

const Routing = ()=>{
  const navigate = useNavigate();
  return(
    
<Routes>
    <Route path="/" element={<Home/>} />
     <Route path="/Home" element={<Home/>} />
     <Route path="/Login" element={<Login/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Profile" element={<Profile/>} />
     <Route path="/CreatePost" element={<CreatePost/>} />
    </Routes>
   
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </userContext.Provider>
    </>

  )
}

export default App;
