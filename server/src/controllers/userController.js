import User from '../models/User'
module.exports.getUsers = (req, res, next) => {
    try{

        User.find((err, users)=>{
            err ? next(err): res.send(users)
        })
    }
    catch (e){
        next(e);
    }
}
module.exports.postUser = (req, res, next) => {
    try{
    User.create(req.body, (err, user)=>{
        err ? next(err) : res.send(user)
    })
    }
    catch (e){
        next(e);
    }
}