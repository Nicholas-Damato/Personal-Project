module.exports = {
    getMount: (req, res) => {
        const db = req.app.get('db')
        db.mounts.get_mounts()
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    getUserMount: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        if (!user) {
            return res.status(511).send('User not logged in')
        }
        db.mounts.get_user_mounts(user.user_id)
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    deleteUserMount: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { mount_id } = req.params
        db.mounts.delete_user_mount(user.user_id, mount_id)
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    addMount: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { mount_id } = req.params
        db.mounts.add_mount(user.user_id, mount_id)
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    mountDesc: (req, res) => {
        const db = req.app.get('db')
        db.mounts.get_mounts_desc()
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    mountSource: (req, res) => {
        const db = req.app.get('db')
        db.mounts.get_mounts_source_asc()
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    },
    mountSourceDesc: (req, res) => {
        const db = req.app.get('db')
        db.mounts.get_mounts_source_desc()
        .then(mount => {
            res.status(200).send(mount)
        })
        .catch(err => console.log(err))
    }
}