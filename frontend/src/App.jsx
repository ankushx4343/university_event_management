import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Adminpanel from './pages/AdminPannel/Adminpanel'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './components/common/Protected'
import { AdminRoute } from './components/common/AdminRoute'
import Header from './components/layout/Header'
import AdminDashboard from './pages/AdminPannel/components/AdminDashboard'
import Eventmanagement from './pages/AdminPannel/components/Eventmanagement'
import Usermanagement from './pages/AdminPannel/components/Usermanagement'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Contacts from './pages/AdminPannel/Contacts'
import About from './pages/About'

function App() {
  return (
    <>
    <Toaster/>
      <div className='min-h-screen pt-20'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/contacts' element={<Contacts/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/admin' element={
            <AdminRoute>
              <Adminpanel/>    
            </AdminRoute> 
          }>
              <Route index element={<AdminDashboard/>}></Route>
              <Route path='eventmanagement' element={<Eventmanagement/>}></Route>
              <Route path='usermanagement' element={<Usermanagement/>}></Route>
          </Route>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }></Route>
        </Routes>
      </div>
    </>
  )
}

export default App