import { isHexString, getNumber, randomBytes, keccak256, toBeHex, toBigInt, ethers } from 'ethers';

export default class Miner {
    static MAX_NUMBER = ethers.MaxUint256;

    async mineGasForTransaction(nonce, gas, from) {
        if (isHexString(nonce)) nonce = getNumber(nonce);
        if (isHexString(gas)) gas = getNumber(gas);

        return await this.mineFreeGas(gas, from, nonce);
    }

    async mineFreeGas(gasAmount, address, nonce) {
        const nonceHash = toBigInt(keccak256(toBeHex(nonce, 32)));
        const addressHash = toBigInt(keccak256(address));
        const xor = nonceHash ^ addressHash;

        let iterations = 0;
        let candidate;
        const start = performance.now();

        while (true) {
            candidate = randomBytes(32);
            const candidateHash = toBigInt(keccak256(candidate));
            const result = xor ^ candidateHash;
            const freeGas = Miner.MAX_NUMBER / result;

            if (freeGas >= gasAmount) break;

            if (iterations++ % 1000 === 0) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }

        return {
            duration: performance.now() - start,
            gasPrice: toBigInt(candidate)
        };
    }
}
