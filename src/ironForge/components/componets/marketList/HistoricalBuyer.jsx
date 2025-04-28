import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { historicalBuy } from "../../../../utils/BlockchainOperation/IronForgeOp"


export const HistoricalBuyer = () => {
    const [detail,setDetails] = useState(null)
    const account = useAccount()

    const fetchData = async ()=> {
        const data = await historicalBuy(account.address,null,null)
        setDetails(data)
    }

    useEffect(()=>{
        fetchData()
    },[])
    
    return (
        <div className="bg-slate-700 shadow-md shadow-slate-700 bg-opacity-55 p-4 text-white">
            <h1 className="text-2xl font-bold" >Historical buy</h1>
            <table>
                <th>
                    <td>Id</td>
                    <td>Amount</td>
                </th>    
                
            </table>    
        
        
        </div>

    )
}
