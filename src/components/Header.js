import React from 'react';
import styled from 'styled-components';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const {logout} = useAuth();
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
    <div className='header'>
        <p>LandmarkRemark</p>
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

