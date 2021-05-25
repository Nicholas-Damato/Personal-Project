import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to='/'> AUTH </Link>
            <Link to='/mini'> MINI </Link> 
            <Link to='/mount'> MOUNT </Link>
            <Link to='/user'> USER PAGE </Link>
        </div>
    )
}

export default Header