import { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchJobs = () => {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/jobPosts/keyword/${keyword}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="search-jobs">
      <div className="search-box">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control"
          placeholder="Search jobs..."
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="search-results">
        {results.map(job => (
          <div key={job.postId} className="job-card">
            <h2>{job.postProfile}</h2>
            <p>{job.postDesc}</p>
            <Link to={`/job/${job.postId}`} className="btn btn-secondary">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchJobs