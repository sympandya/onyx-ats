import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import { SignUp } from './pages/SignUp.jsx'
import { Login } from './pages/Login.jsx'
import { Home } from './pages/Home.jsx'
import { Jobs } from "./pages/jobs.jsx"
import { Navbar } from './components/Navbar.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'
import './App.css'

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="*" element={<PageNotFound></PageNotFound>} />

          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/jobs' element={<Jobs />}></Route>

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path='/home' element={<Home />}></Route>
          </Route> 

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
