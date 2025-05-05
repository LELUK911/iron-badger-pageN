import { ethers } from 'ethers';
import contractJSON from '../Information/ABI/mockToken/MockToken.json'
import { takeMeProvider } from '../helper/helper';

const abi = contractJSON.abi

export const approveERC20 = async (spender, value, signer, tokenAddress) => {
    try {
        const contract = new ethers.Contract(tokenAddress, abi, signer)
        const tx = await contract.approve(spender, value)
        tx.wait()
        return tx.hash
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        throw error;
    }
}
export const transferERC20 = async (to, value, signer, tokenAddress) => {
    try {
        const contract = new ethers.Contract(tokenAddress, abi, signer);
        const tx = await contract.transfer(to, value);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const transferFromERC20 = async (from, to, value, signer, tokenAddress) => {
    try {
        const contract = new ethers.Contract(tokenAddress, abi, signer);
        const tx = await contract.transferFrom(from, to, value);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const readAllowance = async (addressToken, owner, spender) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(addressToken, abi, provider);
        const allowance = await contract.allowance(owner, spender);
        return allowance;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const getName = async (addressToken) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(addressToken, abi, provider);
        const name = await contract.name();
        return name;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
export const getSymbol = async (addressToken) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(addressToken, abi, provider);
        const symbol = await contract.symbol();
        return symbol;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};



export const getBalance = async (addressToken,addressUser) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(addressToken, abi, provider);
        const balance = await contract.balanceOf(addressUser);
        return balance;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return
    }
};
