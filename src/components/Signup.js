import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Form = styled.form`
    width: 100%;
    font-size: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Title = styled.p`
    margin: 0;
    font-size: 30px;
`;

const Input = styled.input`
    width: 50vw;
    outline: none;
    background-color: white;
    border: 2px solid black;
    padding: 8px;
    border-radius: 4px;
    font-size: 20px;
`;

const Button = styled.button`
    border: none;
    background-color: #00337C;
    color: white;
    padding: 10px;
    width: 20vw;
    font-size: 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 250ms ease-in-out;
    &:hover{
        transform: scale(1.1);
    }
`;

const ErrorMessage = styled.p`
    margin: 0;
    font-size: 16px;
`;

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
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Sign Up</Title>
                <Input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
                <Button disabled={loading}>Sign Up</Button>
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                {pwdError && <ErrorMessage>{pwdError}</ErrorMessage>}
                {successMsg && <p>{successMsg}</p>}
            </Form>
            <div>
                Already have an account? <Link to="/">Login</Link>
            </div>
        </Container>
    )
};