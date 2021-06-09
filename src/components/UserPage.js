import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/authReducer'
import { addToPage } from '../redux/itemReducer'
import { toast } from 'react-toastify'
import axios from 'axios'


const UserPage = (props) => {
    const [ userMini, setUserMini ] = useState([])
    const [ userMount, setUserMount ] = useState([])
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ miniInput, setMiniInput ] = useState('')
    const [ mountInput, setMountInput] = useState('')
    const [ show, setShow ] = useState (false)
    const [ showTwo, setShowTwo] = useState(true)
    const dispatch = useDispatch()
    

    const toggleShow = () => {
        setShow(!show)
    }

    const toggleShowTwo = () => {
        setShowTwo(!showTwo)
    }

    const handleChange = (value) => {
        setUsername(value)
    }

    const handleEmail = (value) => {
        setEmail(value)
    }

    const handleMini = (value) => {
        setMiniInput(value)
    }

    const handleMount = (value) => {
        setMountInput(value)
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
                // alert('Please enter in a Username')
                toast.error('Please enter in a username.')
            } else {
                // alert('that username is already taken')
                toast.error('That username is already taken!')
            }
        })
    }

    const sendEmail = () => {
        axios.post(`/send`, { email, username })
        .then(res => {
            
        })
        .catch(err => {
            if(err.response.status === 406){
                toast.error('Please put in a valid email!')
            }
            console.log(err)
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
        .catch(err => {
            if(err.response.status === 511){
                props.history.push('/')
            }
        })
    }, [userMini])

    useEffect(() => {
        axios.get(`/api/mountuser`)
        .then((res) => {
            setUserMount(res.data)
        })
        .catch(err => console.log(err))
    }, [userMount])

    return (
        <div className='user-page'>
            <nav className={`${showTwo ? 'sidebar' : 'sidebar-two'}`}>
                <div className='in-side'>
            <Link className='link-button' to='/mini'> MINIONS </Link> 
            <Link className='link-button' to='/mount'> MOUNT </Link>
            <Link className='link-button' to='/info'> ABOUT </Link>
            <button className='user-button' onClick={() => handleLogout()}> Logout </button>
            <div className='show-div'>
            <button className={` extra ${show ? 'show' : ''} user-button` } onClick={() => toggleShow()}> Change Username </button>
            <input  placeholder='Enter new username here' className={`${show ? '' : 'show'}`} onChange={(e) => handleChange(e.target.value)}/>
            <input  placeholder='Enter Email here' className={`${show ? '' : 'show'}`} onChange={(e) => handleEmail(e.target.value)}/>
            <button className={`${show ? '' : 'show'} try`} onClick={() => {
                toggleShow()
                handleNameChange(username)
                sendEmail(email)
                setUsername('')
            }}> Save </button>
            </div>
                </div>
                <div className='menu'>
                    <h4> <AiOutlineMenu className='menu-button' onClick={() => toggleShowTwo()} /> </h4>
                    <ul className={`${showTwo ? 'on' : ''}`}>
                        <li> <Link className='link-button' to='/mini'> MINIONS </Link> </li> 
                        <li> <Link className='link-button' to='/mount'> MOUNT </Link> </li> 
                        <li> <Link className='link-button' to='/info'> ABOUT </Link> </li>
                        <li><button className='user-button' onClick={() => handleLogout()}> Logout </button></li>
                    </ul>
                </div>
            </nav>
            <div className='menu-two'>

            </div>
            <header> <h1 className='user-title'> MINIONS </h1></header>
            <div className='search-two'>
                <h2 className='search-title'>Search: </h2><input className='input-search' placeholder='Search minions here' value={miniInput} onChange={(e) => handleMini(e.target.value)} />
                </div>
                <div className='counter'>
                <h2> Final Fantasy XIV </h2>
                <h2> {userMini.length} out of 407 </h2>
                </div>
            <table className='table'>
            <tr className='first-row'>
                                <th>Source </th>
                                <th>Name </th>
                                <th>Image</th>
            </tr>
                {userMini.filter(element => {
                    return element.minion_name.includes(miniInput)
                })
                .map((mini) => {
                    return (
                        <div className='item' onClick={() => {
                            deleteMini(mini.minion_id)
                            toast.warning(`you have successfully deleted ${mini.minion_name}`)
                            }}>
                            <tr className='data'>
                                <td>{mini.minion_description}</td>
                                <td>{mini.minion_name}</td>
                                <td><img src={mini.minion_picture} alt={mini.minion_name} /></td>
                            </tr>
                        </div>
                    )
                })}
                </table>
                <header> <h1 className='mount-title'> MOUNTS </h1></header>
                <div className='search-two'>
                <h2 className='search-title'>Search: </h2><input className='input-search' placeholder='Search mounts here' value={mountInput} onChange={(e) => handleMount(e.target.value)} />
                </div>
                <div className='counter'>
                    <h2> Final Fantasy XIV </h2>
                    <h2> {userMount.length} out of 183</h2>
                </div>
                <table className='table'>
            <tr className='first-row'>
                     <th>Source</th>
                     <th>Name</th>
                     <th>Image</th>
            </tr>
                {userMount.filter(element => {
                    return element.mount_name.includes(mountInput)
                })
                .map((mount) => {
                    return (
                        <div className='item' onClick={() => {
                            deleteMount(mount.mount_id)
                            toast.warning(`you have successfully deleted ${mount.mount_name}`)
                            }}>
                            <tr className='data'>
                                <td>{mount.mount_description}</td>
                                <td>{mount.mount_name}</td>
                                <td className='image'><img src={mount.mount_picture} alt={mount.mount_name} /></td>
                            </tr>
                        </div>
                    
                    )
                })}
                </table>
        </div>
    )
}

export default UserPage
