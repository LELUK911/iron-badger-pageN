import { ethers } from 'ethers';
import contractJSON from '../Information/ABI/PactLaunch.json'
import { takeMeProvider } from '../helper/helper';
import { ironForgeAddresses } from '../Information/constantPage';

//export const ironForgeAddress = '0x897699D837C6b78Ef141813fC2C3932D70afF32D'
//export const ironForgeAddress = '0x40aFB5F4B83cb2Fb21d9A407475BD2b3571410E2'

const abi = contractJSON.abi


export const ironForgeAddress = (chainId) => {
    return ironForgeAddresses[chainId] || null;
};


const getProviderAndContract = async (signer = null) => {
    if(signer){
        const provider = await takeMeProvider();
        const { chainId } = await provider.getNetwork();
        const address = ironForgeAddress(chainId);
        return new ethers.Contract(address, abi, signer);
    }else{
        const provider = await takeMeProvider();
        const { chainId } = await provider.getNetwork();
        const address = ironForgeAddress(chainId);
        return new ethers.Contract(address, abi, provider);
    }
};


export const launchNewPactTX = async (_id, _amount, signer) => {
    try {
        const contract = await getProviderAndContract(signer)
        const tx = await contract.launchNewPact(_id, _amount)
        await tx.wait()
        return tx
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const withDrawPactBuy = async (_id, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.withdrawPactBuy(_id);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const withdrawTokenSale = async (_token, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.withdrawToken(_token);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const deleteLaunchTX = async (_id, index, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.deleteLaunch(_id, index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const buyPactTX = async (_id, _index, _amount, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.buyPact(_id, _index, _amount);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const withdrawPactForLaunch = async (_id, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.withdrawPactBuy(_id);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const showPactLaunchListTX = async () => {
    try {
        const contract = await getProviderAndContract()
        const data = await contract.showPactLaunchList()
        return data
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const showAmountInSell = async (_id) => {
    try {
        const contract = await getProviderAndContract();
        const data = await contract.showAmountInSellForPact(_id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const balanceDebtorTX = async (_user, _token) => {
    try {
        const contract = await getProviderAndContract();
        const data = await contract.balanceDebtor(_user, _token);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};

// eslint-disable-next-line no-unused-vars
export const historicalBuy = async (address=null,id=null,amount=null) => {
    console.log("Sono stato evocato")
    try {
        let provider = await takeMeProvider()
        const contract = await getProviderAndContract();;

        const latestBlock = await provider.getBlockNumber();
        const blockStep = 2000;
        const fromBlock = 5565379;
        let allEvents = [];


        const filter = contract.filters.BuyPact(address,amount)//,id);
        
        for (let i= fromBlock; i< latestBlock; i++) {
            const endBlock = Math.min(i+blockStep-1,latestBlock);
            const events = await contract.queryFilter(filter,i,endBlock)
            allEvents.push(events)
        }
        console.log(allEvents)


        return "ciao"

        
    } catch (error) {
        console.error("Transaction failed:", error.reason)
    }
};
