import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { Login } from '@/pages/Login'
import { Home } from '@/pages/Home'
import { Dashboard } from '@/pages/Dashboard'
import { AuthGuard } from '@/components/AuthGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App