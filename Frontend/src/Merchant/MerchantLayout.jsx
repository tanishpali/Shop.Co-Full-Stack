import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

import Footer from '../User/pages/Homepage/Footer';

const MerchantLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-[#fbfbf9]">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex flex-1 relative">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col min-w-0">
                    <main className="p-4 md:p-8 w-full max-w-7xl mx-auto flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MerchantLayout;
