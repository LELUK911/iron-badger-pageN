import { HistoricalBuyer } from './components/componets/marketList/HistoricalBuyer'
import { MarketList } from './components/componets/marketList/MarketList'

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

                    <div className="space-y-3 text-gray-300">
                        <p>📌 <span className="font-semibold text-white">All Pacts listed here</span> are available on the market for the first time.</p>

                        <p>🧐 Before buying, check the <span className="font-semibold text-white">Pact’s details</span> on its card. We also recommend reviewing the <span className="font-semibold text-white">"debtor's Complete Report"</span> before making a decision.</p>

                        <p>💳 To buy, you must <span className="font-semibold text-white">authorize the contract</span> to spend the required tokens (the system will automatically calculate the total amount).</p>

                        <p>📥 After purchasing, <span className="font-semibold text-white">remember to withdraw your Pacts</span>. If you forget, don't worry! You can do it anytime by entering the Pact ID and clicking "Withdraw".</p>
                    </div>
                </div>
                <MarketList />
                {/*<HistoricalBuyer />*/}
            </div>
        </div>

    )
}
