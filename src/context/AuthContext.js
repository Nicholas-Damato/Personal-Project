import { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [ auth, setAuth ] = useState(null)

    const handleLogin = (username, password) => {
        axios.post(`/auth/login`, {username, password})
        .then((res) => {
            setAuth(res.data)
        })
        .catch(err => console.log(err))
    }

    const handleRegister = (username, password) => {
        axios.post(`/auth/register`, {username, password})
        .then((res) => {
            setAuth(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <AuthContext.Provider value = {{
            auth,
            setAuth,
            handleLogin,
            handleRegister
        }}>
            {props.children}
        </AuthContext.Provider>
        
    )
}