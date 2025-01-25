import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const AllJob = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/jobPosts');
        if (!response.ok) {
          throw new Error('Failed to fetch job posts.');
        }
        const data = await response.json();
        setJobPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6 relative">
      {/* Create Job Button */}
      <button className="absolute top-6 right-6 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all" onClick={()=>navigate('/create')}>
        <Plus size={20} />
        Create Job
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Job Opportunities
      </h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobPosts.map((job) => (
            <div
              key={job.postId}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {job.postProfile}
              </h2>
              <p className="text-gray-700 mb-4">{job.postDesc}</p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-gray-800">
                  Experience Required:
                </span>{' '}
                {job.reqExperience} years
              </p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Tech Stack:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {job.postTechStack.map((tech, index) => (
                    <li key={index} className="text-gray-700">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default AllJob;
