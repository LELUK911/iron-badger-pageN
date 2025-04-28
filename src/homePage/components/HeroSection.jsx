import { Link } from 'react-router-dom';
import logo from '../../assets/IronPactLogo-C2GdRcL7.png';
import { BuyButtons } from './BuyButtons/BuyButtons';


export const HeroSection = () => {
    return (
        <div className="grid place-items-center px-4 py-10 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-4xl">
                {/* Sezione immagine */}
                <div className="flex justify-center">
                    <img
                        src={logo}
                        alt="Iron Pacts Logo"
                        className="w-full max-w-xs md:max-w-sm h-auto rounded-lg"
                    />
                </div>

                {/* Sezione testo */}
                <div className="flex flex-col items-start space-y-6 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold">Iron Badger Brotherhood</h3>
                    <p className="text- md:text-lg font-semibold text-gray-100" >Beyond DeFi: Finance, Strategy, and Community</p>
                    <p className="text-sm md:text-lg text-gray-200">
                    Iron Pacts unlock new economic opportunities in Web3, combining decentralized financial instruments with a transparent governance model. Join our gamified DAO, where your strategic decisions shape the system’s economy in a unique turn-based game.
                    </p>

                    <div className="flex flex-col space-y-4 w-full">
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link to={"/app.ironPact"}>
                                <BuyButtons title={"Iron Pact"} />
                            </Link>
                            <Link to={"/app.ironForge"}>
                                <BuyButtons title={"Iron Forge"} />
                            </Link>
                            <Link to={"/app.ironRise"}>
                                <BuyButtons title={"Iron Rise"} />
                            </Link>
                            <Link to={"/app.ironfall"}>
                                <BuyButtons title={"Iron Fall"} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
