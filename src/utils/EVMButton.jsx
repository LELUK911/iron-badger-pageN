import { useWalletContext } from './helper/WalletContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useEthersProvider } from './helper/ClientToProvider';
import { useEthersSigner } from './helper/ClientToSigner';

export function ConnectEVM() {
    // Usa il contesto per accedere allo stato del wallet
    const {  setAddress, setSigner, setProvider } = useWalletContext();

    // Usa gli hook di wagmi per gestire la connessione
    const { address: wagmiAddress, isConnected,} = useAccount();
    const ethersProvider = useEthersProvider();
    const signerInstance = useEthersSigner();


    useEffect(() => {
        const initializeWallet = async () => {
            if (isConnected) {
                try {
                    setProvider(ethersProvider);
                    setSigner(signerInstance);
                    setAddress(wagmiAddress);
                } catch (error) {
                    console.error('Errore durante l\'inizializzazione del wallet:', error);
                }
            } else {
                // Resetta lo stato se non c'è una connessione
                setProvider(null);
                setSigner(null);
                setAddress(null);
            }
        };

        initializeWallet();
    }, [isConnected, wagmiAddress, setAddress, setSigner, setProvider]);

    return (
        <div>
            <ConnectButton />
        </div>
    );
}