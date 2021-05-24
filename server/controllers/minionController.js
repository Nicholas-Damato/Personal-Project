module.exports = {
    getMini: (req, res) => {
        const db = req.app.get('db')
        db.minions.get_minions()
        .then(mini => {
            res.status(200).send(mini)
        })
        .catch(err => console.log(err))
    }
}