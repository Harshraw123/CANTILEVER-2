import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthProvider'
import AuthPage from './pages/AuthPage'
import Home from './components/home-components/Home'
import ProtectedRoute from './components/home-components/ProtectedRoute'

const App = () => {
  return (

    <BrowserRouter>

    <AuthProvider>

  
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>

  )
}

export default App
