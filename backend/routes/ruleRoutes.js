// routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');

// Define valid attributes (catalog)
const validAttributes = ['age', 'salary', 'experience', 'department'];

// Helper function to parse rule string into AST
const parseRuleToAST = (ruleString) => {
  const validOperators = ['AND', 'OR'];
  const conditions = ruleString.split(/\s(AND|OR)\s/);

  // Check if the rule string is valid
  if (conditions.length !== 3 || !validOperators.includes(conditions[1])) {
    throw new Error('Invalid rule format. Please use a valid format such as "age > 30 AND salary > 50000".');
  }

  const ast = {
    type: conditions[1],
    left: { type: 'operand', condition: conditions[0].trim() },
    right: { type: 'operand', condition: conditions[2].trim() }
  };

  return ast;
};

// Function to validate attributes in the AST
const validateAttributes = (ast) => {
  const checkNode = (node) => {
    if (node.type === 'operand') {
      const [attribute] = node.condition.split(' ');
      if (!validAttributes.includes(attribute)) {
        throw new Error(`Invalid attribute "${attribute}". Valid attributes are: ${validAttributes.join(', ')}`);
      }
    } else {
      checkNode(node.left);
      checkNode(node.right);
    }
  };
  checkNode(ast);
};

// API 1: Create a new rule and return its AST
router.post('/create-rule', async (req, res) => {
  const { ruleName, ruleString } = req.body;

  try {
    const ast = parseRuleToAST(ruleString);  // Parse rule string
    validateAttributes(ast);  // Validate attributes
    const newRule = new Rule({ ruleName, ast });
    await newRule.save();
    res.json({ message: 'Rule created', rule: newRule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 2: Combine multiple rules into a single AST
router.post('/combine-rules', async (req, res) => {
  const { ruleIds } = req.body;

  try {
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    if (rules.length < 2) {
      return res.status(400).json({ message: 'At least two rules are required to combine' });
    }

    const combinedAST = {
      type: 'AND',
      left: rules[0].ast,
      right: rules[1].ast,
    };

    res.json({ combinedAST });
  } catch (err) {
    res.status(500).json({ error: 'Error combining rules' });
  }
});

// API 3: Evaluate a rule against user data
router.post('/evaluate-rule', (req, res) => {
  const { ast, userData } = req.body;

  const evaluateAST = (node, data) => {
    if (node.type === 'operand') {
      const [attribute, operator, value] = node.condition.split(' ');
      if (typeof data[attribute] === 'undefined') {
        throw new Error(`Attribute "${attribute}" not found in user data.`);
      }
      return eval(`${data[attribute]} ${operator} ${value}`);
    }

    if (node.type === 'AND') {
      return evaluateAST(node.left, data) && evaluateAST(node.right, data);
    }

    if (node.type === 'OR') {
      return evaluateAST(node.left, data) || evaluateAST(node.right, data);
    }
  };

  try {
    const result = evaluateAST(ast, userData);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API 4: Update an existing rule
router.put('/update-rule/:id', async (req, res) => {
  const { ruleString } = req.body;

  try {
    const ast = parseRuleToAST(ruleString);  // Parse rule string
    validateAttributes(ast);  // Validate attributes

    const updatedRule = await Rule.findByIdAndUpdate(req.params.id, { ast }, { new: true });
    res.json({ message: 'Rule updated', rule: updatedRule });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API 5: Get all rules (the missing GET route)
router.get('/', async (req, res) => {
  try {
    const rules = await Rule.find();  // Fetch all rules from the database
    res.json(rules);  // Send the rules as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching rules' });
  }
});

module.exports = router;
