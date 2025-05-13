import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { pactDetails, readId } from "../../../utils/BlockchainOperation/IronPactOp";
import { BigNumConv, calculateExpired, renderAddress, srcTokenData } from "../../../utils/helper/helper";
import { PactCard } from "../../../utils/components/PactCard/PactCard";
import { useWalletContext } from "../../../utils/helper/WalletContext";
import { tableStyle } from "../../../utils/Information/constantPage";

export const DashboardPacts = () => {
    const [showPactCard, setShowPactCard] = useState(false);
    const [rows, setRows] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 85 },
        { field: "sizePact", headerName: "Price Pact", width: 150 },
        { field: "sizeReward", headerName: "Reward Amount", width: 170 },
        {
            field: "tokenLoan", headerName: "Price Token",
            renderCell: (params) => (
                <span className="text-gray-300">
                    {params.row.tokenLoan.visible} ({params.row.tokenLoan.underlying})
                </span>
            ),
            width: 250,
        },
        { field: "amountCollateral", headerName: "Collateral Amount", width: 190 },
        {
            field: "tokenCollateral",
            headerName: "Collateral Token",
            renderCell: (params) => (
                <span className="text-gray-300">
                    {params.row.tokenCollateral.visible} ({params.row.tokenCollateral.underlying})
                </span>
            ),
            width: 250,
        },
        { field: "expired", headerName: "Maturity Date", width: 175 },
    ];



    const activeAccount = useWalletContext();
    const fetchData = async () => {
        try {
            const actualId = await readId(activeAccount);
            let rowsArray = [];
            let _PactsList = [];
            for (let index = 0; index < actualId; index++) {
                const _pactDetails = await pactDetails(index, activeAccount);
                _PactsList.push(_pactDetails);
                const tokenData = await srcTokenData(_pactDetails.tokenCollateral, activeAccount);
                const tokenDataLoan = await srcTokenData(_pactDetails.tokenLoan, activeAccount);

                const row = {
                    id: index,
                    debtor: renderAddress(_pactDetails.debtor),
                    tokenLoan: {
                        visible: tokenDataLoan.ticker,
                        underlying: renderAddress(_pactDetails.tokenLoan),
                    },
                    sizePact: +BigNumConv(_pactDetails.sizeLoan),
                    sizeReward: +BigNumConv(_pactDetails.interest),
                    tokenCollateral: {
                        visible: tokenData.ticker,
                        underlying: renderAddress(_pactDetails.tokenCollateral),
                    },
                    amountCollateral: +BigNumConv(_pactDetails.collateral),
                    expired: calculateExpired(+_pactDetails.expiredPact.toString()),
                };
                rowsArray.push(row);
            }
            setRows(rowsArray);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleRowClick = (params) => {
        setSearchValue(params.row.id);
        setShowPactCard(true)
    };



    return (
        <div className="p-4 sm:p-8 bg-gradient-to-b min-h-screen">
            {/* Header Section */}
            <div className="text-gray-100 space-y-2 sm:space-y-4 mb-10">
                <h1 className="font-bold text-2xl sm:text-4xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Pact Instrument Dashboard
                </h1>
                <p className="text-base sm:text-lg text-gray-300">
                    Explore all available Pact in the marketplace. Use this table to review, analyze, and manage opportunities with ease.
                </p>
            </div>

            {/* DataGrid Section */}
            {/* Overflow per gestire scroll orizzontale su schermi piccoli */}
            <div className="flex justify-center px-4 overflow-x-auto">
                <div className="w-full max-w-7xl bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                    <DataGrid
                        rows={[...rows].reverse()}
                        columns={columns}
                        pageSize={5}
                        onRowClick={handleRowClick}
                        sx={tableStyle}
                        componentsProps={{
                            row: {
                                style: {
                                    transition: 'background-color 0.15s ease',
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* Pact Card Modal */}
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={searchValue} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>
    );
};
