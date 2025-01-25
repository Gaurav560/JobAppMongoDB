import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function JobList() {
 const [jobs, setJobs] = useState([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {
   fetchJobs()
 }, [])

 const fetchJobs = async () => {
   try {
     const response = await fetch('http://localhost:8080/jobPosts')
     const data = await response.json()
     setJobs(data)
   } catch (error) {
     console.error('Error:', error)
   } finally {
     setLoading(false)
   }
 }

 const handleDelete = async (postId) => {
   if (window.confirm('Are you sure you want to delete this job?')) {
     try {
       await fetch(`http://localhost:8080/jobPost/${postId}`, {
         method: 'DELETE'
       })
       fetchJobs()
     } catch (error) {
       console.error('Error:', error)
     }
   }
 }

 if (loading) return <div className="loading">Loading...</div>

 return (
   <div className="container">
     <div className="jobs-header">
       <h1>Job Listings</h1>
     </div>
     <div className="jobs-list">
       {jobs.map(job => (
         <div key={job.postId} className="job-card">
           <h2>{job.postProfile}</h2>
           <p className="job-description">{job.postDesc}</p>
           <div className="job-meta">
             <span>Experience Required: {job.reqExperience} years</span>
           </div>
           <div className="tech-stack">
             {job.postTechStack.map(tech => (
               <span key={tech} className="tech-tag">{tech}</span>
             ))}
           </div>
           <div className="job-actions">
             <Link to={`/edit/${job.postId}`} className="btn btn-secondary">Edit</Link>
             <button onClick={() => handleDelete(job.postId)} className="btn btn-danger">Delete</button>
           </div>
         </div>
       ))}
     </div>
   </div>
 )
}

export default JobList