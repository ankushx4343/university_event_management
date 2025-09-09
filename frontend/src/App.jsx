import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Adminpanel from './pages/AdminPannel/Adminpanel'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './components/common/Protected'
import { AdminRoute } from './components/common/AdminRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/admin' element={
        <AdminRoute>
          <Adminpanel/>    
        </AdminRoute> 
      }></Route>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }></Route>
    </Routes>
  )
}

export default App