import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    postProfile: "",
    postDesc: "",
    reqExperience: "",
    postTechStack: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    const dynamicData = {
      ...formData,
      reqExperience: parseInt(formData.reqExperience),
      postTechStack: formData.postTechStack.split(", ")
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/jobPost", 
        dynamicData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setResponseMessage("Job post created successfully!");
      console.log(response.data);
    } catch (error) {
      setResponseMessage("Failed to create job post. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Create Job</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
       

        <div>
          <label className="block text-lg font-medium text-gray-700">Profile</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={formData.postProfile}
            onChange={(e) => setFormData({ ...formData, postProfile: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            rows="4"
            value={formData.postDesc}
            onChange={(e) => setFormData({ ...formData, postDesc: e.target.value })}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Required Experience (Years)</label>
          <input
            type="number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={formData.reqExperience}
            onChange={(e) => setFormData({ ...formData, reqExperience: e.target.value })}
            required
            min={1}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Tech Stack</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={formData.postTechStack}
            onChange={(e) => setFormData({ ...formData, postTechStack: e.target.value })}
            required
          />
          <small className="text-gray-500">Separate technologies with a comma and space</small>
        </div>

        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Job"}
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-6 text-center ${responseMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default CreateJob;
