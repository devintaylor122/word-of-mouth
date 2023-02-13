import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebaseconfig'
import { AuthProvider } from '../context/AuthProvider'

const ChatNavbar = () => {
  console.log(useContext(AuthProvider))
    const {currentUser} = useContext(AuthProvider)

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
