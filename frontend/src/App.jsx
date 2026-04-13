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
import { MyPostedJobs } from "./pages/MyPostedJobs.jsx"
import { PostJob } from "./pages/PostJob.jsx"
import { Applicants } from "./pages/Applicants.jsx"
import { MyApplications } from "./pages/MyApplications.jsx"
import { SavedJobs } from "./pages/SavedJobs.jsx"
import { CandidateProfileUpdate } from "./pages/CandidateProfileUpdate.jsx"
import { RecruiterProfileUpdate } from "./pages/RecrutierProfileUpdate.jsx"
import { Blogs } from "./pages/Blogs.jsx"
import { SalaryEstimator } from "./pages/SalaryEstimator.jsx"
import { CandidateDashboard } from "./pages/CandidateDashboard.jsx"
import { RecruiterDashboard } from "./pages/RecruiterDashboard.jsx"
import { LandingPage } from "./pages/LandingPage.jsx"


const AppContent = ()=>{

  useAuth();

  return (
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/jobs' element={<Jobs />}></Route>

          {/* Candidate & Recruiter (Shared)*/}
          <Route element={<ProtectedRoute allowedRoles={["candidate", "recruiter"]}></ProtectedRoute>}>
            <Route path='/job/:jobId' element={<JobDetails/>}></Route>
          </Route>

          {/* Candidate Routes */}
          <Route element={<ProtectedRoute allowedRoles={["candidate"]}></ProtectedRoute>}>
            <Route path='/candidate/dashboard' element={<CandidateDashboard/>}></Route>
            <Route path='candidate/job/apply/:jobId' element={<JobApplication/>}></Route>
            <Route path='candidate/applications' element={<MyApplications/>}></Route>
            <Route path='candidate/savedjobs' element={<SavedJobs/>}></Route>
            <Route path='candidate/profile' element={<CandidateProfileUpdate/>}></Route>
            <Route path='resources/blogs' element={<Blogs/>}></Route>
            <Route path='resources/salary-estimator' element={<SalaryEstimator/>}></Route>
          </Route>

          {/* Recruiter Routes */}
          <Route element={<ProtectedRoute allowedRoles={["recruiter"]}></ProtectedRoute>}>
            <Route path='/recruiter/dashboard' element={<RecruiterDashboard/>}></Route>
            <Route path='/recruiter/myjobs' element={<MyPostedJobs/>}></Route>
            <Route path='/recruiter/postJob' element={<PostJob/>}></Route>
            <Route path='/recruiter/job/:jobId/applicants' element={<Applicants/>}></Route>
            <Route path='/recruiter/profile' element={<RecruiterProfileUpdate/>}></Route>
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
