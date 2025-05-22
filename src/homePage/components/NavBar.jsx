import { useState } from 'react';
import logo from '../../assets/tassoSimbolo.png';
import { IronEcosistemCollaps } from './IronEcosistemCollaps/IronEcosistemCollaps';
import { Link } from 'react-router-dom';
import { ConnectEVM } from '../../utils/EVMButton';
import { FeedbackDropdown } from '../../tesnet/TestnetComponent/FeedbackDropdown';

export const NavbarHomePage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const listEcosistem = [
        { name: "Iron Pact", path: "/app.ironPact" },
        { name: "Iron Forge", path: "/app.ironForge" },
        { name: "Iron Rise", path: "/app.ironRise" },
        { name: "Iron Fall", path: "/app.ironfall" },
    ];
    const listDAO = [{ name: "Coming Soon", path: "/" }];
    const listDocumentation = [{ name: "Documentation", path: "/documentation" }];
    const listLearn = [{ name: "Launch NFT/Token", path: "https://ironlaunch.on-fleek.app/" }];
    const tesnet = [{ name: "Faucet", path: "/tokenFaucet" }];

    return (
        <nav className="bg-slate-900 text-white px-2 py-4">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center w-full">
                    <div className="flex items-center space-x-4">

                        {/* Logo a sinistra */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold">
                                <img src={logo} alt="Iron Pacts Logo" className="w-16 h-auto rounded-lg" />
                            </Link>
                        </div>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex space-x-6 items-center">
                            <div className="hover:text-blue-400 transition-colors">
                                <IronEcosistemCollaps list={listEcosistem} title="Ecosystem" />
                            </div>
                            <div className="hover:text-blue-400 transition-colors">
                                <IronEcosistemCollaps list={listDocumentation} title="Documentation" />
                            </div>

                            <div className="hover:text-red-400 transition-colors">
                                <IronEcosistemCollaps list={tesnet} title="Tesnet Section" />
                            </div>
                            <div className="hover:text-indigo-400 transition-colors">
                                <FeedbackDropdown />
                            </div>
                        </div>
                    </div>
                    {/* Pulsante "NewPact" (Desktop) */}
                    <div className=" hidden md:flex" >
                        <ConnectEVM />
                    </div>

                    {/* Hamburger Menu (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4 relative z-40">
                        <div className="hover:text-blue-400 transition-colors">
                            <IronEcosistemCollaps list={listEcosistem} title="Ecosystem" />
                        </div>
                        <div className="hover:text-blue-400 transition-colors">
                            <IronEcosistemCollaps list={listDAO} title="Badger Brotherhood" />
                        </div>
                        <div className="hover:text-blue-400 transition-colors">
                            <IronEcosistemCollaps list={listDocumentation} title="Documentation" />
                        </div>
                        <div className="hover:text-blue-400 transition-colors">
                            <IronEcosistemCollaps list={listLearn} title="Learn" />
                        </div>
                        <div className="hover:text-red-400 transition-colors">
                            <IronEcosistemCollaps list={tesnet} title="Tesnet Section" />
                        </div>
                        <div className="hover:text-indigo-400 transition-colors">
                            <FeedbackDropdown />
                        </div>
                        <div>
                            <ConnectEVM />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
