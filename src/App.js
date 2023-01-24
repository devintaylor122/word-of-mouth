import "./App.css";
import { db } from "./firebaseconfig.js";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  // updateDoc,
  // doc,
  // deleteDoc,
} from "firebase/firestore";

function App() {
  console.log(db);
  // const [users, setUsers] = useState([])
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: parseInt(newAge) }); //takes in two things, reference to collection and object containing data/payload that we're adding
  };

  //useEffect is called everytime page renders, don't async useEffect - bad practice
  useEffect(() => {
    //async function (other option: .then, .catch)
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //doc.data access object that contains name and age
      console.log(data);
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            {""}
            <h1>Name: {user.name}</h1>
            <h2>Age: {user.age}</h2>
            {/* <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button> */}
          </div>
        );
      })}
    </div>
  );
}

export default App;
