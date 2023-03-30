import React from 'react';
import styled from 'styled-components';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
    background-color: #00337C;
    border: none;
    color: white;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


export default function Header() {

  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async e => {
    e.preventDefault()
    try {
      await logout();
      navigate('/')
      } catch (error) {
          console.log(error.message);
      }
  }

  return (
    <header>
        <p>LandmarkRemark</p>
        <RightContainer>
          <p>{currentUser.email}</p>
          <Button onClick={handleLogout}>Log Out</Button>
        </RightContainer>
    </header>
  )
}

