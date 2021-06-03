const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [ result ] = await db.auth.check_user(username)
        if(password === ''){
            return res.sendStatus(405)
        }
        if( result ) {
            return res.status(409).send('Username already taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.auth.register_user(username, hash)
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [ user ] = await db.auth.check_user(username)
        if(!user) {
            return res.status(401).send('Username not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(401).send('Password is incorrect')
        }
        delete user.password
        req.session.user = user;
        console.log(req.session.user)
        return res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    editName: async (req, res) => {
    const db = req.app.get('db')
    const { user } = req.session
    const { username } = req.body
    if(username === ''){
        return res.status(405).send('Please enter a Username')
    }
    const [ check ] = await db.auth.check_user(username)
    if(check){
        return res.status(409).send('Username is already taken')
    }
    db.auth.update_user(user.user_id, username)
    }
}