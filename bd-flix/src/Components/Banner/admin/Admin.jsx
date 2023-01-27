import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import AllServices from './Layout/AllServices';
import Daiyer from './Layout/Daiyer';

const Admin = () => {
    return (
        <div>
            <Navbar/>
            <div className='lg:flex md:flex container '>
                <Daiyer/>
            <Outlet/>
            </div>
            
            <Footer/>
        </div>
    );
};

export default Admin;