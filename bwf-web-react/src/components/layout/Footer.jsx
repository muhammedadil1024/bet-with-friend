import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            &copy; {new Date().getFullYear()}
            <a href="https://github.com/muhammedadil1024"> Muhammed Adil. all rights reserved</a>
        </div>
    );
}

export default Footer