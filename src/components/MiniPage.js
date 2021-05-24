import axios from 'axios'
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
            
        </div>
    )
}

export default MiniPage