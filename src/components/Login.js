import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Logo = styled.h1`
    font-size: 40px;
    margin: 0;
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
        <Container>
            <Logo>Landmark Remark</Logo>
            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
                <Button disabled={loading} >Login</Button>
            </Form>
            <div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </Container>
    )
};