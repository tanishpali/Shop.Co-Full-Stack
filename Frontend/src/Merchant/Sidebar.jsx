import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    BarChart3,
    Settings,
    ShieldCheck,
    User,
    X,
    LogOut
} from 'lucide-react';
import Cookies from 'js-cookie';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    // Helper 
    const isActivePath = (path) => {
        if (path === '/merchant' && location.pathname === '/merchant') return true;
        if (path !== '/merchant' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/merchant' },
        { id: 'products', label: 'Inventory', icon: Package, path: '/merchant/inventory' },
        { id: 'orders', label: 'Shipments', icon: ShoppingBag, path: '/merchant/orders' },
        { id: 'analytics', label: 'Insights', icon: BarChart3, path: '/merchant/analytics' },
        { id: 'profile', label: 'Profile', icon: User, path: '/merchant/profile' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/merchant/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                w-80 flex flex-col h-screen lg:h-[calc(100vh-4rem)]
                fixed lg:sticky top-0 left-0 lg:top-16 z-40
                bg-[#fbfbf9] border-r border-gray-100 px-6 py-8
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="lg:hidden flex justify-end mb-4">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    {/* <p className="px-10 text-[25px] font-bold text-black-400 uppercase  mb-4">Management</p> */}
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isActive = isActivePath(item.path);

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                    ? 'bg-black text-white shadow-lg shadow-black/5'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`h-7 w-7 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
                                    <span className="font-medium text-base tracking-tight">{item.label}</span>
                                </div>
                                {isActive && <div className="w-1 h-1 bg-white rounded-full" />}
                            </NavLink>
                        );
                    })}
                </div>

                <div className="mt-auto px-6 py-6 border-t border-gray-100">
                    <button
                        onClick={() => {
                            // Call API
                            fetch('http://localhost:4000/api/merchants/merchant-logout', {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${Cookies.get('token')}`
                                }
                            }).catch(err => console.error(err));

                            // Client-side cleanup
                            Cookies.remove('token');
                            localStorage.removeItem('merchant');
                            window.location.href = '/merchant/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group"
                    >
                        <LogOut className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-base tracking-tight">Log Out</span>
                    </button>
                </div>

                {/* <div className="mt-auto px-4 py-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Atelier Status</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 mb-4">Premium Subscription</p>
                        <div className="w-full bg-gray-100 rounded-full h-1 mb-2 overflow-hidden">
                            <div className="bg-black h-1 rounded-full w-[85%] transition-all duration-1000"></div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">850 / 1000 SKU Capacity</p>
                    </div>
                </div> */}
            </aside>

        </>
    );
};

export default Sidebar;
