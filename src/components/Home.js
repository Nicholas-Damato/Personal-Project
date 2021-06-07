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
            if(err.response.status === 405){
                alert('Please enter in a valid password')
            } else if ( err.response.status = 409){
                alert('Username is already taken')
            }
        })
    }

    const handleLogin = (username, password) => {
        axios.post(`/auth/login`, { username, password })
        .then(res => {
            dispatch(loginUser(res.data))
            props.history.push('/user')
        })
        .catch(err => {
            if(err.response.status === 401){
                alert('Username or Password is incorrect')
            } else {
                alert('Username is already taken')
            }
        })
    }


    // const { auth, setAuth, handleLogin, handleRegister } = useContext(AuthContext)
    return (
        <div onSubmit={() => handleLogin(username,password)} className='home'>
            <h1 className='title'> The Collector </h1>
            <div className='position'>
           <h2 className='login'> Username: </h2> <input className='input' value={username} onChange={(e) => setUsername(e.target.value)}/>
           <h2 className='login'> Password: </h2> <input className='input' value={password} type='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='button' >Login</button>
            <button className='button' onClick={() => handleRegister(username, password)}>Register</button>
        </div>
        //  onClick={() => handleLogin(username, password)}
    )
}

export default Home