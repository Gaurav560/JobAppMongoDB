// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import JobList from './components/JobList'
import JobForm from './components/JobForm'
import JobDetail from './components/JobDetail'
import SearchJobs from './components/SearchJobs'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="nav-brand">Telusko Job Board</Link>
            <div className="nav-links">
              <Link to="/">Jobs</Link>
              <Link to="/add">Post Job</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/add" element={<JobForm />} />
            <Route path="/edit/:id" element={<JobForm />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/search" element={<SearchJobs />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App