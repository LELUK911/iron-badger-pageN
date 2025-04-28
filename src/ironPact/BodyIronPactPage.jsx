
import { Link } from 'react-router-dom'
import ironPactLogo from '../assets/tassoIronPact.jpg'
import tassoController from '../assets/tasso controller-Ce6c1d2_.png'
import tassoDoctor from '../assets/tasso dottore-Cfmith5Z.png'
import tassoLock from '../assets/tasso lucchetto-es12YTv9.png'


export const BodyIronPactPage = () => {
    return (
        <div className="min-h-screen ">
            {/* Hero Section */}
            <section
                className="relative mt-16 text-white text-center py-20 flex items-center justify-center"
                style={{
                    backgroundImage: `url(${ironPactLogo})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '60vh',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60"></div>
                <div className="relative z-10 p-6 rounded-lg max-w-6xl">
                    <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        Iron Pact Protocol
                    </h2>
                    <p className="text-3xl font-semibold mb-6 text-gray-200">
                        Blockchain-based platform for programmable peer-to-peer agreements. Explore programmable Pacts backed by collateral.
                    </p>
                    {/* Disclaimer */}
                    <div className="text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4 max-w-2xl mx-auto">
                        Digital assets carry risks. Always conduct your own research.
                    </div>
                </div>

            </section>

            {/* Features Section */}
            <section className="py-12 px-6">
                <h3 className="text-4xl font-bold text-center mb-8 text-white">
                    <span className="border-b-4 border-amber-400 pb-2">
                        Protocol Features
                    </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                    {/* Feature 1 */}
                    <div className="p-8 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-amber-500/20 hover:border-amber-500/40 transition-colors">
                        <div className='flex flex-col justify-center items-center'>
                            <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center mb-4">
                                <img src={tassoController} alt="Control" className="w-16 h-16" />
                            </div>
                        </div>
                        <h4 className="text-3xl font-semibold mb-2 text-amber-400">
                            Iron Pact Customization
                        </h4>
                        <p className='text-xl text-gray-300'>
                            Customize Iron Pact terms, including scheduled rewards and duration.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-amber-500/20 hover:border-amber-500/40 transition-colors">
                        <div className='flex flex-col justify-center items-center'>
                            <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center mb-4">
                                <img src={tassoLock} alt="Security" className="w-16 h-16" />
                            </div>
                        </div>
                        <h4 className="text-3xl font-semibold mb-2 text-amber-400">
                            Automated Collateral Management
                        </h4>
                        <p className='text-xl text-gray-300'>
                            Collateral-backed risk mitigation with automated recovery mechanisms.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-amber-500/20 hover:border-amber-500/40 transition-colors">
                        <div className='flex flex-col justify-center items-center'>
                            <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center mb-4">
                                <img src={tassoDoctor} alt="Planning" className="w-16 h-16" />
                            </div>
                        </div>
                        <h4 className="text-3xl font-semibold mb-2 text-amber-400">
                            Flexible Pact Structures
                        </h4>
                        <p className='text-xl text-gray-300'>
                            Programmable Iron Pacts with integrated transferability.
                        </p>
                    </div>
                </div>

                {/* Risk Disclosure */}
                <div className="mt-16 text-center text-sm text-gray-400 max-w-3xl mx-auto">
                    <p className="mb-4">
                        Digital assets are subject to market risks including collateral volatility, smart contract vulnerabilities, and liquidity considerations.
                        Consult our <Link to="/" className="text-amber-400 underline">Risk Disclosure</Link> before participating.
                    </p>
                </div>
            </section>

        </div>
    );
}