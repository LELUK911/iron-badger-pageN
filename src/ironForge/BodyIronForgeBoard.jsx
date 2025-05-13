import { ShoppingCartIcon, CurrencyDollarIcon, InformationCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { BoardList } from "./components/componets/BoardList/BoardList"
import { Link } from 'react-router-dom';

export const BodyIronForgeBoard = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 p-8 space-y-10">
            {/* Titolo */}
            <h1 className="text-5xl font-bold text-center text-white">
                Forge Your Pact Section
            </h1>

            {/* Sezione di Introduzione */}
            <div className="w-full max-w-4xl p-8 text-center">
                <h3 className="text-white text-3xl font-bold mb-4">Invest in Opportunities</h3>
                <p className="text-white text-lg">
                    Discover exclusive tokenized pacts tailored to your goals. Seize the opportunity to earn predictable rewards and strengthen your future today!
                </p>
            </div>

            <div className="w-full max-w-6xl">
                <div className="space-y-4 text-white p-6 rounded-lg shadow-lg bg-slate-700 border bg-opacity-55 shadow-slate-500 border-gray-700">
                    <div className="flex items-center space-x-2">
                        <h2 className="font-bold text-2xl text-blue-400 mb-4">List Your Pact in the Market</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        <ShoppingCartIcon className="h-6 w-6 text-blue-400" />
                        <p>After minting, each Pact can be listed for sale to collect liquidity. Use this section to quickly list your Pacts on the market.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
                        <p>Choose how many Pacts you want to sell. Note: the price of each Pact equals its "Principal Amount".</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <ArrowRightCircleIcon className="h-6 w-6 text-yellow-400" />
                        <p>Select the Pact and click <span className='font-semibold'>Forge</span>. Remember: right after minting, Pacts can only be transferred to the Forge Market for their first sale.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <InformationCircleIcon className="h-6 w-6 text-yellow-400" />
                        <p>This list shows all minted Pacts currently in your wallet. If a Pact is not eligible for sale on
                            <Link to="/app.ironForge" className="underline text-blue-400 mx-1">Iron Forge</Link>
                            anymore, you can sell it on
                            <Link to="/app.ironRise" className="underline text-blue-400 mx-1">Iron Rise</Link>
                            or
                            <Link to="/app.ironFall" className="underline text-blue-400 ml-1">Iron Fall</Link>.
                        </p>
                    </div>
                </div>

                {/* Tabella*/}
                <BoardList />
            </div>
        </div>
    );

}
