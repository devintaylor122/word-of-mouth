import React, { useContext, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
// import { AuthContext } from "./AuthContext";
import { AuthProvider } from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { anyUser } = useAuth();

const handleSearch = async () => {
    const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
    );

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
    } catch (err) {
        setErr(true);
    }
    };

const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
};

const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    anyUser.uid > user.uid
        ? anyUser.uid + user.uid
        : user.uid + anyUser.uid;
    try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", anyUser.uid), {
        [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
            uid: anyUser.uid,
            displayName: anyUser.displayName,
            photoURL: anyUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
        });
        }
    } catch (err) {}

    setUser(null);
    setUsername("")
    };
return (
    <div className="search">
        <div className="searchForm">
        <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
        />
    </div>
    {err && <span>User not found!</span>}
    {user && (
        <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
            <span>{user.displayName}</span>
        </div>
        </div>
    )}
    </div>
);
};

export default Search;