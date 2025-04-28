import { Link } from 'react-router-dom';
import heroTasso from '../assets/TassoIronFAll.png';
import dynamicBagder from '../assets/TassoDynamic.png';
import edgeBagder from '../assets/tassoEdge.png';
import savingTasso from '../assets/savingTasso.png';

export const BodyIronFallHome = () => {
    return (
        <div className="min-h-screen  text-gray-100">
            {/* Hero Section */}
            <section className="relative py-24 px-6 bg-gradient-to-b from-black to-red-900/50">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Descending Pact Auctions<br />
                            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                Market-Responsive Pricing
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Access structured pact offerings through transparent descending-price auctions with dynamic rate adjustments.
                        </p>
                        <Link
                            to="/app.ironfall/auction"
                            className="inline-block bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Explore Live Auctions
                        </Link>
                    </div>

                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <img
                            src={heroTasso}
                            alt="Auction Interface"
                            className="rounded-2xl border-2 border-red-500/30 shadow-2xl"
                        />
                    </div>
                </div>
            </section>


            {/* Value Propositions */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Advantages of the Auction Framework
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Advantage 1 */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                            <img src={dynamicBagder} alt="Transparent Pricing" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-400">
                                Transparent Pricing
                            </h3>
                            <p className="text-gray-300 text-center">
                                Full visibility into real-time price adjustments and historical auction records.
                            </p>
                        </div>

                        {/* Advantage 2 */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                            <img src={edgeBagder} alt="Optimized Timing" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-400">
                                Optimized Timing
                            </h3>
                            <p className="text-gray-300 text-center">
                                Data-driven insights and analytics tools support informed bidding strategies.
                            </p>
                        </div>

                        {/* Advantage 3 */}
                        <div className="p-8 bg-gray-900 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                            <img src={savingTasso} alt="Efficient Market Access" className="w-20 h-20 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-center text-red-400">
                                Efficient Market Access
                            </h3>
                            <p className="text-gray-300 text-center">
                                Automated price discovery fosters liquidity alignment and minimizes transaction inefficiencies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Auction Process */}
            <section className="py-20 bg-gray-900 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Auction Participation Steps
                    </h2>

                    <div className="flex flex-col md:flex-row gap-12 justify-between">
                        {/* Step 1: Selecting an Offering */}
                        <div className="text-center flex-1">
                            <div className="w-32 h-32 mb-6 mx-auto bg-red-500/10 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                                <span className="text-3xl font-bold text-red-400">1</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-red-400">
                                Select an Offering
                            </h3>
                            <p className="text-gray-300">
                                Browse available listings based on maturity, debtor rating, and valuation dynamics.
                            </p>
                        </div>

                        {/* Step 2: Monitoring Market Movements */}
                        <div className="text-center flex-1">
                            <div className="w-32 h-32 mb-6 mx-auto bg-red-500/10 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                                <span className="text-3xl font-bold text-red-400">2</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-red-400">
                                Monitor Market Movements
                            </h3>
                            <p className="text-gray-300">
                                Track dynamic price adjustments and receive optional real-time alerts.
                            </p>
                        </div>

                        {/* Step 3: Completing the Transaction */}
                        <div className="text-center flex-1">
                            <div className="w-32 h-32 mb-6 mx-auto bg-red-500/10 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                                <span className="text-3xl font-bold text-red-400">3</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-red-400">
                                Complete the Transaction
                            </h3>
                            <p className="text-gray-300">
                                Finalize ownership seamlessly through smart contract execution on-chain.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Risk Disclosure */}
            <section className="py-16 bg-red-900/20">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-6">
                        Key Disclosures
                    </h2>
                    <div className="space-y-4 text-red-200 text-sm leading-relaxed">
                        <p>Digital pact valuations may fluctuate based on market dynamics and external economic conditions.</p>
                        <p>Past auction performances are not indicative of future results or returns.</p>
                        <p>All participants are encouraged to review and acknowledge the associated risk disclosures before engaging.</p>
                    </div>
                    <div className="mt-8 flex justify-center gap-6">
                        <Link to="/" className="text-red-300 hover:text-white underline transition-colors duration-200">
                            Risk Statement
                        </Link>
                        <Link to="/" className="text-red-300 hover:text-white underline transition-colors duration-200">
                            Valuation Framework
                        </Link>
                    </div>
                </div>
            </section>



            {/* Live Auctions CTA */}
            <section className="bg-gradient-to-b from-red-900/50 to-black py-20">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">
                        Active Auction Opportunities
                    </h2>
                    <p className="text-xl text-red-200 mb-8">
                        Monitor live descending price auctions across multiple pact issuances.
                    </p>
                    <Link
                        to="/app.ironfall/newauction"
                        className="inline-block bg-white text-red-600 hover:bg-red-50 px-10 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
                    >
                        Access Auction Dashboard
                    </Link>
                </div>
            </section>


        </div>
    );
};