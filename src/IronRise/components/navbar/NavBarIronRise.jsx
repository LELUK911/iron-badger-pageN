import { useEffect, useState } from 'react';
import { ConnectEVM } from '../../../utils/EVMButton';
import logo from '../../../assets/tassoIRonRise.png';
import { Link, useLocation } from 'react-router-dom';
import { CollapsobleMenuIronEcosistem } from '../../../utils/components/ironLink/CollapsobleMenuIronEcosistem';
import { FeedbackDropdown } from '../../../tesnet/TestnetComponent/FeedbackDropdown';

export const NavBarIronRise = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navLinks = [
        { name: 'Auctions', path: '/app.ironRise/auction' },
        { name: 'Manager Auction', path: '/app.ironRise/manager' },
        { name: 'New Auction', path: '/app.ironRise/newauction' },


    ];

    const renderOnDesktop = () => (
        <div className="flex space-x-7 font-semibold">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg px-3 py-2 rounded-md transition duration-300 ${location.pathname === link.path ? 'text-indigo-600' : 'hover:text-indigo-500 text-gray-100'
                        }`}
                >
                    {link.name}
                </Link>
            ))}
            <CollapsobleMenuIronEcosistem />
            <div className="hover:text-indigo-400 transition-colors">
                <FeedbackDropdown />
            </div>
        </div>
    );

    const renderOnMobile = () => (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-3xl text-yellow-500 focus:outline-none"
            >
                &#9776; {/* Icona hamburger */}
            </button>
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } absolute top-20 left-0 w-full bg-gray-800 bg-opacity-95 z-50 shadow-lg`}
            >
                <div className="flex flex-col items-center space-y-4 py-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg px-3 py-2 rounded-md transition duration-300 ${location.pathname === link.path ? 'text-yellow-400' : 'hover:text-yellow-400 text-gray-200'
                                }`}
                            onClick={() => setIsOpen(false)} // Chiudi il menu dopo il click
                        >
                            {link.name}
                        </Link>
                    ))}
                    <CollapsobleMenuIronEcosistem />
                    <div className="hover:text-indigo-400 transition-colors">
                        <FeedbackDropdown />
                    </div>

                    <ConnectEVM />
                </div>
            </div>
        </>
    );

    return (
        <div className="flex justify-between items-center h-20 px-6">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <Link to="/app.ironRise">
                    <img src={logo} alt="Iron Pacts Logo" className="w-16 h-auto rounded-lg" />
                </Link>
                {!isMobile && renderOnDesktop()}
            </div>

            {/* Connect Wallet e Hamburger Menu */}
            <div className="flex items-center space-x-4">
                {!isMobile && <ConnectEVM />}
                {isMobile && renderOnMobile()}
            </div>
        </div>
    );
};