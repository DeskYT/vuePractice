module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.message){
        err.code = 406;
    }
    if ( !err.message || !err.code) {
        res.status(500).send('Server Error');
    } else {
        res.status(err.code).send(err.message);
    }
};