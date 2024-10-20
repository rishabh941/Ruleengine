// src/App.js
import React, { useState } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluateForm from './components/EvaluateForm';
import Navbar from './components/Navbar';

function App() {
  const [combinedAST, setCombinedAST] = useState(null);  // State to store the combined AST

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-200 to-purple-300 py-10 px-4">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto space-y-12 pt-24"> {/* Add padding-top to avoid overlap with Navbar */}
        {/* Section to Create a New Rule */}
        <div id="create-rule" className="max-w-lg mx-auto">
          <RuleForm />  {/* Rule creation form */}
        </div>

        {/* Section to Combine Rules */}
        <div id="combine-rules" className="max-w-lg mx-auto">
          <RuleList setCombinedAST={setCombinedAST} />  {/* Pass setCombinedAST to RuleList */}
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
