const mongoose = require('mongoose');
//Create mongoose excercise model schema
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    username: {type: String, required: true},
    location: {type: String, required: true},
    description:{type: String, required: true},
    amount:{type: Number, required: true},
    date:{type: Date, required: true},
},{
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;