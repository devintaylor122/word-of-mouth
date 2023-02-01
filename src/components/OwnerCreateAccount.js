// // import { db } from "../firebaseconfig.js";
// import { useState } from "react";
// // import { collection, addDoc } from "firebase/firestore";
// // import Dropdown from "./Dropdown.js";
// import "./OwnerForm.js";
// import { Link } from "react-router-dom";
// import{ createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
// import{ auth } from '../firebaseconfig';

// function OwnerCreateAccount() {
// //   const usersCollectionRef = collection(db, "owners");
// const [registerEmail, setRegisterEmail] = useState("");
// const [registerPassword, setRegisterPassword] = useState("");
// const [user, setUser] = useState({});
// const [showPassword, setShowPassword] = useState(false);
// const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
// onAuthStateChanged(auth, (currentUser)=> {
//     setUser(currentUser);
// })
// const register = async () => {
//     try{
//     // this will create a new user in our authentication in firbase and at the same time in will log you in
//     const user = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword);
//     console.log(user)
// } catch (error) {
//     console.log(error.message);
//     }
// };

// return (

//     <div>

//     {/* <section className="section">

//       <p>XYZ</p>
//       <Link to="/">back home</Link>
//     </section> */}
//         <h3> Service Provider Sign Up</h3>
//         <input
//         placeholder="Email..."
//         onChange={(event) => {
//             setRegisterEmail(event.target.value)
//             }}
//             />
//         <input
//         type={showPassword ? "text" : "password"}
//         placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value)}}/>
//         <button onClick={register}> Create Account</button>
//     </div>

// );
// }

// export default OwnerCreateAccount;
