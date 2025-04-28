import { useState } from "react";
import { ConnectEVM } from "../../utils/EVMButton";
import JsonContract from '../../utils/Information/ABI/FaucetTesnet.json'
import { ethers } from "ethers";
import { useEthersSigner } from "../../utils/helper/ClientToSigner";
import { Link } from "react-router-dom";

export const FaucetPage = () => {
    const [selectedChain, setSelectedChain] = useState("sepolia");
    const signer = useEthersSigner()

    //const sepoliFaucetAddress = '0x0Dae8ede06d4297311D279DAAec750C5f05aA338'
    const skaleFaucetAddress = '0x2340B93d7a2710Bb2d50bf384BF54500aB7AA804'


    const requestToken = async () => {
        try {
            const contract = new ethers.Contract(skaleFaucetAddress, JsonContract.abi, signer)
            const tx = await contract.requireAirdrop()
            await tx.wait()
            alert(`Tx submit -> ${tx}`)
        } catch (error) {
            alert(`Tx error -> ${error.reason}`)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-black to-slate-900 text-slate-100 p-8">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Titolo */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-blue-400">Faucet Page</h1>
                    <p className="text-lg text-slate-300">
                        Request test tokens or Ether on the Skale testnet.
                    </p>
                </header>

                <section className="flex  items-center justify-center bg-slate-700 p-6 rounded-lg shadow-md space-y-6">
                    <div className="flex-col space-y-4">
                        <h2 className="text-2xl font-bold text-blue-300">Connect Wallet</h2>
                        <ConnectEVM />
                    </div>

                </section>
                <section className="flex  items-center justify-center bg-slate-700 p-6 rounded-lg shadow-md space-y-6">
                    <div className="flex-col justify-center space-y-4">
                        <h2 className="text-2xl font-bold text-blue-300">Ecosistem</h2>
                        <div className="flex flex-col space-y-4 w-full">
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Link to={"/app.ironPact"}>
                                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform">
                                        Iron Pact
                                    </button>
                                </Link>
                                <Link to={"/app.ironForge"}>
                                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform">
                                        Iron Forge
                                    </button>
                                </Link>
                                <Link to={"/app.ironRise"}>
                                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform">
                                        Iron Rise
                                    </button>
                                </Link>
                                <Link to={"/app.ironfall"}>
                                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform">
                                        Iron Fall
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Sezione Faucet Token */}
                <section className="bg-slate-700 p-6 rounded-lg shadow-md space-y-6">
                    <h2 className="text-2xl font-bold text-blue-300">Request Tokens</h2>
                    <div className="space-y-4">
                        <label className="block text-lg font-semibold">
                            Select a Chain
                        </label>
                        <select
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedChain}
                            onChange={(e) => setSelectedChain(e.target.value)}
                        >
                            <option value="skale">Skale</option>
                        </select>

                        <div className="flex justify-center">
                            <button
                                onClick={requestToken}
                                className="mt-4 w-3/4 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                                Request Tokens
                            </button>
                        </div>



                    </div>
                </section>

                {/* Sezione Faucet Ether */}
                <section className="bg-slate-700 p-6 rounded-lg shadow-md space-y-6">
                    <h2 className="text-2xl font-bold text-blue-300">Get Ether</h2>
                    <p className="text-slate-300">
                        Need Ether for testing on Sepolia? Use the link below to request free ETH from a third-party faucet.
                    </p>
                    <ul className="text-xl space-y-4 underline text-blue-500 " >
                        <li>
                            <a href="https://www.sfuelstation.com/">
                                Skale sfuel faucet
                            </a>
                        </li>
                        {/*
                        <li >
                            <a href="https://www.alchemy.com/faucets/ethereum-sepolia">
                                Alchemy
                            </a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia">
                                Google Cloud Web3
                            </a>
                        </li>
                        <li>
                            <a href="https://faucet.quicknode.com/ethereum/sepolia">
                                Quick node
                            </a>
                        </li>
*/}
                    </ul>
                </section>

                {/* Sezione di istruzioni aggiuntive */}
                <section className="bg-slate-700 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-2xl font-bold text-blue-300">Additional Instructions</h2>
                    <p className="text-slate-300">
                        Ensure you are connected to the Sepolia testnet before requesting tokens or Ether.
                        Contact support if you encounter any issues.
                    </p>
                </section>
            </div>
        </div>
    );
};
