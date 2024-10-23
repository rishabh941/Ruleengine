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

## Screenshots

### Create a New Rule
![Create Rule](./screenshots/Screenshot%202024-10-20%20114808.png)

### Combine Rules
![Combine Rules](./screenshots/Screenshot%202024-10-20%20115002.png)

### Evaluate Rule
![Evaluate Rule](./screenshots/Screenshot%202024-10-20%20115010.png)



## Installation

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/en/download/) installed.
- **MongoDB**: You need to set up a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based MongoDB instance or install MongoDB locally.

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/rule-engine.git
   cd rule-engine
2. ### Set Up the Backend

1. **Navigate to the backend folder**:
   ```bash
   cd backend

   npm install

   npm start

2. **Navigate to the fronten folder**:
   ```bash
   cd frontend

   npm install

   npm start

## Test Cases

### 1. Create a New Rule via the UI

**Steps**:
- Open the web app in a browser.
- Navigate to the "Create Rule" section.
- Enter the following values:
  - **Rule Name**: Age and Salary Rule
  - **Rule String**: age > 30 AND salary > 50000
- Click the "Add Rule" button.

**Expected Behavior**:
- The message "Rule successfully created!" should appear.
- The new rule should immediately be visible in the "Select Rules to Combine" section without needing a page refresh.

---

### 2. Try to Create a Rule with Invalid Format via the UI

**Steps**:
- Navigate to the "Create Rule" section.
- Enter the following values:
  - **Rule Name**: Invalid Rule
  - **Rule String**: age > 30 OR
- Click the "Add Rule" button.

**Expected Behavior**:
- The message "Error creating rule. Please check the rule format." should appear.
- The rule should not be added to the "Select Rules to Combine" section.

---

### 3. Combine Two Rules via the UI

**Steps**:
- Create two valid rules:
  - **Rule 1**: age > 30 AND salary > 50000
  - **Rule 2**: experience > 5 OR department = 'Marketing'
- Navigate to the "Combine Rules" section.
- Select the two rules by clicking the checkboxes next to them.
- Click the "Combine Selected Rules" button.

**Expected Behavior**:
- The rules should be combined into a new AST.
- The "Evaluate Rule" section should appear with the combined AST ready for evaluation.

---

### 4. Evaluate Combined Rule with Valid Data via the UI

**Steps**:
- After combining two rules, in the "Evaluate Rule" section, enter the following values:
  - **Age**: 35
  - **Salary**: 60000
  - **Experience**: 7
  - **Department**: Sales
- Click the "Evaluate Rule" button.

**Expected Behavior**:
- The result should display as "True".

---

### 5. Test Responsiveness of the UI

**Steps**:
- Open the web app in a browser.
- Resize the browser to different screen sizes (e.g., mobile, tablet, desktop).

**Expected Behavior**:
- The UI should be responsive, adjusting to different screen sizes, with no overlapping elements or broken layouts.


   
