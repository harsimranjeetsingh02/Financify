const router = require('express').Router();
let User = require('../models/user.model');

//Handles incoming get http requests for /users/, this will return the users it found from the db
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Handles incoming post http requests for /users/add, this will put new users into the db
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;