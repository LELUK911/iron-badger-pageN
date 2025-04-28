import { useState } from 'react'


export const RewardMaturityElement = ({ onChange }) => {
    const [rewardMaturity, setRewardMaturity] = useState([]);
    const [newExpired, setNewExpired] = useState(0);

    const handleAdd = () => {
        const updatedMaturities = [...rewardMaturity, newExpired];
        setRewardMaturity(updatedMaturities);
        onChange(updatedMaturities);
    };

    const handlePop = () => {
        const updatedMaturities = rewardMaturity.slice(0, -1);
        setRewardMaturity(updatedMaturities);
        onChange(updatedMaturities);
    };

    const renderExpireds = () => {
        return (<>
            {rewardMaturity.map((item, index) => {
                return (
                    <p className=" text-sm mb-1" key={index}>{`${index + 1}. ${item} gg`}</p>
                )
            })}
        </>
        )
    }

    return (
        <div >
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rewardMaturity"
            >
                Reward Maturity in days
            </label>
            {renderExpireds()}
            <input
                onChange={(e) => setNewExpired(e.target.value)}
                type="number"
                id="rewardMaturity"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                placeholder="Enter maturity in days"
                value={newExpired}
            />

            <div className="flex space-x-4 mt-4">
                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >

                    Add
                </button>
                <button
                    type="button"
                    onClick={handlePop}
                    className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
