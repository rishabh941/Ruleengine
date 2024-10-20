// src/components/RuleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = ({ refreshRules }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission to create a new rule
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/rules/create-rule', {
        ruleName,
        ruleString
      });
      setMessage('Rule successfully created!');
      setRuleName('');  // Clear the input fields after submission
      setRuleString('');

      // Call refreshRules to update the rule list
      refreshRules();
    } catch (err) {
      console.error('Error creating rule:', err);
      setMessage('Error creating rule. Please check the rule format.');
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 transition-all transform hover:shadow-2xl hover:-translate-y-1">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          placeholder="Enter rule (e.g., age > 30 AND salary > 50000)"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="block w-full mb-4 border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-all transform hover:scale-105"
        >
          Add Rule
        </button>
      </form>
      {message && <p className="mt-4 text-center text-teal-600">{message}</p>}
    </div>
  );
};

export default RuleForm;
