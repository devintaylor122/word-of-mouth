import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebaseconfig'
// import { AuthContext } from './AuthContext'
import useAuth from '../../hooks/useAuth';


const ChatNavbar = () => {
    // const {currentUser} = useContext(AuthContext)
    const { anyUser } = useAuth();

return (
    <div className='navbar'>
    <span className="logo">Lama Chat</span>
    <div className="user">
        <img src={anyUser.photoURL} alt="" />
        <span>{anyUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
    </div>
    </div>
)
}

export default ChatNavbar;
