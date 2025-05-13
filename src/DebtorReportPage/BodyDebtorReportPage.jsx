import { useEffect, useState } from "react";
import { pactDetails, pointDebtor } from "../utils/BlockchainOperation/IronPactOp";
import { BigNumConv } from "../utils/helper/helper";
import { getName, getSymbol } from "../utils/BlockchainOperation/ERC20op";
import list from '../utils/Information/tokenList.json';
import { CheckBadgeIcon, ExclamationTriangleIcon, StarIcon, ShieldCheckIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { CollateralChart } from "./components/CollateralChart";
import { LoansChart } from "./components/LoanChart";
import { useParams } from "react-router-dom";
import { requestPactStory } from "../API/api";
import ReportHelper from "./components/ReportHelper";

export const BodyDebtorReportPage = () => {
    const [allPactDetail, setAllPactDetail] = useState([]);
    const [colateralArray, setColateralArray] = useState([]);
    const [loanArray, setLoanArray] = useState([]);
    const [userPoint, setUserPoint] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const { user } = useParams()

    const processData = async (data) => {
        let emitDetail = [];
        let _colateralArray = [];
        let _loanArray = [];
        await Promise.all(
            data.map(async (item) => {
                try {
                    const pactDetail = await pactDetails(item.idParam)
                    emitDetail.push(pactDetail)
                    //Aggiorniamo il collaterale
                    const objColl = _colateralArray.find((item) => item.collateral == pactDetail.tokenCollateral);
                    if (objColl) {
                        objColl.amount += pactDetail.collateral;
                    } else {
                        const tokenName = await getName(pactDetail.tokenCollateral);
                        const tokenTicker = await getSymbol(pactDetail.tokenCollateral);
                        const findtoken = list.find(item => item.address == pactDetail.tokenCollateral);
                        let verify = false;
                        if (findtoken) {
                            verify = true;
                        }

                        _colateralArray.push({
                            collateral: pactDetail.tokenCollateral,
                            amount: pactDetail.collateral,
                            name: tokenName,
                            ticker: tokenTicker,
                            verify: verify
                        });
                    }
                    const objLoan = _loanArray.find((item) => item.tokenLoan == pactDetail.tokenLoan);
                    if (objLoan) {
                        objLoan.amount += pactDetail.sizeLoan;
                        objLoan.amountPact += pactDetail.amount;
                    } else {
                        const tokenName = await getName(pactDetail.tokenCollateral);
                        const tokenTicker = await getSymbol(pactDetail.tokenCollateral);
                        const findtoken = list.find(item => item.address == pactDetail.tokenCollateral);
                        let verify = false;
                        if (findtoken) {
                            verify = true;
                        }

                        _loanArray.push({
                            tokenLoan: pactDetail.tokenLoan,
                            amount: pactDetail.sizeLoan,
                            amountPact: pactDetail.amount,
                            name: tokenName,
                            ticker: tokenTicker,
                            verify: verify
                        });
                    }
                } catch (error) {
                    console.error("Errore durante il recupero dei dettagli del pact:", error);
                }
            })
        )

        setColateralArray(_colateralArray);
        setLoanArray(_loanArray);
        setAllPactDetail(emitDetail);

    };

    const fetchData = async () => {
        const _userData = await pointDebtor(user);
        setUserPoint(_userData);


        const _events = await requestPactStory(user);
        processData(_events);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getRank = (score) => {
        if (userPoint && userPoint[1]) {
            const _score = +userPoint[1].toString();
            if (_score > 1000000) {
                return { rank: "Platinum", color: "text-blue-400" }; // Colore blu per Platinum
            } else if (_score >= 700000) {
                return { rank: "Gold", color: "text-yellow-400" }; // Colore giallo per Gold
            } else if (_score >= 500000) {
                return { rank: "Silver", color: "text-gray-400" }; // Colore grigio per Silver
            } else {
                return { rank: "Bronze", color: "text-orange-600" }; // Colore arancione per Bronze
            }
        } else {
            return { rank: "/", color: "text-gray-200" };
        }
    };

    const RenderRank = () => {
        const result = getRank(userPoint[1]);
        return (
            <span className={`font-medium ${result.color}`}>
                {result.rank}
            </span>
        );
    };

    // Paginazione
    const paginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const totalPages = Math.ceil(allPactDetail.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            {/* Intestazione */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold flex items-center justify-center">
                    <ShieldCheckIcon className="w-10 h-10 mr-2 text-blue-400" />
                    Debtor Report
                </h1>
                <p className="text-gray-400">Detailed overview of reliability and activity history.</p>
            </div>

            {/* Sezione Helper */}
            <ReportHelper/>


            {/* Sezione Informazioni Generali */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <StarIcon className="w-6 h-6 mr-2 text-yellow-400" />
                    General Information
                </h2>
                <div className="space-y-4">
                    <p className="flex items-center">
                        <span className="font-medium">Debtor Address:</span>{" "}
                        <span className="ml-2 text-blue-400">{user}</span>
                    </p>
                    <p className="flex items-center">
                        <span className="font-medium">Trust Points:</span>{" "}
                        <span className="ml-2 text-green-400">
                            {userPoint && userPoint[1] !== undefined ? userPoint[1].toString() : "/"} PNT
                        </span>
                    </p>
                    <p className="flex items-center">
                        <span className="font-medium">Rank:</span>{" "}
                        <span className="ml-2">
                            <RenderRank />
                        </span>
                    </p>
                    <p className="flex items-center">
                        <span className="font-medium">Liquidation Penalties:</span>{" "}
                        {userPoint && Array.isArray(userPoint[0]) ? (
                            userPoint[0].map((item, index) => (
                                <span key={index} className="ml-2 text-red-400">
                                    {(+item.toString()) / 100}%
                                </span>
                            ))
                        ) : (
                            <span className="ml-2 text-gray-400">No data available</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Sezione Collaterale */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <BanknotesIcon className="w-6 h-6 mr-2 text-green-400" />
                    Collateral History
                </h2>


                <CollateralChart colateralArray={colateralArray} />
                {colateralArray.length > 0 ? (
                    paginatedData(colateralArray).map((item, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p><span className="font-medium">Token Collaterale:</span> {item.collateral}</p>
                            <p><span className="font-medium">Token Name:</span> {item.name}</p>
                            <p><span className="font-medium">Token Symbol:</span> {item.ticker}</p>
                            <p>
                                <span className="font-medium">Token Verified:</span>{" "}
                                {item.verify ? (
                                    <span className="text-green-400 flex items-center">
                                        <CheckBadgeIcon className="w-5 h-5 mr-1" /> Verified
                                    </span>
                                ) : (
                                    <span className="text-red-400 flex items-center">
                                        <ExclamationTriangleIcon className="w-5 h-5 mr-1" /> Not Verified
                                    </span>
                                )}
                            </p>
                            <p><span className="font-medium">Quantità Totale:</span> {BigNumConv(item.amount)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No data available</p>
                )}
                {/* Paginazione */}
                {colateralArray.length > itemsPerPage && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Sezione Prestiti */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <BanknotesIcon className="w-6 h-6 mr-2 text-purple-400" />
                    Loan History
                </h2>

                <LoansChart loanArray={loanArray} />

                {loanArray.length > 0 ? (
                    paginatedData(loanArray).map((item, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p><span className="font-medium">Token Required:</span> {item.tokenLoan}</p>
                            <p><span className="font-medium">Token Name:</span> {item.name}</p>
                            <p><span className="font-medium">Token Symbol:</span> {item.ticker}</p>
                            <p>
                                <span className="font-medium">Token Verified:</span>{" "}
                                {item.verify ? (
                                    <span className="text-green-400 flex items-center">
                                        <CheckBadgeIcon className="w-5 h-5 mr-1" /> Verified
                                    </span>
                                ) : (
                                    <span className="text-red-400 flex items-center">
                                        <ExclamationTriangleIcon className="w-5 h-5 mr-1" /> not Verified
                                    </span>
                                )}
                            </p>
                            <p><span className="font-medium">Total Quantity:</span> {BigNumConv(item.amount)}</p>
                            <p><span className="font-medium">Total Quantity Pact:</span> {item.amountPact.toString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No data available</p>
                )}
                {/* Paginazione */}
                {loanArray.length > itemsPerPage && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Sezione Dettagli Emissioni */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <StarIcon className="w-6 h-6 mr-2 text-yellow-400" />
                    Minted Details
                </h2>
                {allPactDetail.length > 0 ? (
                    paginatedData(allPactDetail).map((pact, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p><span className="font-medium">ID Pact:</span> {pact[0].toString()}</p>
                            <p><span className="font-medium">Token Collateral:</span> {pact[7]}</p>
                            <p><span className="font-medium">Amount Collateral:</span> {BigNumConv(pact[8])}</p>
                            <p><span className="font-medium">Token Required:</span> {pact[2]}</p>
                            <p><span className="font-medium">Amount Required:</span> {BigNumConv(pact[3])}</p>
                            <p><span className="font-medium">Interests:</span> {BigNumConv(pact[4])}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No data available</p>
                )}
                {/* Paginazione */}
                {allPactDetail.length > itemsPerPage && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};