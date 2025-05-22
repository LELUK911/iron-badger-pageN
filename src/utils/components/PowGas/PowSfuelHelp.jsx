import { useEffect } from 'react'
import { takeMeProvider } from '../../helper/helper';
import { useAccount } from 'wagmi';
import { Wallet } from 'ethers';
import Miner from '../../helper/Miner.js';



const miner = new Miner();

const faucetAddress = "0x366727B410fE55774C8b0B5b5A6E2d74199a088A";
const functionSignature = "0x0c11dedd";
//const isMainnet = false;

export const PowSfuelHelp = ({ children }) => {
    const { address } = useAccount();
    

    useEffect(() => {
        if (!address) return;
        
        const checkAndMintGas = async () => {
            try {
                const provider = await takeMeProvider();
                const balance = await provider.getBalance(address);
                if (balance > 0n) return;
                console.log("No sFUEL found, mining PoW...");
                alert("We're getting your wallet ready to use the app. Please wait a moment...");

                const randomWallet = Wallet.createRandom().connect(provider);
                const nonce = await provider.getTransactionCount(randomWallet.address);

                const { gasPrice } = await miner.mineGasForTransaction(nonce, 100000, randomWallet.address);

                const request = {
                    to: faucetAddress,
                    gasLimit: 100000,
                    gasPrice,
                    data: `${functionSignature}000000000000000000000000${address.substring(2)}`
                };

                const tx = await randomWallet.sendTransaction(request);
                console.log("sFUEL request sent:", tx.hash);
                await provider.waitForTransaction(tx.hash);

                console.log("sFUEL received ✅");
                alert("Your wallet is now ready to use the app. You can close this message.");
            } catch (err) {
                console.error("PoW mining failed ❌", err);
                alert("An error occurred while preparing your wallet. Please try again.");
            }
        };
        checkAndMintGas();
    }, [address]);

    return (
        <>
            {children}
        </>
    )
}
