import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import History from './History'
import TestView from './components/views/PageViews/TestPage/TestPage'
import MainView from './Landing/LandingPage'
import Maker from './Maker'
import MyPage from './MyPage'
import Taker from './Taker'
// import './css/App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="body">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/maker" element={<Maker />} />
          <Route path="/taker" element={<Taker />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/history" element={<History/>} />
          <Route path="/test" element={<TestView />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App

// workflow 테스트
