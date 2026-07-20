import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import type { ComponentType } from 'react'

import RootLayout from './pages/RootLayout.tsx'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Services from './pages/Services.tsx'
import About from './pages/About.tsx'
import Login from './pages/Login.tsx'
import UserLayout from './pages/users/UserLayout.tsx'
import UserHome from './pages/users/UserHome.tsx'
import UserProfile from './pages/users/UserProfile.tsx'
import OAuthSuccess from './pages/OAuthSuccess.tsx'
import OAuthFailure from './pages/OAuthFailure.tsx'

const SignupComponent = Signup as ComponentType<any>

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<RootLayout/>}>
          <Route index element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<UserLayout/>}>
            <Route index element={<UserHome/>} />
            <Route path="profile" element={<UserProfile/>} />
          </Route>
          <Route path="auth/success" element={<OAuthSuccess />} />
          <Route path="auth/failure" element={<OAuthFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
)
