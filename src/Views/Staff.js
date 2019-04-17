import Header from '../Components/Header';
import HomeBody from '../Components/HomeBody';
import Footer from '../Components/Footer';
import AppRouter from '../Components/AppRouter';
import React from 'react';
import './Home.css';

export default function Staff(props) {
        return(
            <div className='h-100'> 
                
                <AppRouter/>
                <HomeBody/>
                <Footer/>
            </div>
        )
}