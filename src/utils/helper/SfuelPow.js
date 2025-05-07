import { ethers } from 'ethers';

// Funzione per generare il gasPrice unico
export const generateUniqueGasPrice = async (address, nonce)=>  {
    const candidate = ethers.utils.randomBytes(32);
    const candidateHash = ethers.BigNumber.from(ethers.utils.keccak256(candidate));
    const addressHash = ethers.BigNumber.from(ethers.utils.keccak256(address));
    const nonceHash = ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.hexZeroPad(ethers.utils.hexlify(nonce), 32)));

    const X = addressHash.xor(nonceHash).xor(candidateHash);
    return X;
}

// Funzione principale per inviare la transazione PoW
export const  sendPoWTransaction = async (provider, fromAddress, toAddress, data) => {
    const nonce = await provider.getTransactionCount(fromAddress);
    const gasEstimate = await provider.estimateGas({ from: fromAddress, to: toAddress, data });

    let gasPrice;
    let freeGas;
    let attempts = 0;

    do {
        gasPrice = await generateUniqueGasPrice(fromAddress, nonce);
        freeGas = ethers.constants.MaxUint256.div(gasPrice);

        attempts++;
        if (attempts > 10000) {
            throw new Error('Impossibile trovare un gasPrice valido dopo molti tentativi.');
        }
    } while (freeGas.lt(gasEstimate));

    const tx = {
        from: fromAddress,
        to: toAddress,
        data,
        gasLimit: freeGas,
        gasPrice
    };

    const signer = provider.getSigner(fromAddress);
    const transactionResponse = await signer.sendTransaction(tx);
    await transactionResponse.wait();

    return transactionResponse;
}
