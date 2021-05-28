import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const MountPage = (props) => {
    const [ mount, setMount ] = useState([])
    
    useEffect(() => {
        axios.get('/api/mount')
        .then((res) => {
            setMount(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    console.log(mount)
    return (
        <div>
            <header>
            <Link to='/mini'> MINI </Link> 
            <Link to='/mount'> MOUNT </Link>
            <Link to='/user'> USER PAGE </Link>
            </header>
            <h1> we are here </h1>
            {mount.map((mount) => {
                return <div> 
                  <h1>  {mount.mount_name} </h1>
                  <img src={mount.mount_picture} />
                    </div>
            })}
        </div>
    )
}

export default MountPage