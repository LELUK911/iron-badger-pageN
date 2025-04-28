import { useState } from "react"
import { IronPactGen } from "./components/IronPact/IronPactGen"
import { IronPactTutorial } from "./components/IronPact/IronPactTutorial"
import { IronForgeGen } from "./components/IronForge/IronForgeGen"
import { IronForgeTutorial } from "./components/IronForge/IronForgeTutorial"
import { IronRiseGen } from "./components/IronRise/IronRiseGen"
import { IronRiseTutorial } from "./components/IronRise/IronRiseTutorial"
import { IronFallGen } from "./components/IronFall/IronFallGen"
import { IronFallTutorial } from "./components/IronFall/IronFallTutorial"
import { IronBadger } from "./components/PortionDocument/IronPactGeneralDoc/IronBadgerIntro.jsx"
import { IronPactIntro } from "./components/PortionDocument/IronPactGeneralDoc/IronPactIntro.jsx"
import { PactDoc } from "./components/PortionDocument/IronPactGeneralDoc/PactDoc.jsx"
import { Collateral } from "./components/PortionDocument/IronPactGeneralDoc/Collateral.jsx"
import { Reward } from "./components/PortionDocument/IronPactGeneralDoc/Reward.jsx"
import { Penalityliquidation } from "./components/PortionDocument/IronPactGeneralDoc/Penality&liquidation.jsx"
import { FeeIronPact } from "./components/PortionDocument/IronPactGeneralDoc/FeeIronPact.jsx"
import { DebtorScoreA } from "./components/PortionDocument/IronPactGeneralDoc/DebtorScore.jsx"
import { NewPactDoc } from "./components/PortionDocument/IronPactTutorialDoc/NewPactDoc.jsx"
import { ManagmentPact } from "./components/PortionDocument/IronPactTutorialDoc/ManagmentPact.jsx"
import { InitialSellPactDoc } from "./components/PortionDocument/IronPactTutorialDoc/InitialSellPactDoc.jsx"
import { BuyToLauncher } from "./components/PortionDocument/IronPactTutorialDoc/BuyToLauncher.jsx"
import { BuyToAuction } from "./components/PortionDocument/IronPactTutorialDoc/BuyToAuction.jsx"
import { BuyerManagment } from "./components/PortionDocument/IronPactTutorialDoc/BuyerManagment.jsx"
import { LiquidationInfo } from "./components/PortionDocument/IronPactTutorialDoc/LiquidationInfo.jsx"
import { IronForgeintro } from "./components/PortionDocument/IronForgDoc/IronForgeintro.jsx"
import { ForgeNewPact } from "./components/PortionDocument/IronForgDoc/ForgeNewPact.jsx"
import { FrgemanagmentDoc } from "./components/PortionDocument/IronForgDoc/FrgemanagmentDoc.jsx"
import { BuyPact1stMark } from "./components/PortionDocument/IronForgDoc/BuyPact1stMark.jsx"
import { IronRiseIntroDoc } from "./components/PortionDocument/IronRiseDoc/IronRiseIntroDoc.jsx"
import { IronRiseFeeDoc } from "./components/PortionDocument/IronRiseDoc/IronRiseFeeDoc.jsx"
import { SellUpwardAuction } from "./components/PortionDocument/IronRiseDoc/SellUpwardAuction.jsx"
import { AuctionManagmentDoc } from "./components/PortionDocument/IronRiseDoc/AuctionManagmentDoc.jsx"
import { BuyUpwardAuctionDoc } from "./components/PortionDocument/IronRiseDoc/BuyUpwardAuctionDoc.jsx"
import { IronFallIntroDoc } from "./components/PortionDocument/IronFallDoc/IronFallIntroDoc.jsx"
import { DownWardFee } from "./components/PortionDocument/IronFallDoc/DownWardFee.jsx"
import { SellDownAuctionLotDoc } from "./components/PortionDocument/IronFallDoc/SellDownAuctionLotDoc.jsx"
import { DownWardAuctionDoc } from "./components/PortionDocument/IronFallDoc/DownWardAuctionDoc.jsx"
import { BuyerLotOfDownAuctionDoc } from "./components/PortionDocument/IronFallDoc/BuyerLotOfDownAcutionDoc.jsx"
import { TermOfUseGen } from "./components/termOfUse/TermOfUseGen.jsx"
import { TermsOfUse } from "./components/termOfUse/TermOfUseDoc.jsx"

