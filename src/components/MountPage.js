import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { addToPage } from '../redux/itemReducer'
import { toast } from 'react-toastify'

const MountPage = (props) => {
    const [ mount, setMount ] = useState([])
    const [ showTwo, setShowTwo ] = useState(true)
    const [ userInput, setUserInput ] = useState('')
    const [ userMount, setUserMount ] = useState([])
    const dispatch = useDispatch()
    const [ order, setOrder ] = useState(false)
    const [ orderSource, setOrderSource ] = useState(false)

    
    const orderChange = () => {
        if(orderSource === true){
            setOrderSource(false)
        } 
        if(order === true){
            axios.get('/api/mount')
            .then((res) => {
                setMount(res.data)
            })
            .catch(err => console.log(err))
            setOrder(false)
        } else {
            axios.get('/api/mountdesc')
            .then((res) => {
                setMount(res.data)
            })
            .catch(err => console.log(err))
            setOrder(true)
        }
    }
    
    const orderChangeSource = () => {
        if(order === true){
            setOrder(false)
        } 
        if(orderSource === true){
            axios.get('/api/mountsource')
            .then((res) => {
                setMount(res.data)
            })
            .catch(err => console.log(err))
            setOrderSource(false)
        } else {
            axios.get('/api/mountsourcedesc')
            .then((res) => {
                setMount(res.data)
            })
            .catch(err => console.log(err))
            setOrderSource(true)
        }
    }

    const handleInput = (value) => {
        setUserInput(value)
    }
    
    const toggleShowTwo = () => {
        setShowTwo(!showTwo)
    }

    useEffect(() => {
        axios.get('/api/mount')
        .then((res) => {
            setMount(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('/api/mountuser')
        .then((res) => {
            setUserMount(res.data)
        })
        .catch(err => console.log(err))
    })

    const addToPage = (mount_id, mount_name) => {
        for(let i = 0; i < userMount.length; i++){
            if(userMount[i].mount_id === mount_id){
                return toast.error(`You already have the ${userMount[i].mount_name}`)
            } 
        }
       axios.post(`/api/addmount/${mount_id}`)
        .then((res) => {
            dispatch(addToPage(res.data))
            setUserMount([...userMount, mount_id])
        })
        .catch(err => console.log(err))
    }


    console.log(mount)
    return(
        <div className='page'>
            <header className={`${showTwo ? 'sidebar' : 'sidebar-two'}`}>
                <div className='in-side'>
            <Link className='link-button' to='/mini'> MINIONS </Link> 
            <Link className='link-button' to='/mount'> MOUNT </Link>
            <Link className='link-button' to='/user'> USER PAGE </Link>
            <Link className='link-button' to='/info'> ABOUT </Link>
                </div>
            <div className='menu'>
                    <h4> <AiOutlineMenu className='menu-button' onClick={() => toggleShowTwo()} /> </h4>
                    <ul className={`${showTwo ? 'on' : ''}`}>
                        <li> <Link className='link-button' to='/mini'> MINIONS </Link> </li> 
                        <li> <Link className='link-button' to='/mount'> MOUNT </Link> </li> 
                        <li><Link className='link-button' to='/user'> USER PAGE </Link> </li> 
                        <li><Link className='link-button' to='/info'> ABOUT </Link></li>
                    </ul>
                </div>
            </header>
            <div>
            <div className='search'>
                <h2 className='search-title'>Search: </h2><input placeholder='Type here' value={userInput} onChange={(e) => handleInput(e.target.value)} />
                </div>
            <table className='table'>
            <tr className='first-row'>
                                <th>Source <button className='arrow' onClick={() => orderChangeSource()}> {orderSource ? <BsFillCaretUpFill /> : <BsFillCaretDownFill /> } </button></th>
                                <th>Name <button className='arrow' onClick={() => orderChange()}> {order ? <BsFillCaretUpFill /> : <BsFillCaretDownFill /> } </button> </th>
                                <th>Image</th>
            </tr>
                {mount.filter(element => {
                    return element.mount_name.includes(userInput)
                })
                .map((mount) => {
                    return (
                        <div className='item' onClick={() => addToPage(mount.mount_id, mount.mount_name)}>
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
        </div>
    )
}
export default MountPage