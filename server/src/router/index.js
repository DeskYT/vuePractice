const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController');

const homePage = (req, res, next)=>{
    res.send('<h1>Index page</h1>')
}

const notFound = (req,res,next)=>{
    next(new Error("Page not found"))
}

router.get(
    '/',
    homePage
);
router.get(
    '/users',
    userController.getUsers
);
router.post(
    '/users',
    userController.postUser
)
router.get(
    '*',
    notFound
)


module.exports = router;