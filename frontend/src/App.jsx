import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import { SignUp } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { Home } from './pages/Home.jsx'
import { Jobs } from './pages/Jobs.jsx'
import { Navbar } from './components/Navbar.jsx'
import './App.css'

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/jobs' element={<Jobs />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
