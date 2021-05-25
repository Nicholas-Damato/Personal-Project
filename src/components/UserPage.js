import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/authReducer'
import axios from 'axios'

const UserPage = (props) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        axios.get(`/auth/logout`)
        .then(res => {
            dispatch(loginUser(res.data))
            console.log(res.data)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Link to='/mini'> MINI </Link> 
            <Link to='/mount'> MOUNT </Link>
            <Link to='/user'> USER PAGE </Link>
            <button onClick={() => handleLogout()}> Logout </button>
        </div>
    )
}

export default UserPage



// import { Link } from 'react-router-dom'

// const Header = () => {
//     return (
//         <div>
//             <Link to='/'> AUTH </Link>
//             <Link to='/mini'> MINI </Link> 
//             <Link to='/mount'> MOUNT </Link>
//             <Link to='/user'> USER PAGE </Link>
//         </div>
//     )
// }

// export default Header