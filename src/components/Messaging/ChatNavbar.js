import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebaseconfig'
import { AuthContext } from './AuthContext'

const ChatNavbar = () => {
    const {currentUser} = useContext(AuthContext)

return (
    <div className='navbar'>
    <span className="logo">Lama Chat</span>
    <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
    </div>
    </div>
)
}

export default ChatNavbar;
