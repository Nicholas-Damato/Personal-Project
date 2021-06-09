import { useState } from 'react'
// import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { loginUser } from '../redux/authReducer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Home = (props) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (username, password) => {
        axios.post(`/auth/register`, { username, password })
        .then(res => {
            dispatch(loginUser(res.data))
            props.history.push('/info')
        })
        .catch(err => {
            if(err.response.status === 405){
                toast.error('Please enter in a valid password')
            } else if ( err.response.status === 409){
                toast.error('Username is already taken')
            } else if ( err.response.status === 410) {
                toast.error('Please enter a valid username')
            }
        })
    }

    const handleLogin = (username, password) => {
        axios.post(`/auth/login`, { username, password })
        .then(res => {
            dispatch(loginUser(res.data))
            props.history.push('/info')
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error('Username or Password is Incorrect')
            } else {
                toast.error('Username is already taken')
            }
        })
    }


    // const { auth, setAuth, handleLogin, handleRegister } = useContext(AuthContext)
    // onSubmit={handleLogin(username,password)}
    // type='submit' <-------- goes on button
    return (
        <div className='home'>
            <h1 className='title'> The Collector </h1>
            <div className='position'>
           <h2 className='login'> Username: </h2> <input className='input' value={username} onChange={(e) => setUsername(e.target.value)}/>
           <h2 className='login'> Password: </h2> <input className='input' value={password} type='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='button' onClick={() => handleLogin(username, password)}>Login</button>
            <button className='button' onClick={() => handleRegister(username, password)}>Register</button>
        </div>
        //  onClick={() => handleLogin(username, password)}
    )
}

export default Home