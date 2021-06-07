import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { addToPage } from '../redux/itemReducer'

const MountPage = (props) => {
    const [ mount, setMount ] = useState([])
    const [ showTwo, setShowTwo ] = useState(true)
    const dispatch = useDispatch()
    
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

    const addToPage = (mount_id) => {
        axios.post(`/api/addmount/${mount_id}`)
        .then((res) => {
            dispatch(addToPage(res.data))
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
                {mount.map((mount) => {
                    return (
                        <div className='item' onClick={() => addToPage(mount.mount_id)}>
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
        </div>
    )
}
export default MountPage