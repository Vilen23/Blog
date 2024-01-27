import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
    </div>
  )
}

export default App