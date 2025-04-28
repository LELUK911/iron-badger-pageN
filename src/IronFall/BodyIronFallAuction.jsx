import { useEffect, useState } from "react"
import { filterAuctionList } from "../utils/helper/filterAuctionList";
import { showDownAuctionList } from "../utils/BlockchainOperation/IronFall";
import { AuctionList } from "../IronFall/components/auctionList/AuctionList";
import { useWalletContext } from "../utils/helper/WalletContext";


export const BodyIronFallAuction = () => {
    const [filters, setFilters] = useState({
        srcAuctionId: null,
        srcPactId: null,
    });

    const [advSrc, setAdvSrc] = useState(false)
    const [auctionList, setAuctionList] = useState([])
    const [originalAuctionList, setOriginalAuctionList] = useState([])
    const activeAccount = useWalletContext()


    const fetchData = async () => {
        try {
            const _auctionList = await showDownAuctionList(activeAccount)
            const _auctionListIndexed = _auctionList.map((item, index) => {
                return { ...item, auctionIndex: index };
            });
            setAuctionList(_auctionListIndexed)
            setOriginalAuctionList(_auctionListIndexed);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const refreshList = () => {
        fetchData();
    };

    const openAdvSrc = () => {
        if (advSrc) {
            setAdvSrc(false)
        } else {
            setAdvSrc(true)
        }
    }

    const filterFunction = () => {
        const newfilterList = filterAuctionList(originalAuctionList, filters)
        setAuctionList(newfilterList)
    }

    const clearFilters = () => {
        setFilters({ srcAuctionId: null, srcPactId: null });
        setAuctionList(originalAuctionList);
    };

    const RenderAdvanceSrc = () => {
        const [adavanceFilter, setAdvanceFilter] = useState({
            dateStart: '',
            dateEnd: '',
            auctionStatus: '',
            floorPriceLow: '0',
            floorPriceHigh: '',
            instalmentPriceLow: '0',
            instalmentPriceHigh: '',
            dropToleranceLow: '0',
            dropTolleranceHigh: '',
            amountLow: '0',
            amountHigh: '',
            playerAddress: '0x',
        })
        const handleAdvanceFilterChange = (field, value) => {
            setAdvanceFilter((prev) => ({
                ...prev,
                [field]: value
            }));
        };

        const advfilterFunction = () => {
            const newfilterList = filterAuctionList(originalAuctionList, filters, adavanceFilter)
            setAuctionList(newfilterList)
        }

        const clearAdvFilters = () => {
            setFilters({ srcAuctionId: null, srcPactId: null });
            setAdvanceFilter({
                dateStart: '',
                dateEnd: '',
                auctionStatus: '',
                floorPriceLow: '0',
                floorPriceHigh: '',
                instalmentPriceLow: '0',
                instalmentPriceHigh: '',
                dropToleranceLow: '0',
                dropToleranceHigh: '',
                amountLow: '0',
                amountHigh: '',
                playerAddress: '0x',
            });

            setAuctionList(originalAuctionList);
        };

        return (
            <>
                <div className="w-full bg-slate-800 text-gray-100 p-6 rounded-lg shadow-lg space-y-4">
                    <h3 className="text-xl font-bold mb-4">Advanced Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Date Range */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Date Range</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                    value={adavanceFilter.dateStart}
                                    onChange={(e) => handleAdvanceFilterChange('dateStart', e.target.value)}
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                    value={adavanceFilter.dateEnd}
                                    onChange={(e) => handleAdvanceFilterChange('dateEnd', e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Auction Status */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Listing Status</label>
                            <select
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                                value={adavanceFilter.auctionStatus}
                                onChange={(e) => handleAdvanceFilterChange('auctionStatus', e.target.value)}
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="true">Open</option>
                                <option value="false">Closed</option>
                            </select>
                        </div>
                        {/* Floor Price Range */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Minimum Price</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.floorPriceLow ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('floorPriceLow', val);
                                    }}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-500"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.floorPriceHigh ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('floorPriceHigh', val);
                                    }}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-500"
                                />
                            </div>
                        </div>
                        {/* Last Instalment Range */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Last Bid Amount</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.instalmentPriceLow ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('instalmentPriceLow', val);
                                    }}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100 placeholder-gray-500"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.instalmentPriceHigh ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('instalmentPriceHigh', val);
                                    }}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100 placeholder-gray-500"
                                />
                            </div>
                        </div>
                        {/* Drop tolerance Range */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Drop tolerance</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.dropToleranceLow ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('dropToleranceLow', val);
                                    }}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100 placeholder-gray-500"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.dropToleranceHigh ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('dropToleranceHigh', val);
                                    }}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100 placeholder-gray-500"
                                />
                            </div>
                        </div>
                        {/* Amount Range */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Amount</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.amountLow ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('amountLow', val);
                                    }}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-500"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={adavanceFilter.amountHigh ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value !== '' ? Number(e.target.value) : null;
                                        handleAdvanceFilterChange('amountHigh', val);
                                    }}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-500"
                                />
                            </div>
                        </div>
                        {/* Player */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Bidder</label>
                            <input
                                type="text"
                                value={adavanceFilter.playerAddress}
                                onChange={(e) => handleAdvanceFilterChange('playerAddress', e.target.value)}
                                placeholder="Enter Player Address"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            />
                        </div>
                    </div>
                    {/* Tasto "Apply Filters" */}
                    <div className="flex justify-end mt-6">
                        <button
                            className="ml-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
                            onClick={advfilterFunction}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0a7 7 0 111-1 7 7 0 01-1 1z"
                                />
                            </svg>
                        </button>
                        {/* Bottone Clean */}
                        <button
                            onClick={clearAdvFilters}
                            className="ml-4 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9h-.42l-.82-3.63A2 2 0 0015.8 4H8.2a2 2 0 00-1.96 1.37L5.42 9H5a2 2 0 00-2 2v1a2 2 0 002 2h.68l.5 5A2 2 0 008.16 21h7.68a2 2 0 001.98-1.82l.5-5H19a2 2 0 002-2v-1a2 2 0 00-2-2zm-5 0H9m2 0h2m-4.92 2h5.84"
                                />
                            </svg>

                        </button>
                    </div>
                </div>
            </>
        );
    }



    return (
        <div className="my-5">
            {/* Contenitore principale dei filtri e pulsanti */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800 text-gray-100 p-4 rounded-lg shadow-lg">
                {/* Pulsanti Refresh, Filter e Clean */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                        onClick={refreshList}
                        className="flex-1 md:flex-none bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={filterFunction}
                        className="flex-1 md:flex-none bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0a7 7 0 111-1 7 7 0 01-1 1z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={clearFilters}
                        className="flex-1 md:flex-none bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9h-.42l-.82-3.63A2 2 0 0015.8 4H8.2a2 2 0 00-1.96 1.37L5.42 9H5a2 2 0 00-2 2v1a2 2 0 002 2h.68l.5 5A2 2 0 008.16 21h7.68a2 2 0 001.98-1.82l.5-5H19a2 2 0 002-2v-1a2 2 0 00-2-2zm-5 0H9m2 0h2m-4.92 2h5.84"
                            />
                        </svg>
                    </button>
                </div>

                {/* Campo Search Auction */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
                    <label className="text-sm font-semibold">Search Auction #:</label>
                    <input
                        type="number"
                        min={0}
                        value={filters.srcAuctionId ?? ''}
                        onChange={(e) => {
                            const val = e.target.value !== '' ? Number(e.target.value) : null;
                            handleFilterChange('srcAuctionId', val);
                        }}
                        placeholder="Enter auction number"
                        className="w-full md:w-48 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                    />
                </div>

                {/* Campo Search Pact ID */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
                    <label className="text-sm font-semibold">Search Pact ID:</label>
                    <input
                        type="number"
                        min={0}
                        value={filters.srcPactId ?? ''}
                        onChange={(e) => {
                            const val = e.target.value !== '' ? Number(e.target.value) : null;
                            handleFilterChange('srcPactId', val);
                        }}
                        placeholder="Enter Pact ID"
                        className="w-full md:w-48 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                    />
                </div>

                {/* Toggle per filtri avanzati */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
                    <label className="text-sm font-semibold">Advance Filter</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={openAdvSrc}
                        />
                        <div className="w-12 h-12 bg-green-600 rounded-full shadow-md duration-300 peer-checked:bg-red-600 peer-hover:ring-2 ring-gray-300 flex justify-center items-center relative">
                            <span className="absolute text-gray-50 text-lg transform duration-300 peer-checked:opacity-0 peer-checked:rotate-180">
                                {advSrc ? "✖️" : " ✔️"}
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Filtri avanzati */}
            {advSrc && <RenderAdvanceSrc />}

            {/* Separatore */}
            <div className="w-full h-2 bg-gradient-to-r bg-white rounded-lg shadow-lg my-8"></div>

            {/* Lista delle aste */}
            <div className="p-4 flex flex-wrap items-center justify-center gap-4">
                <AuctionList auctionList={auctionList} />
            </div>
        </div>
    )
}
