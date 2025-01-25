import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function JobForm() {
 const { id } = useParams()
 const navigate = useNavigate()
 const [formData, setFormData] = useState({
   postId: '',
   postProfile: '',
   postDesc: '',
   reqExperience: '',
   postTechStack: []
 })

 useEffect(() => {
   if (id) {
     fetchJob()
   }
 }, [id])

 const fetchJob = async () => {
   try {
     const response = await fetch(`http://localhost:8080/jobPost/${id}`)
     const data = await response.json()
     setFormData(data)
   } catch (error) {
     console.error('Error:', error)
   }
 }

 const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     const response = await fetch(`http://localhost:8080/jobPost${id ? `/${id}` : ''}`, {
       method: id ? 'PUT' : 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         postId: parseInt(formData.postId),
         postProfile: formData.postProfile,
         postDesc: formData.postDesc,
         reqExperience: parseInt(formData.reqExperience),
         postTechStack: formData.postTechStack.filter(tech => tech.trim() !== '')
       })
     })
     if (!response.ok) throw new Error('Failed to save job')
     navigate('/')
   } catch (error) {
     console.error('Error:', error)
   }
 }

 const handleTechStackChange = (e) => {
   const technologies = e.target.value.split(',').map(tech => tech.trim())
   const currentInput = technologies[technologies.length - 1] || ''
   const confirmedTechs = technologies.slice(0, -1).filter(Boolean)
   
   setFormData(prev => ({
     ...prev,
     postTechStack: [...confirmedTechs, currentInput]
   }))
 }

 return (
   <div className="page-container">
     <div className="form-container">
       <form onSubmit={handleSubmit} className="job-form">
         <h2>{id ? 'Edit' : 'Create New'} Job Post</h2>
         
         <div className="form-group">
           <label>Post ID</label>
           <input
             type="number"
             value={formData.postId}
             onChange={e => setFormData(prev => ({ ...prev, postId: e.target.value }))}
             className="form-input"
             required
           />
         </div>

         <div className="form-group">
           <label>Job Title</label>
           <input
             type="text"
             value={formData.postProfile}
             onChange={e => setFormData(prev => ({ ...prev, postProfile: e.target.value }))}
             className="form-input"
             required
           />
         </div>

         <div className="form-group">
           <label>Job Description</label>
           <textarea
             value={formData.postDesc}
             onChange={e => setFormData(prev => ({ ...prev, postDesc: e.target.value }))}
             className="form-input"
             rows="6"
             required
           />
         </div>

         <div className="form-group">
           <label>Experience Required (years)</label>
           <input
             type="number"
             value={formData.reqExperience}
             onChange={e => setFormData(prev => ({ ...prev, reqExperience: e.target.value }))}
             className="form-input"
             required
           />
         </div>

         <div className="form-group">
           <label>Technologies</label>
           <div className="tech-input-container">
             <input
               type="text"
               value={formData.postTechStack.join(',')}
               onChange={handleTechStackChange}
               className="form-input"
               placeholder="Type and use comma to separate technologies"
               required
             />
             <div className="tech-tags">
               {formData.postTechStack.filter(Boolean).map((tech, index) => (
                 <span key={index} className="tech-tag">{tech}</span>
               ))}
             </div>
           </div>
         </div>

         <button type="submit" className="submit-btn">
           {id ? 'Update' : 'Create'} Job Post
         </button>
       </form>
     </div>
   </div>
 )
}

export default JobForm