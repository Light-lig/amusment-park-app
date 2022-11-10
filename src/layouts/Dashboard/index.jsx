import React from 'react';
import Header from '../header';
import Banner from '../../components/Banner';
import BodyDashed from '../BodyDashed';
const DashBoard = ({children, isGrid}) => <div className="min-h-full">
    <Header />
    <Banner title="Dashboard" />
    <BodyDashed isGrid={isGrid}>
        {children}
    </BodyDashed>
</div>

export default DashBoard;