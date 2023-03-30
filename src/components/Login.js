import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            navigate('/landmarkRemark')
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
        
    }

    return(
        <div>
            <h1>Landmark Remark</h1>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
                <button disabled={loading} >Login</button>
            </form>
            <div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
};