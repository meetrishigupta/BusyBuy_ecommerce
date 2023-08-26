/** ------------------ IMPORTING CSS ------------------ **/
import Style from "./signUp.module.css";
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useState, useRef } from 'react';
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { Link } from 'react-router-dom';
/** ------------------ IMPORTING FIREBASE MODULES ------------------ **/
import {auth, database} from '../../firebaseInit';
import { set, ref } from "firebase/database";
import { createUserWithEmailAndPassword  } from "firebase/auth";
/** ------------------ IMPORTING TOAST MODULES ------------------ **/
import { toast } from 'react-toastify';



/** ------------------ Function to display Sign Up page ------------------ **/
function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const[error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

/** ------------------ Handles user Sign Up ------------------ **/
    const handleSubmit = async(e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Store the user in the Firebase Realtime Database
            await set(ref(database, `users/${user.uid}`), {
                name: name,
                email: email,
            });
            // Clear the input fields after successful signup
            handleClear();
            toast.success("You are now Signed Up!");
            // Sign-in successful, redirect to home page
            window.location.href = '/';
        } catch(error) {
            setError(error);
            toast.error(error.message);
        }
        setLoading(false);
    }

/** ------------------ Clears the form input ------------------ **/
    function handleClear() {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }



    return (
        <>
            <div className={Style.form}>
                <h1> Hello we grateful to choose us </h1>
                <form onSubmit={handleSubmit}>
                    {error ? <p style={{"color": "red", "margin": "auto"}}>{error.message}</p> : null}  
                    <input type="text" placeholder="Name" ref={nameRef} /> <br />
                    <input type="email" placeholder="Email" ref={emailRef} /> <br />
                    <input type="password" placeholder="Password" ref={passwordRef} /> <br />
                    <button  type="submit">{loading ? 'Loading...' : 'Sign Up'}</button>
                    <Link to="/signin">Already have an Account?</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp;