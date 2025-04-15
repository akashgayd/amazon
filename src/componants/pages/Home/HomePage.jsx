import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../../common/navbar';
import Slider from './langingPage/slider';
import ProductListing from '../../ProductListingPage';
// import Cards from './HomeOther/Cards';


const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
    
    // Here you would typically fetch user data
    
  }, [navigate]);


  return (
    <><NavBar />
  <Slider />
  <ProductListing />

  
    </>
  );
};

export default Home;