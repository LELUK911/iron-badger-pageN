import { Link } from 'react-router-dom';
import { HistoricalBuyer } from './components/componets/marketList/HistoricalBuyer';
import { MarketList } from './components/componets/marketList/MarketList';
import { FaInfoCircle, FaSearch, FaShoppingCart, FaUndo, FaWallet } from 'react-icons/fa';

export const BodyIronForgeMarket = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 min-h-screen">
            {/* Titolo Principale */}
            <div className="w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-white">
                    Iron Pact Market: Explore Available Pacts
                </h1>
            </div>

            {/* Sezione Descrizione */}
            <div className="flex w-full justify-center mt-6 sm:mt-10 p-4 sm:p-8">
                <div className="w-full sm:w-2/3 md:w-1/2 flex flex-col justify-center items-center text-center p-6 ">
                    <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                        Invest in Tokenized Pacts
                    </h3>
                    <p className="text-white text-base sm:text-lg">
                        Discover exclusive tokenized pacts tailored to your goals. Seize the opportunity to earn predictable rewards and strengthen your future today!
                    </p>
                </div>
            </div>

            {/* Sezione MarketList */}
            <div className="w-full px-4 sm:px-8">
                <div className="text-white p-6 rounded-lg shadow-lg bg-slate-700 border bg-opacity-55 shadow-slate-500 border-gray-700">
                    <h2 className="font-bold text-2xl text-blue-400 mb-4">How to Use the Market</h2>

                    <div className="space-y-4 text-gray-300 text-sm">
                        <p className="flex items-start gap-2">
                            <FaInfoCircle className="text-yellow-400 mt-1" />
                            <span>
                                <span className="font-semibold text-white">All Pacts listed here</span> are available for purchase for the first time after being minted.
                            </span>
                        </p>

                        <p className="flex items-start gap-2">
                            <FaSearch className="text-green-400 mt-1" />
                            <span>
                                Before buying, check the <span className="font-semibold text-white">Pact details</span> and the <span className="font-semibold text-white">debtor’s report</span> directly in the Pact Card.
                            </span>
                        </p>

                        <p className="flex items-start gap-2">
                            <FaShoppingCart className="text-blue-400 mt-1" />
                            <span>
                                To buy: <span className="font-semibold text-white">select a Pact</span>, set the amount, and complete these steps: authorize token spending → buy Pact → withdraw Pact.
                            </span>
                        </p>

                        <p className="flex items-start gap-2">
                            <FaUndo className="text-red-400 mt-1" />
                            <span>
                                If the purchase fails or is rejected, you can retry anytime using the Pact ID and clicking <span className="font-semibold text-white">"Manual Withdraw Pact"</span>.
                            </span>
                        </p>

                        <p className="flex items-start gap-2">
                            <FaWallet className="text-yellow-300 mt-1" />
                            <span>
                                Purchased Pacts are visible in your{' '}
                                <Link to="/app.ironPact/wallet" className="underline text-blue-400 hover:text-blue-300 font-semibold">
                                    Wallet section
                                </Link>.
                            </span>
                        </p>
                    </div>
                </div>

                <MarketList />
                {/* <HistoricalBuyer /> */}
            </div>
        </div>
    );
};
