import React from 'react';
import styled from 'styled-components';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    padding: 10px;
`;

const Title = styled.p`
  font-size: 14px;
`;

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
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 300;
`

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
    <HeaderContainer>
        <Title>LandmarkRemark</Title>
        <RightContainer>
          <UserName>{currentUser.email}</UserName>
          <Button onClick={handleLogout}>Log Out</Button>
        </RightContainer>
    </HeaderContainer>
  )
}

