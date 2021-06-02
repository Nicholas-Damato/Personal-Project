module.exports = {
    getMini: (req, res) => {
        const db = req.app.get('db')
        db.minions.get_minions()
        .then(mini => {
            res.status(200).send(mini)
        })
        .catch(err => console.log(err))
    },
    getUserMini: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        if (!user) {
            return res.status(511).send('User not loggend in')
        }
        db.minions.get_user_minions(user.user_id)
        .then(mini => {
            res.status(200).send(mini)
        })
        .catch(err => console.log(err))
    },
    deleteUserMinion: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { mini_id } = req.params
        db.minions.delete_user_mini(user.user_id, mini_id)
        .then(mini => {
            res.status(200).send(mini)
        })
        .catch(err => console.log(err))
    },
    addMinion: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { mini_id } = req.params
        db.minions.add_minion(user.user_id, mini_id)
        .then(mini => {
            res.status(200).send(mini)
        })
        .catch(err => console.log(err))
    }
}