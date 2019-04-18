import HomeBody from '../Components/HomeBody';
import Footer from '../Components/Footer';
import AppRouter from '../Components/Router';
import React from 'react';
import './Home.css';

export default function Home(props) {
        return(
            <React.Fragment>
                <HomeBody/>
                <Footer/>
            </React.Fragment>
        )
}