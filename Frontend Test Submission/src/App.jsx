import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShortenForm from './components/ShortenForm'
import StatsView from './components/StatsView'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShortenForm />} />
        <Route path="/stats" element={<StatsView />} />
      </Routes>
    </Router>
  )
}

export default App
