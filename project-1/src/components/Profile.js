import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export const Profile = () => {
    const { currentUser } = useAuthContext();

  return (
    <>
        <h1 className='text-center'>Profile</h1>
        <hr style={{width: "50%", margin: "3rem auto"}}/>
        <div className='d-flex justify-content-center align-items-center'>
        <img style={{ borderRadius: "4px "}} src={currentUser?.photoURL} alt={currentUser?.displayName} />
        <ul className='list-group mx-5'>
            <li class="list-group-item"><span className='fs-5 text-capitalize'>name:</span>  {currentUser?.displayName}</li>
            <li class="list-group-item"><span className='fs-5 text-capitalize'>email:</span>   {currentUser?.email}</li>
            <li class="list-group-item"><span className='fs-5 text-capitalize'>Gender:</span> {currentUser?.Gender}</li>
            <li class="list-group-item"><span className='fs-5 text-capitalize'>Birthday</span> {currentUser?.Birthday} </li>
            <li class="list-group-item"><span className='fs-5 text-capitalize'></span> --- </li>

        </ul>

        </div>

    </>
  )
}
