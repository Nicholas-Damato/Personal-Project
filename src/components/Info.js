import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineMenu } from "react-icons/ai"


const Info = (props) => {
    const [ showTwo, setShowTwo] = useState(true)

    const toggleShowTwo = () => {
        setShowTwo(!showTwo)
    }


    return (
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
            <div className='body'>
            <h1 className='welcome'> Welcome! </h1>
            <p> This is a website built around the idea of keeping track of the collectables in MMO's that are just too hard to keep track of and because the game itself doesn't help you either!
            </p>
            <h2> Currently this site features these games: </h2>
            <ul>
                <li> Final Fantasy XIV (FFXIV) </li>
                <li> MORE COMING SOON... </li>
            </ul>
            <h2> This website allows you to: </h2>
            <ol>
                <li>Keep a unique list of your collectables that won't overlap with anyone else's! </li>
                <li>Gives a full and accurate list of said game's collectables! </li>
                <li>Gives you the name and source of how you can acquire said collectable! </li>
                <li>Features a quick search among your list or the provided list of said game to find said collectable! </li>
            </ol>
            <h2> How to use: </h2>
            <ul>
                <li>When clicking on an item in a row, it will add to your respective list.</li>
                <li>When on your list you can click to delete. </li>
                <li>Search bars are provided for each table so that you can easily navigate your way through. </li>
                <li>When trying to change your username, you must provide an email, you will get sent an email with your new username updated so you don't accidently forget! </li>
                <li>Everytime you add or delete a collectable the counter to their respective category will go up or down! </li>
            </ul>
            </div>
        </div>
    )
}

export default Info