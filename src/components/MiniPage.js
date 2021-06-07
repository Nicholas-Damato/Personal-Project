import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { addToPage } from '../redux/itemReducer'

const MiniPage = (props) => {
    const [ mini, setMini ] = useState([])
    const [ showTwo, setShowTwo] = useState(true)
    const dispatch = useDispatch()

    const toggleShowTwo = () => {
        setShowTwo(!showTwo)
    }
    
    useEffect(() => {
        axios.get('/api/mini')
        .then((res) => {
            setMini(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const addToPage = (minion_id) => {
        axios.post(`/api/addmini/${minion_id}`)
        .then((res) => {
            dispatch(addToPage(res.data))
        })
        .catch(err => console.log(err))
    }

    console.log(mini)

    return(
        <div className='page'>
            <header className={`${showTwo ? 'sidebar' : 'sidebar-two'}`}>
                <div className='in-side'>
            <Link className='link-button' to='/mini'> MINIONS </Link> 
            <Link className='link-button' to='/mount'> MOUNT </Link>
            <Link className='link-button' to='/user'> USER PAGE </Link>
                </div>
            <div className='menu'>
                    <h4> <AiOutlineMenu className='menu-button' onClick={() => toggleShowTwo()} /> </h4>
                    <ul className={`${showTwo ? 'on' : ''}`}>
                        <li> <Link className='link-button' to='/mini'> MINIONS </Link> </li> 
                        <li> <Link className='link-button' to='/mount'> MOUNT </Link> </li> 
                        <li><Link className='link-button' to='/user'> USER PAGE </Link> </li> 
                    </ul>
                </div>
            </header>
            <div>
            <table className='table'>
            <tr className='first-row'>
                                <th>Source</th>
                                <th>Name</th>
                                <th>Image</th>
            </tr>
                {mini.map((mini) => {
                    return (
                        <div className='item' onClick={() => addToPage(mini.minion_id)}>
                            <tr className='data'>
                                <td>{mini.minion_description}</td>
                                <td>{mini.minion_name}</td>
                                <td><img src={mini.minion_picture} /></td>
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