export const BodyDocumentation = () => {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)
    const [show6, setShow6] = useState(false)
    const [show7, setShow7] = useState(false)
    const [show8, setShow8] = useState(false)
    const [show9, setShow9] = useState(false)

    const [codeElement, setCodeElement] = useState(0)


    const documentelement = [
        <IronBadger key={0} />,
        <IronPactIntro key={1} />,
        <PactDoc key={2} />,
        <Reward key={3} />,
        <Collateral key={4} />,
        <Penalityliquidation key={5} />,
        <DebtorScoreA key={6} />,
        <FeeIronPact key={7} />,
        <div key={8} />,
        <NewPactDoc key={9} />,
        <InitialSellPactDoc key={10} />,
        <ManagmentPact key={11} />,
        <BuyToLauncher key={12} />,
        <BuyToAuction key={13} />,
        <BuyerManagment key={14} />,
        <div key={15} />,
        <LiquidationInfo key={16} />,
        <IronForgeintro key={17} />,
        <ForgeNewPact key={18} />,
        <FrgemanagmentDoc key={19} />,
        <BuyPact1stMark key={20} />,
        <IronRiseIntroDoc key={21} />,
        <IronRiseFeeDoc key={22} />,
        <SellUpwardAuction key={23} />,
        <AuctionManagmentDoc key={24} />,
        <BuyUpwardAuctionDoc key={25} />,
        <IronFallIntroDoc key={26} />,
        <DownWardFee key={28} />,
        <SellDownAuctionLotDoc key={29} />,
        <DownWardAuctionDoc key={30} />,
        <BuyerLotOfDownAuctionDoc key={31} />,
        <TermsOfUse key={32}/>
    ]



    return (
        <div className='w-full flex justify-center text-white'>
            <div className='flex-col col-span-1  p-4 mx-4 space-x-3' >
                <h3 className='font-semibold text-lg'>Documentation</h3>
                <div>
                    <ul className='space-x-2 ms-2'>
                        <li>
                            <button
                                onClick={() => setCodeElement(0)}
                            >
                                Introduction

                            </button>
                        </li>
                    </ul>
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show1) {
                                setShow1(true)
                            } else {
                                setShow1(false)
                            }
                        }}
                    >
                        Iron Pact
                    </button>
                    {show1 && <IronPactGen setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show2) {
                                setShow2(true)
                            } else {
                                setShow2(false)
                            }
                        }}
                    >
                        User's Guide
                    </button>
                    {show2 && <IronPactTutorial setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show3) {
                                setShow3(true)
                            } else {
                                setShow3(false)
                            }
                        }}
                    >
                        Iron Forge
                    </button>
                    {show3 && <IronForgeGen setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show4) {
                                setShow4(true)
                            } else {
                                setShow4(false)
                            }
                        }}
                    >
                        User's Guide
                    </button>
                    {show4 && <IronForgeTutorial setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show5) {
                                setShow5(true)
                            } else {
                                setShow5(false)
                            }
                        }}
                    >
                        Iron Rise Auction
                    </button>
                    {show5 && <IronRiseGen setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show6) {
                                setShow6(true)
                            } else {
                                setShow6(false)
                            }
                        }}
                    >
                        User's Guide
                    </button>
                    {show6 && <IronRiseTutorial setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show7) {
                                setShow7(true)
                            } else {
                                setShow7(false)
                            }
                        }}
                    >
                        Iron Fall auction
                    </button>
                    {show7 && <IronFallGen setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show8) {
                                setShow8(true)
                            } else {
                                setShow8(false)
                            }
                        }}
                    >
                        User's Guide
                    </button>
                    {show8 && <IronFallTutorial setFunction={setCodeElement} />}
                </div>
                <div className='space-y-2'>
                    <button
                        className='font-semibold text-lg underline'
                        onClick={() => {
                            if (!show9) {
                                setShow9(true)
                            } else {
                                setShow9(false)
                            }
                        }}
                    >
                        Terms of Use
                    </button>
                    {show9 && <TermOfUseGen setFunction={setCodeElement} />}
                </div>

            </div>


            <div className='flex-col col-span-2 w-3/4' >
                <div className='flex justify-center'>
                    {documentelement[codeElement]}
                </div>
            </div>

        </div>
    )
}
