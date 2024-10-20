import React, { useState, useEffect } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluateForm from './components/EvaluateForm';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const [combinedAST, setCombinedAST] = useState(null);  // State to store the combined AST
  const [rules, setRules] = useState([]);  // State to store the fetched rules

  // Base URL for the API (read from environment variable)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/rules';

  // Function to fetch the rules from the backend
  const fetchRules = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setRules(response.data);  // Update the state with the fetched rules
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  // Fetch the rules when the component mounts (with an empty dependency array)
  useEffect(() => {
    fetchRules();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-200 to-purple-300 py-10 px-4">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto space-y-12 pt-24">
        {/* Section to Create a New Rule */}
        <div id="create-rule" className="max-w-lg mx-auto">
          <RuleForm refreshRules={fetchRules} />  {/* Pass fetchRules to RuleForm */}
        </div>

        {/* Section to Combine Rules */}
        <div id="combine-rules" className="max-w-lg mx-auto">
          <RuleList setCombinedAST={setCombinedAST} rules={rules} />  {/* Pass rules to RuleList */}
        </div>

        {/* Section to Evaluate Combined Rule - only visible after rule combination */}
        {combinedAST && (
          <div id="evaluate-rule" className="max-w-lg mx-auto">
            <EvaluateForm combinedAST={combinedAST} />  {/* Pass the combined AST to the evaluation form */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
