import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css"


export default function LandingPage(){
    return(
        <div className='landing-div'>
                <h1 className='landing-title'>Dogs App</h1>
            <Link to='/home'>
                <button className='landing-button'><h2>Get in</h2></button>
            </Link>
        </div>
    )
}