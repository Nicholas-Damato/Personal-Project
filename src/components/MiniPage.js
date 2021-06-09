import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addToPage } from '../redux/itemReducer'

const MiniPage = (props) => {
    const [ mini, setMini ] = useState([])
    const [ userMini, setUserMini ] = useState([])
    const [ showTwo, setShowTwo] = useState(true)
    const [ userInput, setUserInput ] = useState('')
    const dispatch = useDispatch()
    const [ order, setOrder ] = useState(false)
    const [ orderSource, setOrderSource ] = useState(false)
    
    
    const orderChange = () => {
        if(orderSource === true){
            setOrderSource(false)
        } 
        if(order === true){
            axios.get('/api/mini')
            .then((res) => {
                setMini(res.data)
            })
            .catch(err => console.log(err))
            setOrder(false)
        } else {
            axios.get('/api/minidsc')
            .then((res) => {
                setMini(res.data)
            })
            .catch(err => console.log(err))
            setOrder(true)
        }
    }

    const handleInput = (value) => {
        setUserInput(value)
    }
    
    const orderChangeSource = () => {
        if(order === true){
            setOrder(false)
        } 
        if(orderSource === true){
            axios.get('/api/minisource')
            .then((res) => {
                setMini(res.data)
            })
            .catch(err => console.log(err))
            setOrderSource(false)
        } else {
            axios.get('/api/minisourcedesc')
            .then((res) => {
                setMini(res.data)
            })
            .catch(err => console.log(err))
            setOrderSource(true)
        }
    }
    
    const toggleShowTwo = () => {
        setShowTwo(!showTwo)
    }

    useEffect(() => {
        axios.get(`/api/miniuser`)
        .then(res => {
            setUserMini(res.data)
        })
        .catch(err => console.log(err))
    })
    
    useEffect(() => {
        axios.get('/api/mini')
        .then((res) => {
            setMini(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const addToPage = (minion_id, minion_name) => {
        for(let i = 0; i < userMini.length; i++){
            if(userMini[i].minion_id === minion_id){
                return toast.error(`You already have the ${userMini[i].minion_name}`)
            } 
        }
        axios.post(`/api/addmini/${minion_id}`)
        .then((res) => {
            dispatch(addToPage(res.data))
            setUserMini([...userMini, minion_id])
        })
        .catch(err => console.log(err))
    }


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
                                <th>Image </th>
                                
            </tr>
                {mini.filter(element => {
                    return element.minion_name.includes(userInput)
                })
                .map((mini) => {
                    return (
                        <div className='item' onClick={() => addToPage(mini.minion_id, mini.minion_name)}>
                            <tr className='data'>
                                <td>{mini.minion_description}</td>
                                <td>{mini.minion_name}</td>
                                <td><img src={mini.minion_picture} alt={mini.minion_name} /></td>
                            </tr>
                        </div>
                    )
                })}
                </table>
            </div>
        </div>
    )
}

export default MiniPage