import { Link } from 'react-router-dom'

const MountPage = (props) => {
    return (
        <div>
            <header>
            <Link to='/mini'> MINI </Link> 
            <Link to='/mount'> MOUNT </Link>
            <Link to='/user'> USER PAGE </Link>
            </header>
            <h1> we are here </h1>
        </div>
    )
}

export default MountPage