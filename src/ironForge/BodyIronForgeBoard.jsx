import { ShoppingCartIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { BoardList } from "./components/componets/BoardList/BoardList"

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

            {/* Tabella o Lista */}
            <div className="w-full max-w-6xl">
                <div className="space-y-4 text-white p-6 rounded-lg shadow-lg bg-slate-700 border bg-opacity-55 shadow-slate-500 border-gray-700">
                    <div className="flex items-center space-x-2">
                        <h2 className="font-bold text-2xl text-blue-400 mb-4">List Your Pact in the Market</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        <ShoppingCartIcon className="h-6 w-6 text-blue-400" />
                        <p>After minting, every Pact can be listed for sale on the market. In this section, you can easily list your Pacts.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
                        <p>Select the amount of Pacts you want to sell. Remember, the price for a single Pact is equal to its "Principal Amount" value.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-6 w-6 text-yellow-400" />
                        <p>Select the Pact and click "Forge." <span className="text-gray-400">(For the first interaction with the contract, you need to authorize spending your Pacts.)</span></p>
                    </div>
                </div>
                <BoardList />
            </div>
        </div>
    );

}
