import { ethers } from "ethers";
import tokenList from '../Information/tokenList.json'
import { getName, getSymbol } from "../BlockchainOperation/ERC20op";
import { JsonRpcProvider } from "ethers";

export const renderAddress = (address) => {
    if (!address) {
        return `0x..`;
    } else {
        return `${address.slice(0, 3)}...${address.slice(-4)}`;
    }
};

export const BigNumConv = (num) => {
    try {
        return (ethers.formatUnits(num.toString()))
    } catch (e) {
        console.error(e)
    }
}


export const NumConvBig = (num) => {
    try {
        return (ethers.parseUnits(num.toString()))
    } catch (e) {
        console.error(e)
    }
}

export const calculateExpired = (timeInSecond) => {
    const expirationDate = new Date(timeInSecond * 1000)
    const formattedDate = `${expirationDate.getDate()}/${expirationDate.getMonth() + 1}/${expirationDate.getFullYear()}`;
    return formattedDate
}


export const calculateSecondToDay = (timeInDay) => {
    const secondXday = 86400
    const expired = Math.floor(Date.now() / 1000) + (+timeInDay * secondXday);
    return expired
}


export const srcTokenData = async (tokenAddress) => {
    if (!tokenAddress) {
        return
    }
    for (let index = 0; index < tokenList.length; index++) {
        const element = tokenList[index];
        if (element.address == tokenAddress) {
            return element
        }
    }
    try {
        const name = await getName(tokenAddress)
        const symbol = await getSymbol(tokenAddress)
        return { name: name, ticker: symbol, address: tokenAddress }
    } catch (e) {
        console.error(e)
    }
}

export const convertDateToSeconds = (date) => {
    const utcDate = new Date(date);
    return Math.floor(Date.UTC(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        0, 0, 0, 0
    ) / 1000);
};

export const convertSecondsToUTC = (seconds) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
        console.error("Input must be a valid number representing seconds.");
    }
    const date = new Date(seconds * 1000);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();


    return `${day}/${month}/${year}`;
}

export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

export const calculateFee = (amount, fee) => {
    const amountFee = (amount * fee )/ 100;
    const netAmount = amount - amountFee;
    return { amountFee, netAmount }
}

export const calcPercFromBasisPoints = (amount, basisPoints) => {
    if (+amount < 0 || basisPoints < 0) {
        return
    }
    return (+amount * basisPoints) / 10000;
}



export const takeMeProvider = () => {
    //const api=import.meta.env.VITE_ALCHEMY_ENDPOINT
    //const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${api}`);
    const provider = new JsonRpcProvider(`https://testnet.skalenodes.com/v1/juicy-low-small-testnet`);
    provider.pollingInterval = 250;
    return provider;
}
