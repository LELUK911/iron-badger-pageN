import newPactLogo from '../../assets/tassoIronPact.jpg';
import launchPactLogo from '../../assets/TassoForgiatore.png';
import selORbuyLogo from '../../assets/tassoIRonRise.png';
import auctionBagder from '../../assets/TassoIronFAll.png';
import logo from '../../assets/IronPactLogo-C2GdRcL7.png';
import { Link } from 'react-router-dom';


export const PactsScheme = () => {
    return (
        <div className="grid place-items-center w-full p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white mt-24">
            {/* Hero Section */}
            <div className="mb-20 flex flex-col items-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Iron Badger Brotherhood
                </h1>
                <h3 className="text-xl md:text-2xl font-medium text-gray-300 mb-12 text-center max-w-2xl leading-relaxed">
                    Building next-generation DeFi tools that combine finance, strategy, and community power
                </h3>
                <img
                    src={logo}
                    alt="Iron Pacts Logo"
                    className="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Iron Pacts Protocol */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mb-24 p-4">
                <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl max-w-lg text-center relative overflow-hidden group transform transition-all hover:shadow-indigo-500/20 hover:shadow-xl">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 tracking-tight">
                            Iron Pact Protocol
                        </h3>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-blue-300 to-indigo-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-md md:text-lg mt-2 leading-relaxed text-blue-50/90 font-medium">
                        Create secured peer-to-peer agreements without selling your assets. Lock your tokens as collateral and create Iron Pacts  programmable semi-NFTs that allow you to access liquidity while maintaining your crypto exposure.
                        </p>
                        <div className="mt-8 transform transition-transform hover:scale-105 active:scale-95 inline-block">
                            <Link to="/app.ironPact">
                                <button className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-md">
                                    Explore Iron Pacts
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative md:ml-12 mt-12 md:mt-0 transform transition-all hover:scale-105">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                    <div className="relative z-10">
                        <img
                            src={newPactLogo}
                            alt="Iron Pact Visualization"
                            className="w-72 h-72 rounded-2xl shadow-xl relative z-10 transform transition-transform duration-700 hover:rotate-2 hover:shadow-indigo-500/30"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-400/10 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>

            {/* Iron Forge */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-5xl w-full mb-24 p-4">
                <div className="p-8 bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl shadow-2xl max-w-lg text-center relative overflow-hidden group transform transition-all hover:shadow-teal-500/20 hover:shadow-xl">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-100 tracking-tight">
                            Iron Forge Protocol
                        </h3>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-green-300 to-teal-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-md md:text-lg mt-2 leading-relaxed text-green-50/90 font-medium">
                        Create custom peer-to-peer lending agreements on-chain. Design, deploy, and manage structured Iron Pacts with automated terms – all with full transparency and no intermediaries.
                        </p>
                        <div className="mt-8 transform transition-transform hover:scale-105 active:scale-95 inline-block">
                            <button className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-green-600 hover:bg-green-50 transition-colors shadow-md">
                                <Link to="/app.ironForge">Explore Iron Forge</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative md:mr-12 mt-12 md:mt-0 transform transition-all hover:scale-105">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-teal-600 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                    <div className="relative z-10">
                        <img
                            src={launchPactLogo}
                            alt="Iron Forge Visualization"
                            className="w-72 h-72 rounded-2xl shadow-xl relative z-10 transform transition-transform duration-700 hover:rotate-2 hover:shadow-teal-500/30"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-400/10 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>

            {/* Iron Rise */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mb-24 p-4">
                <div className="p-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl shadow-2xl max-w-lg text-center relative overflow-hidden group transform transition-all hover:shadow-amber-500/20 hover:shadow-xl">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 tracking-tight">
                            Iron Rise Protocol
                        </h3>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-amber-300 to-orange-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-md md:text-lg mt-2 leading-relaxed text-amber-50/90 font-medium">
                        Participate in transparent, on-chain auctions. Bid competitively for Iron Pacts in real-time with our decentralized auction platform that ensures fair pricing for everyone.
                        </p>
                        <div className="mt-8 transform transition-transform hover:scale-105 active:scale-95 inline-block">
                            <button className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-amber-600 hover:bg-amber-50 transition-colors shadow-md">
                                <Link to="/app.ironRise">Explore Iron Rise</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative md:ml-12 mt-12 md:mt-0 transform transition-all hover:scale-105">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-600 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                    <div className="relative z-10">
                        <img
                            src={selORbuyLogo}
                            alt="Iron Rise Visualization"
                            className="w-72 h-72 rounded-2xl shadow-xl relative z-10 transform transition-transform duration-700 hover:rotate-2 hover:shadow-amber-500/30"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-400/10 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>

            {/* Iron Fall */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-5xl w-full mb-12 p-4">
                <div className="p-8 bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl shadow-2xl max-w-lg text-center relative overflow-hidden group transform transition-all hover:shadow-rose-500/20 hover:shadow-xl">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-100 tracking-tight">
                            Iron Fall Protocol
                        </h3>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-rose-300 to-pink-400 mx-auto mb-6 rounded-full"></div>
                        <p className="text-md md:text-lg mt-2 leading-relaxed text-rose-50/90 font-medium">
                        Iron Fall Protocol Discover unique investment opportunities through descending-price auctions. Our market-responsive system automatically adjusts rates until finding the perfect price point for both creditors and buyers.
                        </p>
                        <div className="mt-8 transform transition-transform hover:scale-105 active:scale-95 inline-block">
                            <button className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-rose-600 hover:bg-rose-50 transition-colors shadow-md">
                                <Link to="/app.ironfall">Explore Iron Fall</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative md:mr-12 mt-12 md:mt-0 transform transition-all hover:scale-105">
                    <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-600 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                    <div className="relative z-10">
                        <img
                            src={auctionBagder}
                            alt="Iron Fall Visualization"
                            className="w-72 h-72 rounded-2xl shadow-xl relative z-10 transform transition-transform duration-700 hover:rotate-2 hover:shadow-rose-500/30"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-400/10 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
