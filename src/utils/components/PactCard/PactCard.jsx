import { useState } from "react"
import { _showRewardFee, _showLiquidationFees, balancePactForId, pactDetails, claimRewardForUser, claimLoan, claimScorePoint, depositTokenForInterest, getMaxQtaInterest, getMissQtaInterest, ironPactAddress, pointDebtor, totalSupply, withdrawCollateral } from "../../BlockchainOperation/IronPactOp"
import { BigNumConv, convertSecondsToUTC, NumConvBig, srcTokenData } from "../../helper/helper"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../helper/ClientToSigner"
import { SummaryPact } from "./SummaryPact"
import { Link } from "react-router-dom"
import { approveERC20, getBalance, readAllowance } from "../../BlockchainOperation/ERC20op"
import { toast } from "react-toastify"


// eslint-disable-next-line react/prop-types
export const PactCard = ({ id, onChange }) => {
    const [pactDetail, setPactDetails] = useState(null)
    const [pactSupply, setPactSupply] = useState(0)
    const [pactExpired, setPactExpired] = useState(0)
    const [debtorScore, setDebtorScore] = useState(0)
    const [debtorPenalities, setDebtorPenalities] = useState(0)
    const [tokenLoan, setTokenLoan] = useState(null)
    const [tokenColl, setTokenColl] = useState(null)
    const [balancePact, setBalancePact] = useState(null)
    const [qty, setQty] = useState(0)
    const [amountDep, setAmountDep] = useState(0)
    const [missQtaInterest, setMissQtaInterest] = useState(0)
    const [maxQtaInterest, setgetMaxQtaInterest] = useState(0)
    const [rewardSize, setRewardSize] = useState(0);
    const [rewardFee, setRewardFee] = useState(0);
    const [liquidationFee, setLiquidationFee] = useState(0);
    const [status, setStatus] = useState('/')
    const [balanceToken, setBalanceToken] = useState(0)

    const [isLoadingClaimReward, setIsLoadingClaimReward] = useState(false);
    const [, setTxHashClaimReward] = useState(null);

    const [isLoadingSettle, setIsLoadingSettle] = useState(false);
    const [, setTxHashSettle] = useState(null);

    const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);
    const [, setTxHashDeposit] = useState(null);

    const [isLoadingClaimScore, setIsLoadingClaimScore] = useState(false);
    const [, setTxHashClaimScore] = useState(null);

    const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
    const [, setTxHashWithdraw] = useState(null);

    const account = useAccount()
    const signer = useEthersSigner()



    const formingData = async (score, liquidationFee) => {
        try {
            if (+score.toString() > 1000000) {
                setStatus("PLATINUM")
                return +liquidationFee[0].toString()
            }
            if (+score.toString() > 700000) {
                setStatus("GOLD")
                return +liquidationFee[1].toString()
            }
            if (+score.toString() > 50000) {
                setStatus("SILVER")
                return +liquidationFee[2].toString()
            }
            if (+score.toString() <= 50000) {
                setStatus("BRONZE")
                return +liquidationFee[3].toString()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const fetchData = async () => {
        try {
            const _pactDetails = await pactDetails(id)
            setPactDetails(_pactDetails)

            const _pactSupply = await totalSupply(_pactDetails.id.toString())
            setPactSupply(_pactSupply.toString())

            const _pactExpired = convertSecondsToUTC(+(_pactDetails.expiredPact.toString()))
            setPactExpired(_pactExpired)

            const _debtorScore = await pointDebtor(_pactDetails.debtor)

            setDebtorScore(_debtorScore.score.toString())
            setDebtorPenalities(_debtorScore.penalityForLiquidation)


            const _tokenLoan = await srcTokenData(_pactDetails.tokenLoan)
            const _tokenColl = await srcTokenData(_pactDetails.tokenCollateral)
            setTokenColl(_tokenColl)
            setTokenLoan(_tokenLoan)

            setRewardSize(BigNumConv(_pactDetails.interest.toString()))

            const _missQtaInterest = await getMissQtaInterest(id);
            const missQtaInterest_ = BigNumConv(_missQtaInterest)
            setMissQtaInterest(missQtaInterest_)

            const _maxQtaInterest = await getMaxQtaInterest(id)
            const maxQtaInterest_ = BigNumConv(_maxQtaInterest)

            const _rewardFee = await _showRewardFee();
            setRewardFee(+_rewardFee.toString() / 10);

            const liquidationFee_ = await _showLiquidationFees()
            const currentLiquidationFee = await formingData(_debtorScore.score, liquidationFee_)

            setLiquidationFee(+currentLiquidationFee / 10)

            setgetMaxQtaInterest(maxQtaInterest_)


            const balanceToken_ = await getBalance(_pactDetails.tokenLoan, account.address)
            console.log("balanceToken", balanceToken_)
            setBalanceToken(BigNumConv(balanceToken_))

            if (account.address) {
                const _balancePact = await balancePactForId(account.address, pactDetail.id)
                setBalancePact(_balancePact)
                setQty(_balancePact)
            } else {
                setBalancePact(0)
                setQty(0)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useState(() => {
        fetchData()
    }, [])

    useState(() => {
        if (account.address) {
            fetchData()
        }
    }, [account])

    const handleChange = (event) => {
        const value = event.target.value;
        if (/^[1-9]\d*$/.test(value) || value === "") {
            setQty(value)
        }
    };

    const handleOfChangeQty = (operation) => {
        if (operation === "+") {
            setQty((prev) => prev + 1)
        }
        if (operation === '-') {
            if (qty > 0) {
                setQty((prev) => prev - 1)
            }
        }
    }

    const handleChangeDeposit = (event) => {
        const value = event.target.value;
        if (/^(0|[1-9]\d*)(\.\d+)?$/.test(value) || value === "") {
            setAmountDep(value)
        }
    };

    const claimReward = async (index) => {
        setIsLoadingClaimReward(true)
        try {
            const response = await claimRewardForUser(pactDetail.id.toString(), index, signer)
            if ( response != false){
                toast.success(`Claim reward for index ${index} submitted!`);
            }else{
                toast.error(`Claim reward for index ${index} failed!`);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed! ",error);
        } finally {
            setIsLoadingClaimReward(false)
        }
    }

    const redeemPact = async () => {
        setIsLoadingSettle(true)
        try {
            const response = await claimLoan(pactDetail.id.toString(), qty, signer)
            if(response != false){
                toast.success(`Redeem pact submitted!`);
            }else{
                toast.error(`Redeem pact failed!`);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed! ",error);
        } finally {
            setIsLoadingSettle(false)
        }
    }

    const claimScoreOP = async () => {
        setIsLoadingClaimScore(true)
        try {
            const response = await claimScorePoint(pactDetail.id, signer)
            if(response != false){
                toast.success(`Claim score submitted!`);
            }else{
                toast.error(`Claim score failed!`);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed! ",error);
        } finally {
            setIsLoadingClaimScore(false)
        }
    }

    const withdrawCollateralOP = async () => {
        setIsLoadingWithdraw(true)
        try {
            const response = await withdrawCollateral(pactDetail.id, signer)
            if(response != false){
                toast.success(`Withdraw collateral submitted!`);
            }else{
                toast.error(`Withdraw collateral failed!`);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed! ",error);
        } finally {
            setIsLoadingWithdraw(false)
        }
    }

    const depositTokenForInterestOP = async () => {
        setIsLoadingDeposit(true)
        try {
            const _amount = NumConvBig(amountDep)
            const allowance = await readAllowance(pactDetail.tokenLoan, account.address, ironPactAddress)
            if (allowance < _amount) {
                const response = await approveERC20(ironPactAddress, _amount, signer, pactDetail.tokenLoan)
                if(response!= false ){
                    toast.success("Approva transaction success")
                }else{
                    toast.error("Approva transaction failed")
                }
            }
            const response = await depositTokenForInterest(pactDetail.id.toString(), _amount.toString(), signer)
            if(response!=false){
                toast.success(`Deposit submitted!`);
            }else{
                toast.error("Deposit failed")
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed! ",error);
        } finally {
            setIsLoadingDeposit(false)
        }
    }

    if (!id) {
        return (
            <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-200 font-sans p-8 rounded-xl w-4/5 max-h-screen overflow-y-auto space-y-12 shadow-lg">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 tracking-wide mb-2">
                        Invalid ID
                    </h1>
                </header>
                <div className="flex items-center space-x-4">
                    {/* (Esempio) Pulsanti o azioni globali */}
                    <button
                        className="bg-red-700 hover:bg-red-600 text-black px-4 py-2 rounded-md transition"
                        onClick={() => onChange(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }



    if (!pactDetail) {
        return (
            <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-200 font-sans p-8 rounded-xl w-4/5 max-h-screen overflow-y-auto space-y-12 shadow-lg">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 tracking-wide mb-2">
                        Loading
                    </h1>
                </header>
                <div className="flex items-center space-x-4">
                    {/* (Esempio) Pulsanti o azioni globali */}
                    <button
                        className="bg-red-700 hover:bg-red-600 text-black px-4 py-2 rounded-md transition"
                        onClick={() => onChange(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-200 font-sans p-8 rounded-xl w-4/5 max-h-screen overflow-y-auto space-y-12 shadow-lg">

            {/* Header: Titolo principale */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 tracking-wide mb-2">
                        Iron Pact: DeFi Pact Manager
                    </h1>
                    <p className="text-sm text-slate-400">
                        Pact ID {pactDetail.id.toString()} - Manage your Pact holdings
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    {/* (Esempio) Pulsanti o azioni globali */}
                    <button
                        className="bg-orange-700 hover:bg-orange-600 text-black px-4 py-2 rounded-md transition"
                        onClick={fetchData}
                    >
                        Refresh
                    </button>

                    <button
                        className="bg-red-700 hover:bg-red-600 text-black px-4 py-2 rounded-md transition"
                        onClick={() => onChange(false)}
                    >
                        Close
                    </button>
                </div>
            </header>

            {/* Quick Stats: panoramica generale */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-1">
                    <h2 className="text-lg font-semibold text-blue-300">
                        Pact Amount
                    </h2>
                    <p className="text-2xl font-bold text-blue-400">
                        {pactDetail.amount.toString()}
                    </p>
                    <p className="text-xs text-slate-400">
                        Total units of this Pact
                    </p>
                </div>
                <div className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-1">
                    <h2 className="text-lg font-semibold text-blue-300">
                        Pact Supply
                    </h2>
                    <p className="text-2xl font-bold text-blue-400">
                        {pactSupply}
                    </p>
                    <p className="text-xs text-slate-400">
                        Remaining supply available
                    </p>
                </div>
                <div className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-1">
                    <h2 className="text-lg font-semibold text-blue-300">
                        Pact Expiration
                    </h2>
                    <p className="text-2xl font-bold text-blue-400">
                        {pactExpired}
                    </p>
                    <p className="text-xs text-slate-400">
                        Maturity date of the Pact
                    </p>
                </div>
            </section>
            <SummaryPact pactDeatail={pactDetail} rewardFee={rewardFee} liquidationFee={liquidationFee} />

            {/* Debtor Info */}
            <section className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-800 pb-2">
                    Debtor Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-base">
                    <p>
                        <span className="font-semibold text-blue-300">Debtor:</span> {pactDetail.debtor}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Trust Score:</span> {debtorScore && debtorScore} <span className={`${status === 'PLATINUM' ? 'text-green-500' :
                            status === 'GOLD' ? 'text-yellow-500' :
                                status === 'SILVER' ? 'text-orange-500' :
                                    status === 'BRONZE' ? 'text-red-500' : 'text-gray-300'}`}>{status}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Liquidation Penalties:</span>
                        {debtorPenalities && debtorPenalities.map((item, index) => (
                            <span key={index}> {+(item.toString()) / 100} % </span>
                        ))}
                    </p>
                </div>
                <div>
                    <button
                        className="flex items-center justify-center  px-4 py-2 font-bold rounded-md shadow-lg  bg-blue-800"
                    >
                        <Link
                            to={`/app.DebtorReport/${pactDetail.debtor}`}
                        >
                            Complete Report
                        </Link>
                    </button>
                </div>
            </section>

            {/* Liquidity Info */}
            <section className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-800 pb-2">
                    Asset Liquidity & Coverage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-base">
                    <p>
                        <span className="font-semibold text-blue-300">Collateralized Asset:</span> {tokenColl && tokenColl.ticker}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Collateral Holdings:</span> {BigNumConv(pactDetail.collateral)} {tokenColl && tokenColl.ticker}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Allocated Liquidity:</span> {tokenLoan && tokenLoan.ticker}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Reserve for Repayments:</span> {BigNumConv(pactDetail.balancLoanRepay)} {tokenLoan && tokenLoan.ticker}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Deficit for full solvency:</span> {missQtaInterest ? missQtaInterest : "/"}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Debtor&apos;s total due (capital + interest):</span> {maxQtaInterest ? maxQtaInterest : "/"}
                    </p>

                </div>
            </section>


            {/* Scheduled Payouts Info */}
            <section className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-800 pb-2">
                    Scheduled Payouts
                </h2>

                {/* Numero e descrizione della Pact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                    <p>
                        <span className="font-semibold text-blue-300">Number of Scheduled Payouts:</span> {pactDetail.rewardMaturity.length}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Reward Size:</span> {rewardSize ? rewardSize : '/'} {tokenLoan && tokenLoan.ticker}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Reward Fee:</span> {rewardFee ? rewardFee : '/'} %
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Liquidation Fee:</span> {liquidationFee ? liquidationFee : '/'} %
                    </p>
                </div>

                {/* Elenco scadenze con pulsante di claim vicino all’info */}
                <div className="space-y-2">
                    <span className="font-semibold text-blue-300">Payout Schedule & Claim:</span>
                    <ul className="pl-5 list-disc space-y-2 text-slate-300">
                        {pactDetail.rewardMaturity.map((item, index) => {
                            const date = convertSecondsToUTC(+(item.toString()))
                            return (
                                <>
                                    <li key={index} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <strong>Payout #{index}:</strong> {date}
                                        </div>
                                        <button
                                            onClick={() => claimReward(index)}
                                            disabled={isLoadingClaimReward}
                                            className={`flex items-center justify-center  px-3 py-1 font-bold rounded-md shadow-lg transform transition-all duration-500 ease-in-out text-sm ${isLoadingClaimReward
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-blue-700 hover:bg-blue-600 hover:scale-105 hover:brightness-110 active:scale-95"
                                                }`}
                                        >
                                            {isLoadingClaimReward ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                "Claim"
                                            )}
                                        </button>

                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </div>
            </section>

            {/* User Holdings */}
            <section className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-800 pb-2">
                    Holdings Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-base">
                    <p>
                        <span className="font-semibold text-blue-300">Number of Pacts Held:</span> {balancePact && balancePact.toString()}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-300">Settle Fee:</span> {liquidationFee ? liquidationFee : '/'} %
                    </p>
                </div>

                {/* Redeem the Pact with quantity input */}
                <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                    <div>
                        <label className="block mb-1 font-semibold text-blue-300" htmlFor="redeemQuantity">
                            Quantity to Settle
                        </label>
                        <div className="flex items-center space-x-2">
                            {/* Decrease button */}
                            <button
                                className="bg-slate-600 hover:bg-slate-500 text-white font-bold px-2 rounded-md"
                                onClick={() => handleOfChangeQty('-')}
                            >
                                -
                            </button>
                            <input
                                id="redeemQuantity"
                                type="number"
                                min={0}
                                value={qty}
                                className="w-16 rounded-md text-black px-2 py-1 focus:outline-none"
                                onChange={handleChange}
                            />
                            {/* Increase button */}
                            <button
                                className="bg-slate-600 hover:bg-slate-500 text-white font-bold px-2 rounded-md"
                                onClick={() => handleOfChangeQty('+')}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={redeemPact}
                        disabled={isLoadingSettle}
                        className={`flex items-center justify-center  px-4 py-2 font-bold rounded-md shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingSettle
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-700 hover:bg-blue-600 hover:scale-105 hover:brightness-110 active:scale-95"
                            }`}
                    >
                        {isLoadingSettle ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Settle Pact"
                        )}
                    </button>

                </div>
            </section>



            {account.address == pactDetail.debtor && (
                <>
                    {/* Owner Section  */}
                    <section className="bg-black/60 p-6 rounded-md border border-blue-800 shadow-sm space-y-6">
                        <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-800 pb-2">
                            Owner Section
                        </h2>
                        <p className="text-sm text-slate-300 mb-4">
                            Here you can manage liquidity, claim your score, and withdraw collateral.
                        </p>
                        {/* Container azioni proprietario */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-black/70 border border-blue-700 rounded-md flex flex-col space-y-3">
                                <div>
                                    <label className="block mb-1 font-semibold text-blue-300" htmlFor="depositQuantity">
                                        Quantity to Deposit
                                    </label>
                                    <label className="block mb-1 font-medium text-yellow-300" htmlFor="depositQuantity">
                                        Balance : {balanceToken ? balanceToken : 0} {tokenColl && tokenColl.ticker}
                                    </label>
                                    <label className="block mb-1 text-sm text-blue-200">You can deposit maximum amount due reward and refunds</label>
                                    <div className="flex items-center space-x-2">
                                        {/* Input box */}
                                        <input
                                            id="depositQuantity"
                                            type="number"
                                            defaultValue={amountDep}
                                            min="0"
                                            className="w-full rounded-md text-black px-2 py-1 focus:outline-none"
                                            placeholder="0"
                                            onChange={handleChangeDeposit}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={depositTokenForInterestOP}
                                    disabled={isLoadingDeposit}
                                    className={`flex items-center justify-center w-full px-4 py-2 font-bold rounded-md shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingDeposit
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-blue-700 hover:bg-blue-600 hover:scale-105 hover:brightness-110 active:scale-95"
                                        }`}
                                >
                                    {isLoadingDeposit ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Deposit"
                                    )}
                                </button>

                            </div>
                            {/* Card Claim Score */}
                            <div className="p-4 bg-black/70 border border-blue-700 rounded-md flex flex-col justify-center space-y-3">
                                <p className="font-semibold text-blue-300">
                                    Claim Score Points
                                </p>
                                <button
                                    onClick={claimScoreOP}
                                    disabled={isLoadingClaimScore}
                                    className={`flex items-center justify-center  px-4 py-2 font-bold rounded-md shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingClaimScore
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-blue-700 hover:bg-blue-600 hover:scale-105 hover:brightness-110 active:scale-95"
                                        }`}
                                >
                                    {isLoadingClaimScore ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Claim Score"
                                    )}
                                </button>

                            </div>
                            {/* Card Withdraw Collateral */}
                            <div className="p-4 bg-black/70 border border-blue-700 rounded-md flex flex-col justify-center space-y-3">
                                <p className="font-semibold text-blue-300">
                                    Withdraw Collateral
                                </p>
                                <button
                                    onClick={withdrawCollateralOP}
                                    disabled={isLoadingWithdraw}
                                    className={`flex items-center justify-center w-full px-4 py-2 font-bold rounded-md shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingWithdraw
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-blue-700 hover:bg-blue-600 hover:scale-105 hover:brightness-110 active:scale-95"
                                        }`}
                                >
                                    {isLoadingWithdraw ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Withdraw"
                                    )}
                                </button>

                            </div>
                        </div>
                    </section>
                </>
            )}

        </div>



    )
}