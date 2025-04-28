import { useEffect, useState } from "react"
import { BigNumConv, srcTokenData } from "../../helper/helper"

export const SummaryPact = ({ pactDeatail, rewardFee, liquidationFee }) => {
    const [totalReward, setTotalReward] = useState(0)
    const [netTotalReward, setNetTotalReward] = useState(0)
    const [netPactRepay, setNetPactRepay] = useState(0)
    const [netPactApr, setNetPactApr] = useState(0)
    const [token,setToken] = useState('/')

    useEffect(() => {
        const _totalReward = pactDeatail.rewardMaturity.length * +BigNumConv(pactDeatail.interest)
        setTotalReward(_totalReward.toString())
        const _netTotalReward = _totalReward - ((_totalReward * (+(rewardFee))) / 100)
        setNetTotalReward(_netTotalReward.toString())
        const _netPactRepay = +BigNumConv(pactDeatail.sizeLoan) - ((+BigNumConv(pactDeatail.sizeLoan) * (+(liquidationFee))) / 100)
        setNetPactRepay(_netPactRepay.toString())
        const _netPactApr = ((_netPactRepay + _netTotalReward) / +BigNumConv(pactDeatail.sizeLoan) - 1) * 100;
        setNetPactApr(+_netPactApr)
        const fetchToken = async () => {
        
            const _token = await  srcTokenData(pactDeatail.tokenLoan)
            setToken(_token.ticker)
        }
        fetchToken()
    }, [pactDeatail, rewardFee, liquidationFee])

    return (
        <section className="bg-gradient-to-br from-gray-900 to-black/90 p-6 rounded-xl border-2 border-blue-900/50 shadow-2xl backdrop-blur-sm">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="border-b border-blue-900/50 pb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Pact Summary
                    </h2>
                    <div className="mt-2 h-0.5 bg-gradient-to-r from-blue-500/30 to-transparent w-1/3" />
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4 pr-4 border-r border-blue-900/50">
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-blue-300/80 text-sm font-semibold uppercase tracking-wider">
                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                Pact Details
                            </h3>
                            <div className="space-y-2">
                                <StatRow label="Token" value={token} />
                                <StatRow label="Pact Size" value={BigNumConv(pactDeatail.sizeLoan)} />
                                <StatRow label="Reward Size" value={BigNumConv(pactDeatail.interest)} />
                                <StatRow label="Number of Reward" value={pactDeatail.rewardMaturity.length} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 pl-4">
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-blue-300/80 text-sm font-semibold uppercase tracking-wider">
                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Returns
                            </h3>
                            <div className="space-y-2">
                                <StatRow label="Total Reward Repay" value={totalReward} />
                                <StatRow label="Net Reward Repay" value={netTotalReward} />
                                <StatRow label="Net Pact Repay" value={netPactRepay} />
                                <div className="pt-3">
                                    <div className="flex justify-between items-center bg-blue-900/20 px-4 py-3 rounded-lg border border-cyan-400/20">
                                        <span className="text-sm font-medium text-cyan-300">Net APR</span>
                                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                            {Number(netPactApr).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Componente StatRow interno
const StatRow = ({ label, value }) => (
    <div className="flex justify-between items-center hover:bg-blue-900/10 px-3 py-2 rounded-lg transition-colors">
        <span className="text-sm text-blue-300/80">{label}</span>
        <span className="font-medium text-cyan-50">{value}</span>
    </div>
)