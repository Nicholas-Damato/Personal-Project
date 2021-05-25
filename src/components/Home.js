import { useContext, useState, useEffect } from 'react'
// import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { loginUser } from '../redux/authReducer'
import { useDispatch } from 'react-redux'

const Home = (props) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (username, password) => {
        axios.post(`/auth/register`, { username, password })
        .then(res => {
            dispatch(loginUser(res.data))
            props.history.push('/user')
        })
        .catch(err => console.log(err))
    }

    const handleLogin = (username, password) => {
        axios.post(`/auth/login`, { username, password })
        .then(res => {
            dispatch(loginUser(res.data))
            props.history.push('/user')
        })
        .catch(err => console.log(err))
    }


    // const { auth, setAuth, handleLogin, handleRegister } = useContext(AuthContext)
    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => handleLogin(username, password)}>Login</button>
            <button onClick={() => handleRegister(username, password)}>Register</button>
        </div>
    )
}

export default Home