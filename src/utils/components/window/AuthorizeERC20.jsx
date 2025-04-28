import { approveERC20 } from "../../BlockchainOperation/ERC20op";
import { NumConvBig } from "../../helper/helper";
import { useEthersSigner } from "../../helper/ClientToSigner";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const AuthorizeERC20 = ({ contractAddress, tokenAddress, amount, setChange }) => {
    const signer = useEthersSigner()
    const [isLoading, setIsLoading] = useState(false);
    const [, setTxHash] = useState(null);

    const authSpending = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const tx = await approveERC20(contractAddress, NumConvBig(+amount), signer, tokenAddress)
            setTxHash(tx); // Salva l'hash della transazione
            alert(`Tx submitted -> ${tx}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full md:w-2/5 bg-gradient-to-b from-slate-900 to-gray-800 text-white rounded-xl p-6 shadow-xl">
            {/* Pulsante di chiusura */}
            <button
                onClick={setChange}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white focus:outline-none hover:bg-red-600 transition-all">
                &times;
            </button>

            {/* Titolo */}
            <div className="text-center mb-6">
                <h3 className="font-extrabold text-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
                    Authorize ERC20 Spending
                </h3>
                <p className="text-sm text-gray-400">Securely authorize the contract for token usage.</p>
            </div>

            {/* Form */}
            <form className="space-y-6">
                {/* Contract */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="contract">
                        Contract
                    </label>
                    <input
                        type="text"
                        id="contract"
                        placeholder="0x..."
                        value={contractAddress}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    />
                </div>

                {/* Token */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="token">
                        Token
                    </label>
                    <input
                        type="text"
                        id="token"
                        placeholder="0x..."
                        value={tokenAddress}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    />
                </div>

                {/* Bottone */}
                <div className="text-center">
                    <button
                        onClick={(e) => { authSpending(e) }}
                        className={`flex items-center justify-center w-full py-3 px-6 font-bold rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${isLoading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:brightness-110 active:scale-95"
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : "Authorize"}
                    </button>
                </div>
            </form>
        </div>
    );
};
