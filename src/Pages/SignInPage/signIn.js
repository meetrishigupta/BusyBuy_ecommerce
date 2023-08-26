/** ------------------ IMPORTING CSS ------------------ **/
import Style from "./signIn.module.css"
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useState, useRef, useEffect } from 'react';
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { Link } from 'react-router-dom';
/** ------------------ IMPORTING FIREBASE MODULES ------------------ **/
import {auth} from '../../firebaseInit';
import { signInWithEmailAndPassword  } from "firebase/auth";
/** ------------------ IMPORTING TOAST MODULES ------------------ **/
import { toast } from 'react-toastify';



/** ------------------ Function to display Sign In page ------------------ **/
function SignIn() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if the user is already signed in
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            // User is already signed in, redirect to home page
            window.location.href = '/';
        }
        });

        return () => unsubscribe();
    }, []);

/** ------------------ Handles user Sign In ------------------ **/
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            // Sign-in successful, redirect to home page
            toast.success("You are now Signed In!");
            window.location.href = '/';
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(error);
            handleClear();
            console.error("Error signing in:", errorCode, errorMessage);
        }
        setLoading(false);
    };

/** ------------------ Clears the form input ------------------ **/
    function handleClear() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }



    return (
        <>
            <div className={Style.form}>
                <h1>Your Welcome, to BusyBuy<img src="https://cdn-icons-png.flaticon.com/512/3501/3501047.png"
                    className={Style.cart} alt="Namaste"/></h1>
                <form onSubmit={handleSubmit}>
                    {error ? <p style={{"color": "red", "margin": "auto"}}>{error.message}</p> : null}     
                    <input type="email" placeholder="Email" ref={emailRef} /> <br />
                    <input type="password" placeholder="Password" ref={passwordRef} /> <br />
                    <button type="submit">{loading ? 'Loading...' : 'Sign In'}</button>
                    <Link to="/signup">Create a new Account</Link>
                </form>
            </div>
        </>
    )
}

export default SignIn;