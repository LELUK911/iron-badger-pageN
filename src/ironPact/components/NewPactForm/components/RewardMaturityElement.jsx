import { useState } from "react";

export const RewardMaturityElement = ({ onChange }) => {
    const [rewardMaturity, setRewardMaturity] = useState([]);
    const [newExpired, setNewExpired] = useState("");

    const handleAdd = () => {
        if(rewardMaturity.length < 6){
            if (newExpired) {
                const updatedMaturities = [...rewardMaturity, newExpired];
                setRewardMaturity(updatedMaturities);
                onChange(updatedMaturities);
                setNewExpired("");
            }
        }
    };

    const handlePop = () => {
        const updatedMaturities = rewardMaturity.slice(0, -1);
        setRewardMaturity(updatedMaturities);
        onChange(updatedMaturities);
    };

    const renderExpireds = () => (
        <div className="mt-2">
            {rewardMaturity.map((item, index) => (
                <p
                    key={index}
                    className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg inline-block mb-2 mr-2"
                >
                    {`${index + 1}. ${item} days`}
                </p>
            ))}
        </div>
    );

    return (
        <div className="col-span-2">
            <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="rewardMaturity"
            >
                Scheduled Reward Interval (Days) 
            </label>

            {/* Render Reward Maturities */}
            {renderExpireds()}

            <div className="mt-4">
                <input
                    onChange={(e) => setNewExpired(e.target.value)}
                    type="number"
                    id="rewardMaturity"
                    className="w-1/2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                    placeholder="Enter maturity in days"
                    value={newExpired}
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition focus:outline-none"
                >
                    Add
                </button>
                <button
                    type="button"
                    onClick={handlePop}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition focus:outline-none"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
