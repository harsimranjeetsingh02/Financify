const router = require('express').Router();
let Expense = require('../models/expense.model');

//Handles incoming get http requests for /Expenses/, this will return the Expenses it found from the db
router.route('/').get((req, res) => {
    Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Handles incoming post http requests for /Expenses/add, this will put new Expenses into the db
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    const description = req.body.description;
    const amount = Number(req.body.amount);
    const date = Date.parse(req.body.date);

    const newExpense = new Expense({
        username, 
        location,
        description,
        amount,
        date,
    });

    newExpense.save()
    .then(() => res.json('Expense added!'))
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) => {
    Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
    Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json('Expense deleted.'))
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/update/:id').post((req, res) => {
    Expense.findById(req.params.id)
    .then(expense => {
        expense.username = req.body.username;
        expense.location = req.body.location;
        expense.description = req.body.description;
        expense.amount = Number(req.body.amount);
        expense.date = Date.parse(req.body.date);

        expense.save()
        .then(() => res.json('Expense updated!'))
        .catch(err => res.status(400).json('Error' + err));

    })
    .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;