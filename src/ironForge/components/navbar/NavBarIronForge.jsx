import { useState, useEffect } from 'react';
import { ConnectEVM } from '../../../utils/EVMButton';
import logo from '../../../assets/TassoForgiatore.png';
import { Link, useLocation } from 'react-router-dom';
import { CollapsobleMenuIronEcosistem } from '../../../utils/components/ironLink/CollapsobleMenuIronEcosistem';
import { FeedbackDropdown } from '../../../tesnet/TestnetComponent/FeedbackDropdown';

export const NavBarIronForge = () => {
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
        { name: 'Forge Market', path: '/app.ironForge/market' },
        { name: 'Forge New Pact', path: '/app.ironForge/board' },
        { name: 'Managment Forge', path: '/app.ironForge/mangment' },
    ];

    // Menu Desktop
    const renderOnDesktop = () => (
        <div className="flex space-x-7 font-semibold">
            {/* Link principali */}
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    className={`
                        text-lg px-3 py-2 rounded-md transition duration-300
                        ${location.pathname === link.path
                            ? 'text-green-300' // Colore attivo
                            : 'text-gray-100 hover:text-green-300'
                        }
                    `}
                >
                    {link.name}
                </Link>
            ))}
            {/* Ecosistem */}
            <CollapsobleMenuIronEcosistem />
            <div className="hover:text-indigo-400 transition-colors">
                <FeedbackDropdown />
            </div>
        </div>
    );

    // Menu Mobile
    const renderOnMobile = () => (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-3xl text-green-300 focus:outline-none"
                aria-label="Toggle menu"
            >
                &#9776; {/* Icona hamburger */}
            </button>
            {isOpen && (
                <div
                    className="absolute top-20 left-0 w-full z-50 shadow-lg
                               bg-green-900 bg-opacity-90"
                >
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {/* Link principali */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`
                                    text-lg px-3 py-2 rounded-md transition duration-300
                                    ${location.pathname === link.path
                                        ? 'text-green-300'
                                        : 'text-gray-100 hover:text-green-300'
                                    }
                                `}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {/* Ecosistem */}
                        <CollapsobleMenuIronEcosistem />
                        <div className="hover:text-indigo-400 transition-colors">
                            <FeedbackDropdown />
                        </div>
                        {/* Connect Wallet in Mobile */}
                        <ConnectEVM />
                    </div>
                </div>
            )}
        </>
    );

    return (
        <header className="flex justify-between items-center h-20 px-6">
            {/* Logo + Menu Desktop */}
            <div className="flex items-center space-x-4">
                <Link to="/app.ironForge">
                    <img
                        src={logo}
                        alt="Iron Forge Logo"
                        className="w-16 h-auto rounded-lg"
                    />
                </Link>
                {!isMobile && renderOnDesktop()}
            </div>

            {/* ConnectEVM + Menu Mobile */}
            <div className="flex items-center space-x-4">
                {!isMobile && <ConnectEVM />}
                {isMobile && renderOnMobile()}
            </div>
        </header>
    );
};
