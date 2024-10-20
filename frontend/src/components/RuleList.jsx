import React, { useState } from 'react';
import axios from 'axios';  // Add this import

const RuleList = ({ setCombinedAST, rules }) => {
  const [selectedRules, setSelectedRules] = useState([]);

  // Base URL for the API (read from environment variable)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/rules';

  // Handle combining selected rules
  const handleCombine = async () => {
    if (selectedRules.length < 2) {
      alert('Please select at least two rules to combine.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/combine-rules`, {
        ruleIds: selectedRules
      });
      setCombinedAST(response.data.combinedAST);  // Pass combined AST to the parent
    } catch (err) {
      console.error('Error combining rules:', err);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (ruleId) => {
    if (selectedRules.includes(ruleId)) {
      setSelectedRules(selectedRules.filter(id => id !== ruleId));
    } else {
      setSelectedRules([...selectedRules, ruleId]);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 transition-all transform hover:shadow-2xl hover:-translate-y-1">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Rules to Combine</h2>
      <p className="text-gray-600 mb-4">Please select at least two rules to combine:</p>

      <ul className="space-y-4">
        {rules.map(rule => (
          <li key={rule._id}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={rule._id}
                onChange={() => handleCheckboxChange(rule._id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-semibold text-gray-800">{rule.ruleName}</span>
                <p className="text-sm text-gray-500">Condition: {rule.ast.left.condition} {rule.ast.type} {rule.ast.right.condition}</p>
              </div>
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCombine}
        className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition-all transform hover:scale-105"
      >
        Combine Selected Rules
      </button>
    </div>
  );
};

export default RuleList;
