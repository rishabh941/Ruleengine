# Rule Engine with Abstract Syntax Tree (AST)

## Project Description

This is a simple 3-tier rule engine application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to dynamically create, combine, and evaluate conditional rules based on attributes such as age, salary, experience, and department. The system utilizes an Abstract Syntax Tree (AST) to represent the rules and allows for combining multiple rules to form complex conditions. 

## Features

- **Dynamic Rule Creation**: Users can create rules using string-based conditions (e.g., `age > 30 AND salary > 50000`).
- **Rule Combination**: Combine multiple rules using logical operators (AND).
- **Rule Evaluation**: Evaluate the combined rules against user-provided data (age, salary, experience, department).
- **Error Handling**: The system includes validation for rule structure, attribute names, and missing user data.
- **REST API**: Exposes APIs for creating, combining, and evaluating rules.
- **MongoDB Integration**: Efficient storage and retrieval of rules using MongoDB.

## Tech Stack

- **Frontend**: React (with Tailwind CSS for styling)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API Testing**: Postman or any REST client can be used for testing the API endpoints.

## Installation

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/en/download/) installed.
- **MongoDB**: You need to set up a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based MongoDB instance or install MongoDB locally.

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/rule-engine.git
   cd rule-engine
