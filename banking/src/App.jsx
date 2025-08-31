import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Result from './assets/pages/result'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
