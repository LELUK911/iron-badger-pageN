import { ethers } from 'ethers';
import contractJSON from '../Information/ABI/UpwardAuction.json'
import { takeMeProvider } from '../helper/helper';
import { ironRiseAddresses } from '../Information/constantPage';

//export const ironRiseAddress = '0x4b706DdEFeAF3dde66C2de36B3754748C2a35601'
const abi = contractJSON.abi
export const ironRiseAddress = (chainId) => {
    return ironRiseAddresses[chainId] || null;
};


const getProviderAndContract = async (signer = null) => {
    if(signer){
        const provider = await takeMeProvider();
        const { chainId } = await provider.getNetwork();
        const address = ironRiseAddress(chainId);
        return new ethers.Contract(address, abi, signer);
    }else{
        const provider = await takeMeProvider();
        const { chainId } = await provider.getNetwork();
        const address = ironRiseAddress(chainId);
        return new ethers.Contract(address, abi, provider);
    }
};

export const newAuctionPact = async (_id, _amount, _startPrice, _expired, signer) => {
    try {
        const contract = await getProviderAndContract(signer)
        const tx = await contract.newAcutionPact(_id, _amount, _startPrice, _expired)
        await tx.wait()
        return tx
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const instalmentPot = async (_index, _amount, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.instalmentPot(_index, _amount);
        console.log(tx)
        await tx.wait();

        return tx;
    } catch (error) {
        console.error("Transaction failed:", error)
        return false
    }
};
export const withdrawMoneyUpAuction = async (_amount, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.withdrawMoney(_amount);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    } 
};
export const closeUpAuction = async (_index, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.closeAuction(_index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const withDrawPactUpAuction = async (_index, signer) => {
    try {
        const contract = await getProviderAndContract(signer);
        const tx = await contract.withDrawPact(_index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const showAuctionsList = async () => {
    try {
        const contract = await getProviderAndContract()
        const data = await contract.showAuctionsList()
        return data
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const showFeesSystem = async () => {
    try {
        const contract = await getProviderAndContract();
        const data = await contract.showFeesSystem();
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const showAuction = async (_index) => {
    try {
 
        const contract = await getProviderAndContract();
        const data = await contract.showAuction(_index);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const showUserBalanceFree = async (_user) => {
    try {
 
        const contract = await getProviderAndContract();
        const data = await contract.showUserBalanceFree(_user);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const showUserBalanceLock = async (_user) => {
    try {
        const contract = await getProviderAndContract();
        const data = await contract.showUserBalanceLock(_user);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};


export const betListForAuction = async (_player = null, _index = null, _amountPot = null) => {
    try {
        const contract = await getProviderAndContract();
        const filter = contract.filters.newInstalmentPot(
            _player,
            _index,
            _amountPot
        )
        const events = await contract.queryFilter(filter)

        const parsedEvents = events.map((event) => ({
            player: event.args[0], // Argomento 0 (_player)
            index: event.args[1],  // Argomento 1 (_index)
            amountPot: event.args[2], // Argomento 2 (_amountPot)
            transactionHash: event.transactionHash, // Hash della transazione
            blockNumber: event.blockNumber, // Numero del blocco
        }));

        return parsedEvents
    } catch (error) {
        console.error(error)
    }
}
