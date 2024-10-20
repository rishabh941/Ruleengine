// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-white text-2xl font-bold">Rule Engine</div>
        <div className="space-x-6">
          <a href="#create-rule" className="text-gray-300 font-bold hover:text-white transition-colors">Create Rule</a>
          <a href="#combine-rules" className="text-gray-300 font-bold hover:text-white transition-colors">Combine Rules</a>
          <a href="#evaluate-rule" className="text-gray-300 font-bold hover:text-white transition-colors">Evaluate Rule</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
