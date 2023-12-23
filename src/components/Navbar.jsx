import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <div>
            <nav>
                <div >
                    <Link to="/">Home</Link>
                    <Link to="/sos" >SOS</Link>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
