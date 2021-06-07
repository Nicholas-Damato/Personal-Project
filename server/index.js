require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')


const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

// CONTROLLERS
const authCtrl = require('./controllers/authController')
const miniCtrl = require('./controllers/minionController')
const mountCtrl = require('./controllers/mountController')
const nodeCtrl = require('./controllers/nodeMailCtrl')

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false}
})
.then( db => {
    app.set('db', db)
    console.log('Database Connected')
    app.listen(SERVER_PORT, () => console.log(`Server is now running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))




// ENDPOINTS
app.post(`/auth/register`, authCtrl.register)
app.post(`/auth/login`, authCtrl.login)
app.get(`/auth/logout`, authCtrl.logout)
app.put(`/auth/username`, authCtrl.editName)

app.get(`/api/mini`, miniCtrl.getMini)
app.get(`/api/minidsc`, miniCtrl.descMinion)
app.post(`/api/addmini/:mini_id`, miniCtrl.addMinion)
app.get(`/api/miniuser`, miniCtrl.getUserMini)
app.delete(`/api/mini/:mini_id`, miniCtrl.deleteUserMinion)
app.get(`/api/minisource`, miniCtrl.ascSource)
app.get(`/api/minisourcedesc`, miniCtrl.descSource)

app.get(`/api/mount`, mountCtrl.getMount)
app.post(`/api/addmount/:mount_id`, mountCtrl.addMount)
app.get(`/api/mountuser`, mountCtrl.getUserMount)
app.delete(`/api/mount/:mount_id`, mountCtrl.deleteUserMount)
app.get(`/api/mountdesc`, mountCtrl.mountDesc)
app.get(`/api/mountsource`, mountCtrl.mountSource)
app.get(`/api/mountsourcedesc`, mountCtrl.mountSourceDesc)

app.post(`/send`, nodeCtrl.send)