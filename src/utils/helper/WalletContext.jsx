import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useDisconnect } from 'wagmi';

const WalletContext = createContext()


export const useWalletContext = () => {
    return useContext(WalletContext)
}


export const WalletProvider = ({ children }) => {
    const [address, setAddress] = useState(null);
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);
    const [walletType, setWalletType] = useState("metamask");


    const { address: wagmiAddress, isConnected } = useAccount()
    const { disconnect } = useDisconnect();

    useEffect(() => {
        const initializeWallet = async () => {
            try {
                if (isConnected && window.ethereum) {
                    const ethersProvider = new ethers.BrowserProvider(window.ethereum);
                    const signerInstance = await ethersProvider.getSigner()
                    setProvider(ethersProvider);
                    setSigner(signerInstance);
                    setAddress(wagmiAddress);
                }
            } catch (error) {
                console.error('Errore durante l\'inizializzazione del wallet:', error);
            }
        }
        initializeWallet();
    }, [isConnected, wagmiAddress])


    const disconnectWallet = () => {
        disconnect(); // Disconnette il wallet tramite wagmi
        setProvider(null);
        setSigner(null);
        setAddress(null);
    };


    const value = {
        address,
        signer,
        provider,
        walletType,
        setAddress,
        setSigner,
        setProvider,
        setWalletType,
        disconnectWallet,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );


}