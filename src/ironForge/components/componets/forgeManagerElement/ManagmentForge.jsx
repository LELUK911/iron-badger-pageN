import { useState } from "react"
import { OptionTokenListBox } from "../../../../ironPact/components/NewPactForm/components/OptionTokenListBox"
import { balanceDebtorTX, deleteLaunchTX, showAmountInSell, showPactLaunchListTX, withdrawTokenSale } from "../../../../utils/BlockchainOperation/IronForgeOp"
import { BigNumConv } from "../../../../utils/helper/helper"
import { pactDetails } from "../../../../utils/BlockchainOperation/IronPactOp"
import { PactCard } from "../../../../utils/components/PactCard/PactCard"
import { useWalletContext } from "../../../../utils/helper/WalletContext"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../../utils/helper/ClientToSigner"

export const ManagmentForge = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenBalance, setTokenBalance] = useState('Balance')
    const [forgeList, setForgeList] = useState([])
    const [forgeSelect, setForgeSelect] = useState(null)
    const activeAccount = useWalletContext()
    const account = useAccount()
    const signer = useEthersSigner()

    const [isLoadingWith, setIsLoadingWith] = useState(false);


    const [isLoadingDel, setIsLoadingDel] = useState(false);


    const showBalance = async () => {
        try {
            const balanceToken = await balanceDebtorTX(account.address, tokenAddress)
            setTokenBalance(BigNumConv(balanceToken))
        } catch (error) {
            console.error(error)
        }
    }

    const withdrawBalance = async () => {
        setIsLoadingWith(true);
        try {
            await withdrawTokenSale(tokenAddress, signer)
            alert("Withdraw Tx submitted");
        } catch (error) {
            console.error(error)
            alert(`Tx unsubmit with error -> ${error}`)
        } finally {
            setIsLoadingWith(false);
        }
    }

    const deleteLaunchOp = async () => {
        setIsLoadingDel(true);
        try {
            await deleteLaunchTX(forgeSelect.pactId.toString(), forgeSelect.forgeId.toString(), signer)
            alert(`Delete Forge Tx submitted  id -> ${forgeSelect.pactId.toString()}`);
        } catch (error) {
            console.error(error)
            alert(`Tx unsubmit with error -> ${error}`)
        } finally {
            setIsLoadingDel(false);
        }
    }

    const fetchData = async () => {
        try {
            let _PactsList = []
            let _forgList = []
            const launchList = await showPactLaunchListTX(activeAccount)
            for (let index = 0; index < launchList.length; index++) {
                const _pactDetails = await pactDetails(+launchList[index].toString(), activeAccount);
                if (_pactDetails.debtor == account.address) {
                    _PactsList.push(_pactDetails)
                    const _showAmountInSel = await showAmountInSell((_pactDetails.id).toString(), activeAccount)
                    _forgList.push({
                        forgeId: index,
                        pactId: (_pactDetails.id).toString(),
                        amountForge: _showAmountInSel.toString()
                    })
                }
            }
            setForgeList(_forgList)
            if (_forgList.length > 0 && !forgeSelect) {
                setForgeSelect(_forgList[0]);
            }

        } catch (e) {
            console.error(e)

        }
    }

    useState(() => {
        if (activeAccount.address) {
            fetchData()
        }
    }, [activeAccount])

    const RenderForgeSelect = () => {
        if (!forgeSelect) {
            return (
                <>
                    <h3 className="font-bold text-2xl text-blue-400 mb-2">Forge Management</h3>

                    <div className="text-sm text-gray-300 leading-relaxed mb-4 space-y-1">
                        <p>Manage your active Pact listings directly from this section.</p>
                        <p>Use the <span className="text-blue-300 font-semibold">"Pact in the Furnace"</span> field to select an active listing.</p>
                        <p>Once selected, a quick summary will appear below showing the Forge ID, Pact ID, and amount listed.</p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Forge #</p>
                            <p className="text-blue-400 text-2xl font-extrabold">\</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Pact ID</p>
                            <p className="text-blue-400 text-2xl font-extrabold">\</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Amount Listed</p>
                            <p className="text-blue-400 text-2xl font-extrabold">\</p>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h3 className="font-bold text-2xl text-blue-400 mb-2">Forge Management</h3>

                    <div className="text-sm text-gray-300 leading-relaxed mb-4 space-y-1">
                        <p>Manage your active Pact listings directly from this section.</p>
                        <p>Use the <span className="text-blue-300 font-semibold">"Pact in the Furnace"</span> field to select an active listing.</p>
                        <p>Once selected, a quick summary will appear below showing the Forge ID, Pact ID, and amount listed.</p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Forge #</p>
                            <p className="text-blue-400 text-2xl font-extrabold">
                                {forgeSelect.forgeId.toString()}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Pact ID</p>
                            <p className="text-blue-400 text-2xl font-extrabold">
                                {forgeSelect.pactId.toString()}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-lg">Amount Listed</p>
                            <p className="text-blue-400 text-2xl font-extrabold">
                                {forgeSelect.amountForge.toString()}
                            </p>
                        </div>
                    </div>
                </>
            )
        }
    }


    return (
        <div className="flex flex-col p-4 sm:p-8 space-y-8 text-gray-100 shadow-lg rounded-lg min-h-screen">
            {/* Titolo principale */}
            <div className="text-center sm:text-left">
                <h1 className="font-bold text-3xl">Manager Section</h1>
            </div>
            {/* Your Token Section */}
            <div className="flex flex-col p-6 mb-6 rounded-xl bg-slate-800 shadow-lg space-y-6">
                <h3 className="font-bold text-2xl text-blue-400">Your Token Vault</h3>
                <div className="text-sm text-gray-300 leading-relaxed">
                    <p>
                        This section allows you to withdraw the <span className="text-green-400 font-semibold">earnings</span> from the sale of your Pacts.
                    </p>
                    <p>
                        Simply <span className="text-blue-300 font-semibold">select the token</span> and proceed with the withdrawal when ready.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Campo Balance e Pulsanti */}
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <label className="font-semibold text-gray-200">Available Balance:</label>
                        <input
                            type="text"
                            value={tokenBalance}
                            readOnly
                            className="w-full sm:w-1/2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="0.00"
                        />

                        <button
                            onClick={showBalance}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                        >
                            Show Balance
                        </button>

                        <button
                            onClick={withdrawBalance}
                            disabled={isLoadingWith}
                            className={`w-full sm:w-auto text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${isLoadingWith
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:scale-105 hover:brightness-110 active:scale-95"
                                }`}
                        >
                            {isLoadingWith ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Withdraw"
                            )}
                        </button>
                    </div>

                    {/* Token Selection */}
                    <div className="w-full sm:w-5/6">
                        <OptionTokenListBox label="Select Token" onChange={(value) => setTokenAddress(value)} />
                    </div>
                </div>
            </div>


            {/* Forge Section */}
            <div className="flex flex-col p-6 space-y-6 rounded-xl bg-slate-800 shadow-lg">
                {/* RenderForgeSelect */}
                <RenderForgeSelect />

                {/* Pact in the Furnace */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="debtor">
                        Pact in the Furnace
                    </label>
                    <select
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                        onChange={(e) => {
                            const selectedValue = JSON.parse(e.target.value);
                            if (forgeSelect && forgeSelect.forgeId === selectedValue.forgeId) {
                                // Resetta temporaneamente per forzare il re-render
                                setForgeSelect(null);
                                setTimeout(() => setForgeSelect(selectedValue), 0);
                            } else {
                                setForgeSelect(selectedValue);
                            }
                        }}
                    >
                        <option value="" disabled>
                            /
                        </option>
                        {forgeList.map((item) => (
                            <option value={JSON.stringify(item)} key={item.forgeId}>
                                {item.pactId}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pulsanti di Azione */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <button
                        onClick={() => {
                            if (forgeSelect == null || forgeSelect.forgeId == null) {
                                alert("Please select a valid pact before continuing.");
                                return;
                            }
                            setShowPactCard(true);
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                    >
                        Show Card
                    </button>
                    <button
                        onClick={() => {
                            if (!activeAccount.address) {
                                alert("Please select a valid pact before deleting forge.");
                            } else {
                                deleteLaunchOp();
                            }
                        }}
                        disabled={isLoadingDel}
                        className={`w-full sm:w-auto transform transition-transform duration-300 ease-in-out ${isLoadingDel
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:scale-105 hover:brightness-110"
                            } text-white font-bold py-2 px-4 rounded-lg shadow-lg`}
                    >
                        {isLoadingDel ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Delete Forge"
                        )}
                    </button>
                    <button
                        onClick={() => {
                            if (!activeAccount.address) {
                                alert("Connect Wallet to watch data.");
                            } else {
                                fetchData();
                            }
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                    >
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Modal Pact Card */}
            {showPactCard && forgeSelect && forgeSelect.forgeId !== undefined && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard
                        id={forgeSelect.forgeId.toString()}
                        onChange={() => setShowPactCard(false)}
                    />
                </div>
            )}
        </div>
    );

}
