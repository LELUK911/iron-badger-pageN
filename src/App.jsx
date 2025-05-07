import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { IronPactPAge } from "./pages/IronPactPage.jsx"
import { NewPactPage } from "./pages/IronPactPages/NewPactPage.jsx"
import { DashBoardPacts } from "./pages/IronPactPages/DashBoardPacts.jsx"
import { WalletIronPactPage } from "./pages/IronPactPages/WalletIronPactPage.jsx"
import { IronForge } from "./pages/IronForge"
import { IronForgeMarket } from "./pages/IronForgePages/IronForgeMarket"
import { IronForgeBoard } from "./pages/IronForgePages/IronForgeBoard"
import { IronForgeManager } from "./pages/IronForgePages/IronForgeManager"
import { IronRise } from "./pages/IronRise"
import { IronRiseAuctionList } from "./pages/IronRisePages/IronRiseAuctionList"
import { IronRiseAuctionManager } from "./pages/IronRisePages/IronRiseAuctionManager"
import { IronRiseNewAuction } from "./pages/IronRisePages/IronRiseNewAuction"
import { IronFall } from "./pages/IronFall"
import { IronFallAuctionList } from "./pages/IronFallPages/IronFallAuctionList"
import { IronFallAuctionManager } from "./pages/IronFallPages/IronFallAuctionManager"
import { IronFallNewAuction } from "./pages/IronFallPages/IronFallNewAuction"
import { IronFallDownwardCard } from "./pages/IronFallPages/IronFallDownwardCard"
import { IronRiseUpwardCard } from "./pages/IronRisePages/IronRiseUpwardCard"
import { UpwardAuctionId } from "./pages/IronRisePages/UpWardAuctionId"
import { DownwardAuctionId } from "./pages/IronFallPages/DownWardAuctionId"
import { FaucetPage } from "./tesnet/FaucetPage/FaucetPage"
import { WalletProvider } from './utils/helper/WalletContext.jsx'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  skaleEuropaTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react"
import { Documentation } from "./pages/Documentation.jsx"

import { DebtorReportPage } from "./pages/DebtorReportPage.jsx"
import { TermsPopup } from "./utils/components/TermsPopUp/TermsPopup.jsx"
import { PowSfuelHelp } from "./utils/components/PowGas/PowSfuelHelp.jsx"

const config = getDefaultConfig({
  appName: import.meta.env.VITE_APPNAME,
  projectId: import.meta.env.VITE_PROJECTID,
  chains: [skaleEuropaTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

function App() {


  useEffect(() => {

    document.title = "Iron Badger";


    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/IronPactLogo.png";
    }
  }, []);

  const handleAcceptTerms = () => {
    console.log("Terms accepted! User can now navigate freely.");
  };

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <RainbowKitProvider>
              <div className="top-0 w-full bg-yellow-400 p-2 shadow-md z-50">
                <div className="text-center text-black font-bold text-sm md:text-lg animate-pulse">
                  <p>🚀 Web Site in Beta Testing - Submit feedback in the FeedBack section!</p>
                  <p>🌍 Live on SKALE Europa Testnet</p>
                </div>
              </div>
              <TermsPopup onAccept={handleAcceptTerms} />
              <PowSfuelHelp>
                <Router>
                  <Routes>
                    <Route>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/documentation" element={<Documentation />} />
                      <Route path="/app.ironPact" element={<IronPactPAge />} />
                      <Route path="/app.ironPact/newpact" element={<NewPactPage />} />
                      <Route path="/app.ironPact/dashboardpacts" element={<DashBoardPacts />} />
                      <Route path="/app.ironPact/wallet" element={<WalletIronPactPage />} />
                      <Route path="/app.ironForge" element={<IronForge />} />
                      <Route path="/app.ironForge/market" element={<IronForgeMarket />} />
                      <Route path="/app.ironForge/board" element={<IronForgeBoard />} />
                      <Route path="/app.ironForge/mangment" element={<IronForgeManager />} />
                      <Route path="/app.ironRise" element={<IronRise />} />
                      <Route path="/app.ironRise/auction" element={<IronRiseAuctionList />} />
                      <Route path="/app.ironRise/manager" element={<IronRiseAuctionManager />} />
                      <Route path="/app.ironRise/newauction" element={<IronRiseNewAuction />} />
                      <Route path="/app.ironRise/upwardcard" element={<IronRiseUpwardCard />} />
                      <Route path="/app.ironfall" element={<IronFall />} />
                      <Route path="/app.ironfall/auction" element={<IronFallAuctionList />} />
                      <Route path="/app.ironfall/manager" element={<IronFallAuctionManager />} />
                      <Route path="/app.ironfall/newauction" element={<IronFallNewAuction />} />
                      <Route path="/app.ironfall/downwardcard" element={<IronFallDownwardCard />} />
                      <Route path="/tokenFaucet" element={<FaucetPage />} />
                      <Route path="/app.ironRise/UpwardAuctionId/:id" element={<UpwardAuctionId />} />
                      <Route path="/app.ironFall/DownwardAuctionId/:id" element={<DownwardAuctionId />} />
                      <Route path="/app.DebtorReport/:user" element={<DebtorReportPage />} />
                    </Route>
                  </Routes>
                </Router>
              </PowSfuelHelp>
            </RainbowKitProvider>
          </WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>

    </>
  )
}

export default App
