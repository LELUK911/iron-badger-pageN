import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { OptionTokenListBox } from "./components/OptionTokenListBox";
import { RewardMaturityElement } from "./components/RewardMaturityElement";
import { approveERC20, getBalance, readAllowance } from "../../../utils/BlockchainOperation/ERC20op";
import { createNewPactTransaction, ironPactAddress, pointDebtor } from "../../../utils/BlockchainOperation/IronPactOp";
import { ethers } from "ethers";
import { useWalletContext } from "../../../utils/helper/WalletContext";
import { Tooltips } from "../../../utils/components/tooltips/Tooltips";
import { AmountUnitTooltip, CollateralAmountTooltip, RewardRateTooltip, DescriptionTooltip, MaturityDateInDaysTooltip, PrincipalAmountTooltip } from "../../../utils/components/tooltips/tooltipsInformation/helperTips";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../../utils/helper/ClientToSigner";
import { BigNumConv, NumConvBig, srcTokenData } from "../../../utils/helper/helper";

import { toast } from 'react-toastify';




export const NewPactForm = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const activeAccount = useWalletContext();
    const secondXday = 86400;
    const account = useAccount()
    const signer = useEthersSigner()
    const [isLoading, setIsLoading] = useState(false);
    const [canMint, setCanMint] = useState(false);
    const [userData, setUserData] = useState(0)
    const [currentStep, setCurrentStep] = useState(0);
    const [showCollateral, setShowCollateral] = useState("0");
    const formValues = watch()


    const fetchData = async () => {
        try {
            const userData = await pointDebtor(account.address)
            if (+userData.score.toString() > 1000000) {
                setUserData(0.5)
                return
            }
            if (+userData.score.toString() > 700000) {
                setUserData(1.5)
                return
            }
            if (+userData.score.toString() > 50000) {
                setUserData(3)
                return
            }
            if (+userData.score.toString() <= 50000) {
                setUserData(5)
                return
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (account) {
            setValue("debtor", account.address);
            fetchData()
        }
    }, [activeAccount, setValue]);



    const showCollateralBalance = async () => {
        try {
            const balance = await getBalance(formValues.tokenCollateral, account.address)
            setShowCollateral(BigNumConv(balance));
            console.log("balance ", BigNumConv(balance))
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        showCollateralBalance()
    }, [formValues.tokenCollateral])

    const onSubmit = async (data) => {
        const expiredPact = Math.floor(Date.now() / 1000) + (data.expiredPact * secondXday);
        const rewardMaturityArray = data.rewardMaturity.map((item) => {
            return (Math.floor(Date.now() / 1000) + (item * secondXday)).toString();
        });

        setIsLoading(true);
        try {
            const allowance = await readAllowance(data.tokenCollateral, data.debtor, ironPactAddress, activeAccount);
            const powerOfSpend = allowance.toString() || "0";
            if (powerOfSpend < ethers.parseUnits(data.collateral)) {
                const response = await approveERC20(ironPactAddress, NumConvBig(+data.collateral), signer, data.tokenCollateral)
                if(response!= false){
                    toast.success("Appoval Tx submitted");
                }else{
                    toast.error("Appoval Tx failed");
                }
                setCanMint(true);
                setIsLoading(false);
                return
            }
            const response = await createNewPactTransaction(
                data.debtor,
                data.tokenLoan,
                ethers.parseEther(data.sizeLoan),
                ethers.parseEther(data.interest),
                rewardMaturityArray,
                expiredPact,
                data.tokenCollateral,
                ethers.parseEther(data.collateral),
                data.amount,
                data.describes,
                signer
            );
            if(response!=false){
                toast.success("New Pact Minted");
            }else{
                toast.error("New Pact Minted failed");
            }
            toast.info("Remember Sell your pact on Iron Forge for research liquidity")
        } catch (error) {
            console.error(error);
            toast.error("Transaction failed! ",error);
        } finally {
            setCanMint(false);
        }
    };




    const SummaryItem = ({ label, value, icon, valueColor = "text-cyan-300" }) => (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-cyan-200 transition-colors">
                <svg className="w-4 h-4">{/* Icona corrispondente */}</svg>
                <span>{label}</span>
            </div>
            <span className={`${valueColor} font-mono font-medium`}>
                {value}
            </span>
        </div>
    );


    const LabelWithTooltip = ({ label, tooltip }) => (
        <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-300">{label}</span>
            <Tooltips information={tooltip} />
        </div>
    );

    const isStepValid = (step) => {
        const fields = {
            0: ['tokenLoan', 'sizeLoan', 'interest', 'amount'],
            1: ['rewardMaturity', 'expiredPact'],
            2: ['tokenCollateral', 'collateral'],
            3: ['describes']
        };

        return fields[step].every(field => !errors[field] && watch(field));
    };


    const ConfigurationRecapBox = () => {
        const [tikerLoan, setTikerLoan] = useState('')
        const [tikerCollateral, setTikerCollateral] = useState('')
        const [rewardExpired, setRewardExpired] = useState('')

        useEffect(() => {
            const fecthTokenData = async () => {
                const _tokenLoan = await srcTokenData(formValues.tokenLoan)
                const _tokenCollateral = await srcTokenData(formValues.tokenCollateral)
                setTikerLoan(_tokenLoan.ticker)
                setTikerCollateral(_tokenCollateral.ticker)
            }
            fecthTokenData()

            const _rewardExpired = formValues.rewardMaturity.map((item) => {
                return (
                    `${item} , `
                )
            })
            setRewardExpired(_rewardExpired)
        }, [])



        return (
            <div className="mt-6">
                <div className="bg-gradient-to-br from-emerald-900/20 to-green-900/10 p-5 rounded-xl border border-emerald-500/30 shadow-lg w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                            Configuration Recap
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Loan Token:</span>
                            <span className="font-medium text-emerald-300">{formValues.sizeLoan || '0'} {(tikerLoan) || '-'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Total Pacts:</span>
                            <span className="font-medium text-emerald-300">{formValues.amount || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Interest Rate:</span>
                            <span className="font-medium text-emerald-300">{formValues.interest || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Scheduled Reward Maturity (in days):</span>
                            <span className="font-medium text-emerald-300">{rewardExpired || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Expiration Date (in days):</span>
                            <span className="font-medium text-emerald-300">{formValues.expiredPact || '0'}</span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg">
                            <span className="text-gray-400">Collateral:</span>
                            <span className="font-medium text-emerald-300">
                                {formValues.collateral || '0'} {tikerCollateral || ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }





    return (
        <div>
            <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 p-6">
                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    {[0, 1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentStep === step ? 'bg-blue-500 text-white border-2 border-blue-300' :
                                        currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'} 
                    transition-all duration-300`}
                            >
                                {currentStep > step ? '✓' : step + 1}
                            </div>
                            {step < 3 && (
                                <div className={`w-12 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* STEP 1: Loan Details */}
                    {currentStep === 0 && (
                        <div className="animate-fadeIn">
                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-5 rounded-xl border border-blue-400/30 mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    Loan Parameters
                                </h3>
                                <p className="text-sm text-blue-100/80 mb-4">
                                    Configure the base parameters for your Iron Pact issuance
                                </p>
                                <div className="flex-col text-xs space-y-2">
                                    <div className=" p-2  ">
                                        <div className="text-blue-400/80">Debtor</div>
                                        <div className="truncate font-mono text-white">{formValues.debtor}</div>
                                    </div>
                                    <div className=" p-2 r ">
                                        <div className="text-blue-400/80">Loan Token</div>
                                        <div className="text-white">Token required per Pact</div>
                                    </div>
                                    <div className=" p-2 ">
                                        <div className="text-blue-400/80">Loan Amount</div>
                                        <div className="text-white">Price per single Pact</div>
                                    </div>
                                    <div className=" p-2  ">
                                        <div className="text-blue-400/80">Reward Rate</div>
                                        <div className="text-white">Token amount per scheduled Reward</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Iron Pact Token */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <OptionTokenListBox
                                        label={
                                            <span className="flex items-center gap-1">
                                                <span className="text-blue-400">Loan Token</span>
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        }
                                        onChange={(value) => setValue("tokenLoan", value)}
                                    />
                                    <input type="hidden" {...register("tokenLoan")} />
                                </div>

                                {/* Token Amount */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <LabelWithTooltip
                                        label={<span className="text-blue-400">Loan Amount</span>}
                                        tooltip={PrincipalAmountTooltip}
                                    />
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="any"
                                            className="input-deep pl-12"
                                            {...register("sizeLoan")}
                                        />
                                    </div>
                                </div>

                                {/* Reward Rate */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <LabelWithTooltip
                                        label={<span className="text-blue-400">Reward Rate</span>}
                                        tooltip={RewardRateTooltip}
                                    />
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input-deep pr-12"
                                            {...register("interest")}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                                    </div>
                                </div>

                                {/* Number of Pacts */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <LabelWithTooltip
                                        label={<span className="text-blue-400">Number of Pacts</span>}
                                        tooltip={AmountUnitTooltip}
                                    />
                                    <input
                                        type="number"
                                        className="input-deep"
                                        {...register("amount")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Schedule & Maturity */}
                    {currentStep === 1 && (
                        <div className="animate-fadeIn">
                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-5 rounded-xl border border-blue-400/30 mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    Schedule Settings
                                </h3>
                                <p className="text-sm text-blue-100/80 mb-4">
                                    Configure the payment schedule and maturity for your Iron Pact
                                </p>
                                <div className="flex-col text-xs space-y-2">
                                    <div className="p-2">
                                        <div className="text-blue-400/80">Scheduled Reward</div>
                                        <div className="text-white">Define payment frequency and dates</div>
                                    </div>
                                    <div className="p-2">
                                        <div className="text-blue-400/80">Maturity</div>
                                        <div className="text-white">Total duration in days until expiration</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <RewardMaturityElement
                                        label={
                                            <span className="flex items-center gap-1 mb-3">
                                                <span className="text-blue-400">Scheduled Reward</span>
                                                <Tooltips information="Select payment intervals for your pact" />
                                            </span>
                                        }
                                        onChange={(value) => setValue("rewardMaturity", value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                        <LabelWithTooltip
                                            label={<span className="text-blue-400">Expiration (Days)</span>}
                                            tooltip={MaturityDateInDaysTooltip}
                                        />
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="1"
                                                className="input-deep pr-12"
                                                {...register("expiredPact", { required: true })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Collateral */}
                    {currentStep === 2 && (
                        <div className="animate-fadeIn">
                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-5 rounded-xl border border-blue-400/30 mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    Collateral Setup
                                </h3>
                                <p className="text-sm text-blue-100/80 mb-4">
                                    Configure the collateral requirements for your Iron Pact
                                </p>
                                <div className="flex-col text-xs space-y-2">
                                    <div className="p-2">
                                        <div className="text-blue-400/80">Collateral Asset</div>
                                        <div className="text-white">Token that will secure the Iron Pact</div>
                                    </div>
                                    <div className="p-2">
                                        <div className="text-blue-400/80">Collateral Amount</div>
                                        <div className="text-white">Quantity required per Iron Pact</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Collateral Asset */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <OptionTokenListBox
                                        label={
                                            <span className="flex items-center gap-1">
                                                <span className="text-blue-400">Collateral Asset</span>
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        }
                                        onChange={(value) => {
                                            setValue("tokenCollateral", value);

                                        }}
                                    />
                                    <label className="block mt-2 text-mg  text-yellow-400 font-medium">
                                        Balance: {showCollateral ? Number(showCollateral).toFixed(4) : "0.0000"}
                                    </label>
                                    <input type="hidden" {...register("tokenCollateral")} />
                                </div>
                                {/* Collateral Amount */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <LabelWithTooltip
                                        label={<span className="text-blue-400">Collateral Amount</span>}
                                        tooltip={CollateralAmountTooltip}
                                    />
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="any"
                                            min="0"
                                            className="input-deep pl-12"
                                            {...register("collateral")}
                                        />
                                    </div>
                                </div>
                                {/* Pact Description */}
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                    <LabelWithTooltip label="Pact Description" tooltip={DescriptionTooltip} />
                                    <textarea
                                        className="input-deep h-32"
                                        {...register("describes")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    {/* STEP 4: Review & Create */}
                    {currentStep === 3 && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="text-xl font-bold text-blue-500">Final Review</h3>

                            {/* Container con i primi due box affiancati */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Box 1 - Pact Economics */}
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/20 p-5 rounded-xl border border-cyan-500/30 shadow-cyan-500/10 h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h3l2 4-2 4h-3M5 7h3l2 4-2 4H5" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                                Pact Economics
                                            </h3>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <SummaryItem label="Total Required" value={formValues.sizeLoan * formValues.amount} icon="stack" />
                                            <SummaryItem
                                                label="Scheduled Reward Value"
                                                value={formValues.rewardMaturity ? (formValues.rewardMaturity.length * formValues.interest) * formValues.amount : "/"}
                                                icon="percentage"
                                            />
                                            <SummaryItem
                                                label="Total Deposit"
                                                value={formValues.rewardMaturity ? (+formValues.sizeLoan + (+formValues.rewardMaturity.length * +formValues.interest)) * +formValues.amount : "/"}
                                                icon="vault"
                                            />
                                            <SummaryItem
                                                label="Passive APR"
                                                value={formValues.rewardMaturity ? ((formValues.interest * formValues.rewardMaturity.length) / formValues.sizeLoan * 100).toFixed(2) + "%" : "/"}
                                                icon="growth"
                                            />
                                            <div className="pt-3 border-t border-cyan-500/20">
                                                <SummaryItem label="Protocol Fee" value={`${userData}%`} icon="fee" />
                                                <SummaryItem
                                                    label="Total Fees"
                                                    value={formValues.collateral ? (formValues.collateral * userData) / 100 : "/"}
                                                    icon="calculator"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Box 2 - Creditor Position */}
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/20 p-5 rounded-xl border border-purple-500/30 shadow-purple-500/10 h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                                Creditor Position
                                            </h3>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <SummaryItem label="Net Pact Repay" value={(formValues.sizeLoan * (100 - (+userData))) / 100} icon="arrow-up" valueColor="text-green-400" />
                                            <SummaryItem label="Net Scheduled Reward Repay" value={(formValues.interest * 99.5) / 100} icon="refresh" />
                                            <SummaryItem
                                                label="Net Total Repay"
                                                value={formValues.rewardMaturity
                                                    ? ((formValues.sizeLoan * (100 - (+userData))) / 100) + (((formValues.interest * 99.5) / 100) * formValues.rewardMaturity.length)
                                                    : "/"}
                                                icon="total"
                                            />
                                            <SummaryItem
                                                label="Net APR"
                                                value={formValues.rewardMaturity
                                                    ? ((((formValues.interest * 99.5) / 100) * formValues.rewardMaturity.length) / ((formValues.sizeLoan * (100 - (+userData))) / 100) * 100).toFixed(2) + "%"
                                                    : '/'}
                                                icon="chart"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Box 3 - Full Width Below */}
                            <ConfigurationRecapBox />
                        </div>
                    )}



                    {/* Navigation Controls */}
                    <div className="mt-8 flex justify-between">
                        {currentStep > 0 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(s => s - 1)}
                                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                ← Back
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(s => s + 1)}
                                className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                disabled={!isStepValid(currentStep)}
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Confirm & Create'}
                                Creating
                            </button>
                        )}
                        {canMint &&
                            <button
                                type="submit"
                                className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all"
                                onClick={onSubmit}
                            >
                                {isLoading ? 'Creating...' : 'Confirm & Create'}
                                Creating
                            </button>}
                    </div>
                </form>
            </div>
        </div>
    );

};



