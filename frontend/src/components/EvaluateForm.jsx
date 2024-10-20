// src/components/EvaluateForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EvaluateForm = ({ combinedAST }) => {
  const [userData, setUserData] = useState({
    age: '',
    salary: '',
    experience: '',
    department: ''
  });
  const [result, setResult] = useState(null);  // To store the evaluation result (True/False)

  // Handle form submission to evaluate the rule
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/rules/evaluate-rule', {
        ast: combinedAST,
        userData
      });
      setResult(response.data.result);  // Store the result (True/False)
    } catch (err) {
      console.error('Error evaluating rule:', err);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 transition-all transform hover:shadow-2xl hover:-translate-y-1">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Age"
          value={userData.age}
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={userData.salary}
          onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />
        <input
          type="number"
          placeholder="Experience (years)"
          value={userData.experience}
          onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={userData.department}
          onChange={(e) => setUserData({ ...userData, department: e.target.value })}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all transform hover:scale-105"
        >
          Evaluate Rule
        </button>
      </form>

      {/* Show evaluation result */}
      {result !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-700">Result: {result ? 'True' : 'False'}</h3>
        </div>
      )}
    </div>
  );
};

export default EvaluateForm;
