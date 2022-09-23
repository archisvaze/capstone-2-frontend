import React from 'react'
import health from "../icons/health.svg"

export default function Logo() {
    return (
        <div className='logo'>
            <img style={{width : "25px"}} src={health} alt="" />
        </div>
    )
}
