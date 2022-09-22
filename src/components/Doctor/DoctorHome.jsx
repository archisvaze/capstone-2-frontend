import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../slices/mySlice';

export default function DoctorHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLoggedIn === false) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.doctor_id === undefined) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.onboarded === false) {
      navigate("/doctor-onboarding")
    }
  }, [])


  return (
    <div className='doctor-home page'>


    </div>
  )
}
