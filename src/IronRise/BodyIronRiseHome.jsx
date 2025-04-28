import { Link } from 'react-router-dom';
import heroTasso from '../assets/tassoIRonRise.png';
import badgerAuction from '../assets/tassoAuction.png';
import badgerMaximize from '../assets/maximizeTasso.png';
import badgerFlexible from '../assets/tassoFrexible.png';
import selectImg from '../assets/SelectPact.png';
import bidImg from '../assets/bid.png';
import windImg from '../assets/winInvest.png';

export const BodyIronRiseHome = () => {
    return (
        <div className="min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            On-Chain Pact Auctions<br />
                            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                                Transparent & Decentralized
                            </span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl">
                            Participate in real-time auctions for digital pacts. Engage in a transparent bidding
                            process to access competitive opportunities within the ecosystem.
                        </p>
                        <Link
                            to="/app.ironRise/auction"
                            className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 
      text-lg font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl 
      hover:shadow-orange-500/20"
                        >
                            View Active Auctions →
                        </Link>
                    </div>


                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <img
                            src={heroTasso}
                            alt="Auction interface preview"
                            className="rounded-2xl border-2 border-orange-500/30 shadow-2xl hover:scale-[1.02] transition-transform"
                        />
                    </div>
                </div>
            </section>


            {/* Value Propositions */}
            <section className="py-20 px-6 bg-gray-800/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Why Choose Iron Rise Auctions?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Transparent Bidding */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                            <img src={badgerAuction} alt="Transparent" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-orange-400">
                                Transparent Bidding Process
                            </h3>
                            <p className="text-gray-300 text-center">
                                Engage in a fully transparent auction environment with real-time updates and open participation.
                            </p>
                        </div>

                        {/* Feature 2: Open Market Participation */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                            <img src={badgerMaximize} alt="Maximize" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-orange-400">
                                Open Market Participation
                            </h3>
                            <p className="text-gray-300 text-center">
                                Access digital pact opportunities typically unavailable in traditional financial markets.
                            </p>
                        </div>

                        {/* Feature 3: Settlement Options */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                            <img src={badgerFlexible} alt="Flexible" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-orange-400">
                                Settlement Options
                            </h3>
                            <p className="text-gray-300 text-center">
                                Choose between immediate claim options or scheduled auction cycles for strategic asset management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Process Flow */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Auction Participation Workflow
                    </h2>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* Step 1: Asset Selection */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-32 h-32 mb-6 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center">
                                <img src={selectImg} alt="Select" className="w-20 h-20" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-orange-400">
                                1. Asset Selection
                            </h3>
                            <p className="text-gray-300">
                                Filter digital pacts by maturity, risk parameters, and market demand.
                            </p>
                        </div>

                        <div className="self-stretch w-px bg-orange-500/20 md:hidden" />
                        <div className="self-stretch w-px bg-orange-500/20 hidden md:block" />

                        {/* Step 2: Competitive Bidding */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-32 h-32 mb-6 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center">
                                <img src={bidImg} alt="Bid" className="w-20 h-20" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-orange-400">
                                2. Competitive Bidding
                            </h3>
                            <p className="text-gray-300">
                                Place bids with real-time price tracking and automated strategies.
                            </p>
                        </div>

                        <div className="self-stretch w-px bg-orange-500/20 md:hidden" />
                        <div className="self-stretch w-px bg-orange-500/20 hidden md:block" />

                        {/* Step 3: Settlement */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-32 h-32 mb-6 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center">
                                <img src={windImg} alt="Win" className="w-20 h-20" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-orange-400">
                                3. Settlement & Ownership
                            </h3>
                            <p className="text-gray-300">
                                Secure pact settlement with smart contract execution.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Final CTA */}
            <section className="bg-gradient-to-r from-orange-500/90 to-amber-600/90 py-20">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">
                        Start Growing Your Digital Pact Portfolio
                    </h2>
                    <p className="text-xl text-amber-100 mb-8">
                        Access digital fixed-income opportunities through decentralized auctions.
                    </p>
                    <Link
                        to="/app.ironRise/newauction"
                        className="inline-block bg-white text-orange-600 hover:bg-amber-50 px-10 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                        Explore Available Pacts
                    </Link>
                </div>
            </section>
        </div>
    );
};