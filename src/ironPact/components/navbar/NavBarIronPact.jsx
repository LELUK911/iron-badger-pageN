import { useState } from 'react';
import { ConnectEVM } from '../../../utils/EVMButton';
import logo from '../../../assets/tassoIronPact.jpg';
import { Link, useLocation } from 'react-router-dom';
import { CollapsobleMenuIronEcosistem } from '../../../utils/components/ironLink/CollapsobleMenuIronEcosistem';
import { FeedbackDropdown } from '../../../tesnet/TestnetComponent/FeedbackDropdown';

export const NavBarIronPact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Create New Pact', path: '/app.ironPact/newpact' },
        { name: 'Dashboard', path: '/app.ironPact/dashboardpacts' },
        { name: 'Wallet', path: '/app.ironPact/wallet' },
    ];

    return (
        <nav className=" text-white ">
            <div className="flex justify-between items-center h-20 px-6">
                {/* Logo e Menu Desktop */}
                <div className="flex items-center space-x-4">
                    <Link to="/app.ironPact">
                        <img src={logo} alt="Iron Pacts Logo" className="w-16 h-auto rounded-lg" />
                    </Link>
                    <div className="hidden md:flex space-x-7 font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg px-3 py-2 rounded-md transition duration-300 ${location.pathname === link.path
                                    ? 'text-yellow-400'
                                    : 'hover:text-yellow-400 text-gray-200'
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
                </div>

                {/* Connect Wallet e Hamburger Menu */}
                <div className="flex items-center space-x-4">
                    {/* Connect Wallet per Desktop */}
                    <div className="hidden md:block">
                        <ConnectEVM />
                    </div>

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-3xl text-yellow-500 focus:outline-none"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        &#9776;
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 bg-opacity-95 shadow-lg">
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg px-3 py-2 rounded-md transition duration-300 ${location.pathname === link.path
                                    ? 'text-yellow-400'
                                    : 'hover:text-yellow-400 text-gray-200'
                                    }`}
                                onClick={() => setIsOpen(false)} // Chiudi il menu dopo il click
                            >
                                {link.name}
                            </Link>
                        ))}
                        {/* Pulsante Ecosistem */}
                        <CollapsobleMenuIronEcosistem />
                        <div className="hover:text-indigo-400 transition-colors">
                            <FeedbackDropdown />
                        </div>
                        {/* Pulsante ConnectEVM */}
                        <div className="w-full flex justify-center">
                            <ConnectEVM />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
