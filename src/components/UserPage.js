import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/authReducer'
import { addToPage } from '../redux/itemReducer'
import axios from 'axios'

const UserPage = (props) => {
    const [ userMini, setUserMini ] = useState([])
    const [ userMount, setUserMount ] = useState([])
    const [ username, setUsername ] = useState('')
    const [ show, setShow ] = useState (false)
    const dispatch = useDispatch()

    const toggleShow = () => {
        setShow(!show)
    }

    const handleChange = (value) => {
        setUsername(value)
    }

    const handleLogout = () => {
        axios.get(`/auth/logout`)
        .then(res => {
            dispatch(loginUser(res.data))
            console.log(res.data)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    const handleNameChange = (username) => {
        axios.put(`/auth/username`, { username })
        .then(res => {

        })
        .catch(err => {
            if(err.response.status === 405){
                alert('Please enter in a Username')
            } else {
                alert('that username is already taken')
            }
        })
    }

    const deleteMini = (mini_id) => {
        axios.delete(`/api/mini/${mini_id}`)
        .then(res => {
            dispatch(addToPage(res.data))
        })
        .catch(err => console.log(err))
    }

    const deleteMount = (mount_id) => {
        axios.delete(`/api/mount/${mount_id}`)
        .then(res => {
            dispatch(addToPage(res.data))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`/api/miniuser`)
        .then((res) => {
            setUserMini(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/api/mountuser`)
        .then((res) => {
            setUserMount(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='user-page'>
            <nav className='sidebar'>
                <div className='in-side'>
            <Link className='link-button' to='/mini'> MINIONS </Link> 
            <Link className='link-button' to='/mount'> MOUNT </Link>
            <Link className='link-button' to='/user'> USER PAGE </Link>
            <button className='user-button' onClick={() => handleLogout()}> Logout </button>
            <div className='show-div'>
            <button className={`user-button ${show ? 'show' : ''} extra` } onClick={() => toggleShow()}> Change Username </button>
            <input  placeholder='Enter new username here' className={`${show ? '' : 'show'}`} onChange={(e) => handleChange(e.target.value)}/>
            {/* <input  placeholder='Enter Email Here' className={`${show ? '' : 'show'}`} onChange={(e) => handleChange(e.target.value)}/> */}
            <button className={`${show ? '' : 'show'} try`} onClick={() => {
                toggleShow()
                handleNameChange(username)
                setUsername('')
            }}> Save </button>
            </div>
                </div>
            </nav>
            <header> <h1 className='user-title'> MINIONS </h1></header>
            <table className='table'>
            <tr className='first-row'>
                                <th>Source</th>
                                <th>Name</th>
                                <th>Image</th>
            </tr>
                {userMini.map((mini) => {
                    return (
                        <div className='item' onClick={() => deleteMini(mini.minion_id)}>
                            <tr className='data'>
                                <td>{mini.minion_description}</td>
                                <td>{mini.minion_name}</td>
                                <td><img src={mini.minion_picture} /></td>
                            </tr>
                        </div>
                    )
                })}
                </table>
                <header> <h1 className='mount-title'> MOUNTS </h1></header>
                <table className='table'>
            <tr className='first-row'>
                     <th>Source</th>
                     <th>Name</th>
                     <th>Image</th>
            </tr>
                {userMount.map((mount) => {
                    return (
                        <div className='item' onClick={() => deleteMount(mount.mount_id)}>
                            <tr className='data'>
                                <td>{mount.mount_description}</td>
                                <td>{mount.mount_name}</td>
                                <td className='image'><img src={mount.mount_picture} /></td>
                            </tr>
                        </div>
                    
                    )
                })}
                </table>
        </div>
    )
}

export default UserPage
