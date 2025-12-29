import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout'
import Login from './View/Login/Login'
import Dashboard from './View/Dashboard/Dashboard'
import Coaches from './View/Coaches/Coaches'
import SingleCoache from './View/Coaches/SingleCoache/SingleCoache'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/dashboard'} element={<MainLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='coaches' element={<Coaches />} />
            <Route path='single-coache/:id' element={<SingleCoache />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
