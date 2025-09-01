import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Result from './assets/pages/result'
import Homepage from './assets/pages/homepage'

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/result" element={<Result />} />
        <Route path="/" element={<Homepage/>} />
        
      </Routes>
    </Router>
  )
}

export default App
