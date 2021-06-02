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
        .catch(err => {
            console.log(err)
            alert('this username is taken')
        })
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
        <div className='home'>
            <h1 className='title'> The Collector </h1>
            <input className='input' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className='input' value={password} type='password' onChange={(e) => setPassword(e.target.value)}/>
            <button className='button' onClick={() => handleLogin(username, password)}>Login</button>
            <button className='button' onClick={() => handleRegister(username, password)}>Register</button>
        </div>
    )
}

export default Home