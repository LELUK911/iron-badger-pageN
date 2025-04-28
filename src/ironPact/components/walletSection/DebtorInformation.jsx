import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { pointDebtor } from "../../../utils/BlockchainOperation/IronPactOp"



export const DebtorInformation = () => {
    const account = useAccount()
    const [score, setScore] = useState(0)
    const [penalties, setPenalties] = useState(0)
    const [status, setStatus] = useState('/')
    const [mintFee, setMintFee] = useState(0)




    const fetchData = async () => {
        try {
            const data = await pointDebtor(account.address);
            setScore(data.score.toString())
            setPenalties(data.penalityForLiquidation)
            formingData(data)
        } catch (e) {
            console.error(e)
        }
    }


    const formingData = async () => {
        try {
            const userData = await pointDebtor(account.address)
            if (+userData.score.toString() > 1000000) {
                setMintFee(0.5)
                setStatus("PLATINUM")
                return
            }
            if (+userData.score.toString() > 700000) {
                setMintFee(1.5)
                setStatus("GOLD")
                return
            }
            if (+userData.score.toString() > 50000) {
                setMintFee(3)
                setStatus("SILVER")
                return
            }
            if (+userData.score.toString() <= 50000) {
                setMintFee(5)
                setStatus("BRONZE")
                return
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [account])
    
    return (
        <div className="p-4 rounded-xl shadow-xl">
            <h2 className="text-3xl font-semibold text-white mb-6">User's Information</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-400 mr-2">Reputation Score:</span>
                    <span className={`text-xl font-bold ${status === 'PLATINUM' ? 'text-green-500' :
                            status === 'GOLD' ? 'text-yellow-500' :
                                status === 'SILVER' ? 'text-orange-500' :
                                    status === 'BRONZE' ? 'text-red-500' :
                                        'text-gray-300'
                        }`}>
                        {score && score.toString()}
                    </span>
                    <span className="ml-3 text-lg text-gray-300">({status})</span>
                </div>
                <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-400 mr-2">Mint Pact Fee:</span>
                    <span className="text-xl font-bold text-white">{mintFee && mintFee.toString()}%</span>
                </div>
                <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-400 mr-2">Liquidation Penalties:</span>
                    <span className="text-xl font-bold text-white">
                        {penalties && penalties.map((penalty, index) => (
                            <span key={index}>
                                {(+penalty.toString()) / 10}%{index < penalties.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}
