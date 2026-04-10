import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import { SignUp } from './pages/SignUp.jsx'
import { Login } from './pages/Login.jsx'
import { Jobs } from "./pages/Jobs.jsx"
import { Navbar } from './components/Navbar.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'
import './App.css'
import { useAuth } from "./hooks/useAuth.js"
import { JobDetails } from "./pages/JobDetails.jsx"
import { JobApplication } from "./pages/JobApplication.jsx"

const AppContent = ()=>{

  useAuth();

  return (
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/jobs' element={<Jobs />}></Route>

          {/* Candidate Routes */}
          <Route element={<ProtectedRoute allowedRoles={["candidate"]}></ProtectedRoute>}>
            <Route path='/candidate/dashboard' element={<PageNotFound/>}></Route>
            <Route path='/job/:jobId' element={<JobDetails/>}></Route>
            <Route path='/job/apply/:jobId' element={<JobApplication/>}></Route>
          </Route>

          {/* Recruiter Routes */}
          <Route element={<ProtectedRoute allowedRoles={["recruiter"]}></ProtectedRoute>}>
            <Route path='/recruiter/dashboard' element={<PageNotFound/>}></Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]}></ProtectedRoute>}>
            <Route path='/admin/dashboard' element={<PageNotFound />}></Route>
          </Route>

          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </BrowserRouter>
  )
}

function App() {

  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  )
}

export default App
