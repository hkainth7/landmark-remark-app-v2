import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [successMsg, setSuccessMessage] = useState("")

    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    
    const {signUp} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validEmail.test(email)){
            setEmailError("Please enter a valid email address");
        }else if(password.length < 6){
            setPwdError("Please enter a password longer than 5 characters");
        }else{
            try {
                setLoading(true);
                await signUp(email, password);
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
            setEmailError("");
            setPwdError("");
            setSuccessMessage("Account successfully created. Please login");
        }
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
                <button disabled={loading}>Sign Up</button>
                {emailError && <p>{emailError}</p>}
                {pwdError && <p>{pwdError}</p>}
                {successMsg && <p>{successMsg}</p>}
            </form>
            <div>
                Already have an account? <Link to="/">Login</Link>
            </div>
        </div>
    )
};