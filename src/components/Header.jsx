import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../slices/mySlice';

export default function Header() {
    const state = useSelector((state) => state.myState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                <img src="" alt="" className="logo" />
                <button onClick={() => {
                    dispatch(setLogout())
                    navigate("/")
                }} className="logout-btn">Logout</button>
            </nav>
        </header>
    )
}
