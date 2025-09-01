import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Result from './assets/pages/result'
import Homepage from './assets/pages/homepage'

import  Uploadpage  from './assets/pages/uploadpage'

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/result" element={<Result />} />
        <Route path="/" element={<Homepage/>} />
        <Route path="/upload" element={<Uploadpage/>} />
        
      </Routes>
    </Router>
  )
}

export default App
