import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { auth, setAuth, handleLogin, handleRegister } = useContext(AuthContext)
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