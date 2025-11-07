const handleProfileGet = (req, res, db) => {
    // putting   :id   allows us to enter in our browser anything and we'll be able to grab this id trough the request.params property
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then (user => {
        if (user.length){
            res.json(user[0]);
        } else { 
            res.status(400).json('Not found');
        }
    })
    .catch (err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
};