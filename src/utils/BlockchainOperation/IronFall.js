import { ethers } from 'ethers';
import contractJSON from '../Information/ABI/DownwardAuction.json'
import { takeMeProvider } from '../helper/helper';



export const ironFallAddress = "0xB7c8351801db9F6AABb2B1242E889C643BAF6DD8"

const abi = contractJSON.abi



export const newDownAuctionPact = async (_id, _amount, _startPrice, _expired, _tolleratedDiscount, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer)
        const tx = await contract.newAcutionPact(
            _id,
            _amount,
            _startPrice,
            _expired,
            _tolleratedDiscount
        )
        await tx.wait()
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
}


export const downInstalmentPot = async (_index, _amount, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.instalmentPot(_index, _amount);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const closeDownAuction = async (_index, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.closeAuction(_index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const emergencyCloseDownAuction = async (_index, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.emergencyCloseAuction(_index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const changeTolleratedDiscountTX = async (_index, _newDiscount, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.changeTolleratedDiscount(_index, _newDiscount);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const withdrawMoneyDownAuction = async (_amount, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.withdrawMoney(_amount);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const withDrawPactDownAuction = async (_index, signer) => {
    try {
        const contract = new ethers.Contract(ironFallAddress, abi, signer);
        const tx = await contract.withDrawPact(_index);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};


export const showDownAuction = async (_index, account) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider)
        const data = await contract.showAuction(_index)
        return data
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
}

export const showDownAuctionList = async () => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider);
        const data = await contract.showAuctionsList();
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const showDownFeesSystem = async () => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider);
        const data = await contract.showFeesSystem();
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const downshowUserBalanceFree = async (_user) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider);
        const data = await contract.showUserBalanceFree(_user);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const downshowUserBalanceLock = async (_user) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider);
        const data = await contract.showUserBalanceLock(_user);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};


export const betListForDownAuction = async (_player = null, _index = null, _amountPot = null) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironFallAddress, abi, provider);

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