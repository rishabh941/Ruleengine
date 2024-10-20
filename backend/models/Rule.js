const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true },
  ast: { type: Object, required: true }, // Abstract Syntax Tree (AST) representation of the rule
});

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;
