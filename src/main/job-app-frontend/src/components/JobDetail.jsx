import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)

  useEffect(() => {
    fetchJob()
  }, [])

  const fetchJob = async () => {
    try {
      const response = await fetch(`http://localhost:8080/jobPost/${id}`)
      const data = await response.json()
      setJob(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (!job) return <div>Loading...</div>

  return (
    <div className="job-card">
      <h2>{job.postProfile}</h2>
      <p>{job.postDesc}</p>
      <div className="job-meta">
        <span>Experience Required: {job.reqExperience} years</span>
      </div>
      <div className="tech-stack">
        {job.postTechStack.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      <Link to="/" className="btn btn-primary">Back to Jobs</Link>
    </div>
  )
}

export default JobDetail