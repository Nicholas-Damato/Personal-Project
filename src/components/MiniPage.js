import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MiniPage = (props) => {
    const [ mini, setMini ] = useState([])
    
    useEffect(() => {
        axios.get('/api/mini')
        .then((res) => {
            setMini(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    console.log(mini)

    return(
        <div>
            <header>
            <Link to='/mini'> MINI </Link> 
            <Link to='/mount'> MOUNT </Link>
            <Link to='/user'> USER PAGE </Link>
            </header>
            <div>
                {mini.map((mini) => {
                    return (
                        <div>
                            <h1> {mini.minion_name} </h1>
                    <img src={mini.minion_picture} />
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MiniPage